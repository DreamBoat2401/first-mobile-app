import { connect, getDb } from "../config/mongodb.js";
import fs from "fs/promises";
import { ObjectId } from "mongodb";

export const seedPosts = async () => {
  try {
    await connect();
    const db = await getDb();
    const postCollection = await db.collection("posts");
    const posts = JSON.parse(await fs.readFile("./data/posts.json", "utf-8"));

    posts.map((el) => {
      el._id = new ObjectId(el._id);
      el.authorId = new ObjectId(el.authorId);
      el.createdAt = el.updatedAt = new Date();

      return el;
    });

    await postCollection.insertMany(posts);

    console.log("berhasil seed post");
  } catch (error) {
    console.log(error);
  }
};

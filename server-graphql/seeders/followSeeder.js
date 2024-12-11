import { connect, getDb } from "../config/mongodb.js";
import fs from "fs/promises";
import { ObjectId } from "mongodb";

export const seedFollow = async () => {
  try {
    await connect();
    const db = await getDb();
    const followCollection = await db.collection("follows");

    const follows = JSON.parse(await fs.readFile("./data/follows.json"));

    follows.map((el) => {
      el._id = new ObjectId(el._id);
      el.followerId = new ObjectId(el.followerId);
      el.followingId = new ObjectId(el.followingId);
      el.createdAt = el.updatedAt = new Date();

      return el;
    });

    await followCollection.insertMany(follows);

    console.log("berhasil seed follow");
  } catch (error) {
    console.log(error);
  }
};

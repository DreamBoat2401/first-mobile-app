import { connect, getDb } from "../config/mongodb.js";
import fs from "fs/promises";
import { ObjectId } from "mongodb";
import { hashPassword } from "../utils/bcrypt.js";

export const seedUsers = async () => {
  try {
    await connect();
    const db = await getDb();
    const userCollection = await db.collection("users");
    const users = JSON.parse(await fs.readFile("./data/users.json", "utf-8"));

    users.map((el) => {
      el._id = new ObjectId(el._id);
      //   console.log(el.password);
      //   console.log(hashPassword(el.password));

      el.password = hashPassword(el.password);
      el.createdAt = el.updatedAt = new Date();

      return el;
    });

    await userCollection.insertMany(users);

    console.log("berhasil seed user");
  } catch (error) {
    console.log(error, "gagal seed users");
  }
};

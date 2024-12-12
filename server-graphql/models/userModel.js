import { ObjectId } from "mongodb";
import { getDb } from "../config/mongodb.js";
import { hashPassword } from "../utils/bcrypt.js";

export class UserModel {
  static async getCollection() {
    try {
      const db = await getDb();
      return db.collection("users");
    } catch (error) {
      console.log(error);
    }
  }

  static async findAll(search) {
    try {
      const collection = await this.getCollection();
      let users = [];
      if (search) {
        users = await collection
          .find({
            $or: [
              { name: { $regex: search, $options: "i" } },
              { username: { $regex: search, $options: "i" } },
            ],
          })
          .toArray();
      } else {
        users = await collection.find().toArray();
      }
      return users;
    } catch (error) {
      console.log(error);
    }
  }

  static async findByName(name) {
    try {
      const collection = await this.getCollection();
      const user = await collection.findOne({ name });
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  static async findById(id) {
    try {
      const collection = await this.getCollection();
      const user = await collection.findOne({ _id: new ObjectId(id) });
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  static async findByEmail(email) {
    try {
      const collection = await this.getCollection();
      const user = await collection.findOne({ email });
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  static async create(user) {
    try {
      const collection = await this.getCollection();

      if (!user.name) throw new Error("name is required");
      if (!user.username) throw new Error("username is required");
      if (!user.email) throw new Error("email is required");
      if (!user.password) throw new Error("password is required");

      if (user.password.length < 5)
        throw new Error("password must be at least 5 characters");

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(user.email))
        throw new Error("invalid email format");

      const existingUser = await collection.findOne({
        $or: [{ email: user.email }, { username: user.username }],
      });

      if (existingUser) throw new Error("user already exists");

      user.password = await hashPassword(user.password);
      user.createdAt = user.updatedAt = new Date();
      await collection.insertOne(user);
      return {
        message: "user created successfully",
      };
    } catch (error) {
      console.log(error);
    }
  }

  static async update(id, user) {
    try {
      const collection = await this.getCollection();
      await collection.updateOne({ _id: new ObjectId(id) }, { $set: user });
      return {
        message: "user updated successfully",
      };
    } catch (error) {
      console.log(error);
    }
  }
}

async function test() {
  try {
    //test find all
    // const users = await UserModel.findAll();
    // console.log(users);
    //test find by id
    // const id = new ObjectId("6757c79da1aade29e5f29e85");
    // const user = await UserModel.findById(id);
    // console.log(user);
    //test find by email
    // const email = "user1@mail.com";
    // const user = await UserModel.findByEmail(email);
    // console.log(user);
    //test create
    // const user = {
    //   name: "user 7",
    //   username: "user7",
    //   email: "user7@mail.com",
    //   password: "password123",
    // };
    // const result = await UserModel.create(user);
    // console.log(result);
    // test update
    // const id = new ObjectId("6757c79da1aade29e5f29e85");
    // const user = {
    //   name: "user 1",
    //   username: "user1",
    //   email: "user1@mail.com",
    //   password: "password123",
    // };
    // const result = await UserModel.update(id, user);
    // console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    process.exit(0);
  }
}

// test();

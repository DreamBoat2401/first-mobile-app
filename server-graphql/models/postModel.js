import { getDb } from "../config/mongodb.js";
import { ObjectId } from "mongodb";
import { UserModel } from "./userModel.js";

export class PostModel {
  static async getCollection() {
    try {
      const db = await getDb();
      return db.collection("posts");
    } catch (error) {
      console.log(error);
    }
  }

  static async findAll() {
    try {
      const collection = await this.getCollection();
      const posts = await collection.find().toArray();
      return posts;
    } catch (error) {
      console.log(error);
    }
  }

  static async findById(id) {
    try {
      const collection = await this.getCollection();
      const post = await collection.findOne({ _id: new ObjectId(id) });
      return post;
    } catch (error) {
      console.log(error);
    }
  }

  static async create(post) {
    try {
      const collection = await this.getCollection();
      await collection.insertOne(post);
      return { message: "post created successfully" };
    } catch (error) {
      console.log(error);
    }
  }

  static async update(id, post) {
    try {
      const collection = await this.getCollection();
      await collection.updateOne({ _id: new ObjectId(id) }, { $set: post });
      return { message: "post updated successfully" };
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(id) {
    try {
      const collection = await this.getCollection();
      await collection.deleteOne({ _id: new ObjectId(id) });
      return { message: "post deleted successfully" };
    } catch (error) {
      console.log(error);
    }
  }

  static async comment(postId, comment) {
    try {
      const collection = await this.getCollection();
      const post = await collection.findOne({ _id: new ObjectId(postId) });
      post.comments.push({
        ...comment,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await collection.updateOne({ _id: new ObjectId(postId) }, { $set: post });
      return { message: "comment added successfully" };
    } catch (error) {
      console.log(error);
    }
  }
  static async like(postId, userId) {
    try {
      const collection = await this.getCollection();
      const user = await UserModel.findById(userId);
      console.log(user);

      await collection.updateOne(
        { _id: new ObjectId(postId) },
        { $addToSet: { likes: user } }
      );
      return { message: "like added successfully" };
    } catch (error) {
      console.log(error);
    }
  }
  static async unlike(postId, userId) {
    try {
      const collection = await this.getCollection();
      const user = await UserModel.findById(userId);

      await collection.updateOne(
        { _id: new ObjectId(postId) },
        { $pull: { likes: user } }
      );
      return { message: "like removed successfully" };
    } catch (error) {
      console.log(error);
    }
  }
}

async function test() {
  try {
    console.log("test posts model");
    //!test find all
    // const posts = await PostModel.findAll();
    // console.log(posts);
    //!test find by id
    // const id = new ObjectId("6757c79da1aade29e5f29d90");
    // const post = await PostModel.findById(id);
    // console.log(post);
    //!test create
    // const post = {
    //   title: "post 1",
    //   body: "post 1 body",
    //   authorId: "6757c79da1aade29e5f29d90",
    // };
    // const result = await PostModel.create(post);
    // console.log(result);
    //!test update
    // const id = new ObjectId("6757c79da1aade29e5f29d90");
    // const post = {
    //   title: "post 1 updated",
    //   body: "post 1 body updated",
    //   authorId: "6757c79da1aade29e5f29d90",
    // };
    // const result = await PostModel.update(id, post);
    // console.log(result);
    //!test delete
    // const id = new ObjectId("6757c79da1aade29e5f29d90");
    // const result = await PostModel.delete(id);
    // console.log(result);
    //!test comment
    // const postId = new ObjectId("6757c79da1aade29e5f29d90");
    // const comment = {
    //   text: "comment tessttt",
    //   authorId: "6757c79da1aade29e5f29d90",
    // };
    // const result = await PostModel.comment(postId, comment);
    // console.log(result);
    //!test like
    // const postId = new ObjectId("6757c79da1aade29e5f29d90");
    // const userId = new ObjectId("6757c79da1aade29e5f29e85");
    // const result = await PostModel.like(postId, userId);
    // console.log(result);
    //!test unlike
    // const postId = new ObjectId("6757c79da1aade29e5f29d90");
    // const userId = new ObjectId("6757c79da1aade29e5f29e85");
    // const result = await PostModel.unlike(postId, userId);
    // console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    process.exit(0);
  }
}
// test();

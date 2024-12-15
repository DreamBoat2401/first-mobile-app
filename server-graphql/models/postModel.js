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
    const collection = await this.getCollection();
    const posts = await collection
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "authorId",
            foreignField: "_id",
            as: "Author",
          },
        },
        {
          $project: {
            "Author.password": 0,
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $unwind: {
            path: "$Author",
            preserveNullAndEmptyArrays: false,
          },
        },
      ])
      .toArray();

    return posts;
  }

  static async findById(id) {
    const collection = await this.getCollection();
    const post = await collection
      .aggregate([
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "authorId",
            foreignField: "_id",
            as: "Author",
          },
        },
        {
          $project: {
            "Author.password": 0,
          },
        },
        {
          $unwind: {
            path: "$Author",
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
      .toArray();

    if (!post[0] && post.length === 0) throw new Error("Post not found");
    return post[0];
  }

  static async create(post) {
    const collection = await this.getCollection();

    if (!post.content) throw new Error("content is required");
    if (!post.imgUrl) throw new Error("imgUrl is required");
    if (!post.tags) throw new Error("tags is required");

    console.log(post, "post");
    await collection.insertOne({
      content: post.content,
      tags: post.tags || [],
      imgUrl: post.imgUrl || null,
      authorId: new ObjectId(post.authorId),
      comments: [],
      likes: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return { message: "post created successfully" };
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
    const collection = await this.getCollection();
    await collection.deleteOne({ _id: new ObjectId(id) });
    return { message: "post deleted successfully" };
  }

  static async comment(payload, username) {
    const collection = await this.getCollection();

    const { postId, content } = payload;

    const post = await collection.findOne({ _id: new ObjectId(postId) });

    if (!post) throw new Error("Post not found");

    await collection.updateOne(
      { _id: new ObjectId(postId) },
      {
        $push: {
          comments: {
            content,
            username,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      }
    );

    return { message: "Success add Comment" };
  }

  static async like(postId, username) {
    const collection = await this.getCollection();

    const post = await collection.findOne({
      _id: new ObjectId(postId),
      "likes.username": username,
    });

    if (post) {
      await collection.updateOne(
        { _id: new ObjectId(postId) },
        { $pull: { likes: { username } } }
      );

      return { message: "like removed successfully" };
    }

    await collection.updateOne(
      { _id: new ObjectId(postId) },
      {
        $push: {
          likes: {
            username,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      }
    );

    return { message: "Successfully liked the post" };
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

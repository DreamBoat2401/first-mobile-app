import { getDb } from "../config/mongodb.js";
import { ObjectId } from "mongodb";

export class FollowModel {
  static async getCollection() {
    try {
      const db = await getDb();
      return db.collection("follows");
    } catch (error) {
      console.log(error);
    }
  }
  static async findAll() {
    try {
      const collection = await this.getCollection();
      const follows = await collection.find().toArray();
      return follows;
    } catch (error) {
      console.log(error);
    }
  }

  static async isFollowing(followerId, followingId) {
    try {
      const collection = await this.getCollection();
      const follow = await collection.findOne({
        followerId,
        followingId,
      });
      return follow ? true : false;
    } catch (error) {
      console.log(error);
    }
  }

  static async followUser(follow, id) {
    const collection = await this.getCollection();

    const { followingId } = follow;
    const followerId = new ObjectId(id);

    const input = {
      followingId: new ObjectId(followingId),
      followerId,
    };

    const existingFollow = await collection.findOne(input);

    if (existingFollow) {
      await collection.deleteOne(input);
      return { message: "unfollowed successfully" };
    }

    const dataFollow = {
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await collection.insertOne(dataFollow);

    return { message: "followed successfully" };
  }

  static async getFollowers(followingId) {
    try {
      const collection = await this.getCollection();
      const followers = await collection
        .find({ followingId: followingId })
        .toArray();
      return followers;
    } catch (error) {
      console.log(error);
    }
  }

  static async getFollowing(followerId) {
    try {
      const collection = await this.getCollection();
      const following = await collection
        .find({ followerId: followerId })
        .toArray();
      return following;
    } catch (error) {
      console.log(error);
    }
  }
}

async function test() {
  try {
    //test find all
    // const follows = await FollowModel.findAll();
    // console.log(follows);
    //test find by id
    // const id = new ObjectId("6757c79da1aade29e5f29e85");
    // const follow = await FollowModel.findById(id);
    // console.log(follow);
    //test is following
    // const followerId = new ObjectId("6757c79da1aade29e5f29e86");
    // const followingId = new ObjectId("6757c79da1aade29e5f29e85");
    // const isFollowing = await FollowModel.isFollowing(followerId, followingId);
    // console.log(isFollowing);
    //test followUser
    // const followerId = new ObjectId("6757c79da1aade29e5f29e87");
    // const followingId = new ObjectId("6757c79da1aade29e5f29e86");
    // const follow = {
    //   followerId,
    //   followingId,
    // };
    // const result = await FollowModel.create(follow);
    // console.log(result);
    //test unfollow
    // const followerId = new ObjectId("6757c79da1aade29e5f29e87");
    // const followingId = new ObjectId("6757c79da1aade29e5f29e86");
    // const result = await FollowModel.unfollowUser(followerId, followingId);
    // console.log(result);
    //test get followers
    // const followingId = new ObjectId("6757c79da1aade29e5f29e86");
    // const followers = await FollowModel.getFollowers(followingId);
    // console.log(followers);
    //test get following
    // const followerId = new ObjectId("6757c79da1aade29e5f29e87");
    // const following = await FollowModel.getFollowing(followerId);
    // console.log(following);
  } catch (error) {
    console.log(error);
  } finally {
    process.exit(0);
  }
}
// test();

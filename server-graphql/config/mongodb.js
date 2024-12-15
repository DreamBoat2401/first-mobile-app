import { MongoClient } from "mongodb";
import "dotenv/config";

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

export async function connect() {
  try {
    await client.connect();
    // console.log("berhasil connect");
  } catch (error) {
    console.log("gagal connect", error);
  }
}

export async function getDb() {
  return client.db("tiktok");
}

// connect()

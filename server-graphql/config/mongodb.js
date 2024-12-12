import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://senodwilaksono:zo3ojIpIqDFcnWJn@cluster0.hd9tt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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

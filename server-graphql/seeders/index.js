import { connect, getDb } from "../config/mongodb.js";
import { seedFollow } from "./followSeeder.js";
import { seedPosts } from "./postsSeeder.js";
import { seedUsers } from "./userSeeder.js";

async function dropCollection() {
    try {
        const db = await getDb()
        await db.collection('users').drop().catch(() => console.log('user collection not found'));
        await db.collection('posts').drop().catch(() => console.log('user collection not found'));
        await db.collection('follows').drop().catch(() => console.log('user collection not found'));
        
    } catch (error) {
        console.log(error);
        
    }
}

async function seed() {
    try {
        // await connect()
        await dropCollection()
        await seedUsers()
        await seedPosts()
        await seedFollow()


    } catch (error) {
        console.log(error);
    } finally {
        process.exit(0)
    }
}

seed()
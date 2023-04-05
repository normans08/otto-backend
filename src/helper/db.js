import { MongoClient } from "mongodb";

export let usersTable;
export async function connect() {
  try {
    const client = await MongoClient.connect("mongodb://localhost:27017", {
      useUnifiedTopology: true,
    });
    console.log("db is connected");
    const db = client.db("test");
    usersTable = await db.collection("users");
    console.log("coleee", collection);
    return db;
  } catch (error) {
    console.log(error);
  }
}

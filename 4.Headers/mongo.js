const { MongoClient } = require("mongodb");

const URL = "mongodb+srv://Shyam:Shyamprasad7d@tutorial.5bdd4.mongodb.net/";
const client = new MongoClient(URL);
const dbName = "HelloWorld";

async function main() {
  try {
    await client.connect(); // Connect to MongoDB
    console.log("Connected to the database");

    const database = client.db(dbName);
    const collection = database.collection("User");

    
    const result = await collection.insertOne({ name: "John Doe", age: 30 });
    console.log("Inserted document:", result.insertedId);

    const findResult = await collection.find({}).toArray();
    console.log("Found documents =>", findResult);

  } catch (e) {
    console.error("Error:", e);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

main();

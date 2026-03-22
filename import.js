const { MongoClient } = require('mongodb');
const fs = require('fs');

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

async function importData() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("schoolDB");

    const data = JSON.parse(fs.readFileSync('data.json'));

    // Insert each collection
    if (data.students.length)
      await db.collection("students").insertMany(data.students);

    if (data.teachers.length)
      await db.collection("teachers").insertMany(data.teachers);

    if (data.coordinators.length)
      await db.collection("coordinators").insertMany(data.coordinators);

    if (data.admins.length)
      await db.collection("admins").insertMany(data.admins);

    console.log("🎉 Data imported successfully!");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

importData();
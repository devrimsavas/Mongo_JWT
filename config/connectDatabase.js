//database connection

//since we use mongodb we need to use MongoClient

const { MongoClient, ServerApiVersion } = require("mongodb");

const connectDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGO_URL, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    console.log(process.env.MONGO_URL);
    await client.connect();
    console.log("MongoDB connected successfully!");
    //or
    const db = client.db();
    return db;
  } catch (error) {
    console.error(`Error ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

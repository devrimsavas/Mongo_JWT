//MONGODB does not need this
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

    await client.connect();
    console.log("MongoDB connected successfully!");

    const db = client.db();

    // Define validation rules for the 'cars' collection
    const carSchema = {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["make", "model", "year"],
          properties: {
            make: {
              bsonType: "string",
              description: "must be a string and is required",
            },
            model: {
              bsonType: "string",
              description: "must be a string and is required",
            },
            year: {
              bsonType: "int",
              minimum: 1886, // Cars were invented in 1886
              maximum: new Date().getFullYear(),
              description:
                "must be an integer between 1886 and the current year",
            },
          },
        },
      },
    };

    // Create collection with validation rules (if it doesn't already exist)
    await db.createCollection("cars", carSchema);

    console.log("Cars collection created with schema validation!");

    return db;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

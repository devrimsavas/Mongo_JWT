var express = require("express");
var router = express.Router();
var connectDB = require("../config/connectDatabase");

var joiCarSchema = require("../Schemas/joiCarSchema");
const { ObjectId } = require("mongodb");

const { requiresAuth } = require("express-openid-connect");

const guestUser = require("../guestUser.js");
console.log(guestUser);

//Get all

// Get all cars and render the car page
router.get("/", async (req, res, next) => {
  try {
    const db = await connectDB();
    const carCollection = db.collection("cars");

    // Fetch all cars
    const cars = await carCollection.find({}).toArray();

    //user
    const user = req.oidc.user || guestUser;
    console.log(user);

    // Render 'cars.ejs' and pass the car data to the template
    res.render("cars", {
      title: "Cars Page",
      cars: cars,
      user: user,
    });
  } catch (error) {
    console.error(`Error ${error.message}`);
    res.status(500).render("error", {
      message: "Internal server error",
      error: error,
    });
  }
});

//find one
router.get("/findone/:type", async (req, res) => {
  try {
    const db = await connectDB();
    const carCollection = db.collection("cars");
    //const allCars = await carCollection.find({}).toArray();
    const nameCarToFind = req.params.type;
    const targetCar = await carCollection.findOne({ type: nameCarToFind });
    //test
    console.log(`target car: ${targetCar}`);
    //console.log(`all cars ${JSON.stringify(allCars, null, 5)}`);
    return res.status(200).json({
      targetCar: targetCar,
    });
  } catch (error) {
    console.error(`Error ${error.message}`);
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
});

//Add One

router.post("/", requiresAuth(), async (req, res, next) => {
  const { error, value } = joiCarSchema.validate(req.body);
  //check user
  console.log("is this page authentificated", req.oidc.isAuthenticated());
  console.log("The user for this page", req.oidc.user);
  console.log("The token", req.oidc.accessToken);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  const { type, HP, HPl100 } = value;

  if (!type || !HP || !HPl100) {
    return res.status(400).json({
      message: "Provide valid entries ",
    });
  }
  try {
    const db = await connectDB();
    const carCollection = db.collection("cars");

    //check if this car exists
    const existedCar = await carCollection.findOne({ type: type });

    if (existedCar) {
      return res.status(400).json({
        message: "this car already in inventory",
      });
    }

    await carCollection.insertOne({
      type: type,
      HP: HP,
      HPl100: HPl100,
    });

    res.status(201).json({
      message: "New Car added",
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal  server Error",
    });
  }
});

//delete one
router.delete("/", requiresAuth(), async (req, res, next) => {
  try {
    const { existedId } = req.body;

    // Validate input
    if (!existedId) {
      return res.status(400).json({
        message: "Please provide a valid car ID.",
      });
    }

    const db = await connectDB();
    const carCollection = db.collection("cars");

    // Convert existedId to ObjectId
    const existedCar = await carCollection.findOne({
      _id: new ObjectId(existedId),
    });

    // Check if the car exists
    if (!existedCar) {
      return res.status(400).json({
        message: "This car does not exist in the inventory.",
      });
    }

    // Delete the car
    await carCollection.deleteOne({ _id: new ObjectId(existedId) });

    return res.status(200).json({
      message: "The car was deleted successfully.",
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({
      error: "Internal server error.",
    });
  }
});

//update
router.put("/:carObjectId", requiresAuth(), async (req, res, next) => {
  try {
    const carId = req.params.carObjectId;

    // Validate if ID is present and valid
    if (!ObjectId.isValid(carId)) {
      return res.status(400).json({
        message: "Invalid car ID format",
      });
    }

    // Validate the request body using Joi
    const { error, value } = joiCarSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    // Destructure the validated values from Joi
    const { type, HP, HPl100 } = value;

    const db = await connectDB();
    const carCollection = db.collection("cars");

    // Prepare the fields to update
    const updateFields = {};
    if (type) updateFields.type = type;
    if (HP) updateFields.HP = HP;
    if (HPl100) updateFields.HPl100 = HPl100;

    // Update the car by ObjectId
    const updatedCar = await carCollection.updateOne(
      { _id: new ObjectId(carId) },
      { $set: updateFields }
    );

    if (updatedCar.matchedCount === 0) {
      return res.status(404).json({
        message: "Car not found.",
      });
    }

    return res.status(200).json({
      message: "Car updated successfully.",
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({
      error: "Internal server error.",
    });
  }
});

module.exports = router;

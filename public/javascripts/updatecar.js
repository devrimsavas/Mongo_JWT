$("document").ready(function () {
  console.log("update script taken");

  $("#updatecarbutton").on("click", async function (e) {
    // Make this function async
    e.preventDefault();
    console.log("update button captured");

    // Get the type input
    const carType = $("#type").val();
    console.log(`car type ${carType}`);
    // alert if carType is empty

    if (!carType || carType.length < 5) {
      alert(
        "you have to choose a car from list to update. or you entered not enough data"
      );
      return;
    }

    try {
      // Await the result from findTargetId
      const carToUpdate = await findTargetId(carType);
      console.log(`car to update`, carToUpdate); // Now this will log the actual car object
      //call update fetch
    } catch (error) {
      console.error("Failed to find car to update:", error);
    }
  });
});

// Make findTargetId return a Promise and use async/await inside
async function findTargetId(carType) {
  const encodedCarType = encodeURIComponent(carType);

  try {
    const response = await fetch(
      `http://localhost:3000/cars/findone/${encodedCarType}`
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json(); // Wait for the data to be parsed
    console.log("data from finalTargetId", JSON.stringify(data, null, 8));
    return data; // Return the car object
  } catch (error) {
    console.error("error", error);
    throw error; // Rethrow error to be handled by caller
  }
}

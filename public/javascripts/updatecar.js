$("document").ready(function () {
  console.log("update script taken");

  // Base origin for client function automatic base
  const baseOrigin = window.location.origin;

  let selectedCarId = null; // Store the car ID when it's selected

  // Handle double-click on car items to select a car and store its ID
  $(".caritems").on("dblclick", async function () {
    const carType = $(this).find("td:first").text().trim(); // Get car type from the table row
    console.log(`Selected car type: ${carType}`);

    try {
      // Find the car by type and store its ID
      const carToUpdate = await findTargetId(carType, baseOrigin);
      if (carToUpdate && carToUpdate.targetCar && carToUpdate.targetCar._id) {
        selectedCarId = carToUpdate.targetCar._id; // Store the car's ID
        console.log(`Selected car ID: ${selectedCarId}`);

        // Populate the form with the car details
        $("#type").val(carToUpdate.targetCar.type);
        $("#HP").val(carToUpdate.targetCar.HP);
        $("#HPl100").val(carToUpdate.targetCar.HPl100);
      } else {
        alert("Car not found or invalid.");
      }
    } catch (error) {
      console.error("Failed to find car to update:", error);
    }
  });

  // Update car when the update button is clicked
  $("#updatecarbutton").on("click", async function (e) {
    e.preventDefault();
    console.log("Update button captured");

    if (!selectedCarId) {
      alert("No car selected for updating.");
      return;
    }

    try {
      // Call the update function with the stored car ID
      await updateCar(selectedCarId, baseOrigin);
      alert("Car updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Failed to update car:", error);
    }
  });
});

// Find car by type
async function findTargetId(carType, baseOrigin) {
  const encodedCarType = encodeURIComponent(carType);

  try {
    const response = await fetch(
      `${baseOrigin}/cars/findone/${encodedCarType}`
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json(); // Wait for the data to be parsed
    console.log("Data from finalTargetId:", JSON.stringify(data, null, 8));

    return data; // Return the car object or null
  } catch (error) {
    console.error("Error fetching car data:", error);
    throw error; // Rethrow error to be handled by caller
  }
}

// Update car by ID
async function updateCar(carId, baseOrigin) {
  const updatedCar = {
    type: $("#type").val(),
    HP: $("#HP").val(),
    HPl100: $("#HPl100").val(),
  };

  try {
    const response = await fetch(`${baseOrigin}/cars/${carId}`, {
      method: "PUT", // Use PUT as required by your backend route
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCar), // Send the updated car data
    });

    if (!response.ok) {
      throw new Error("Error updating the car");
    }

    const data = await response.json();
    console.log("Updated car:", data);
  } catch (error) {
    console.error("Failed to update car:", error);
  }
}

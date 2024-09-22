$("document").ready(function () {
  let targetId; // Declare targetId in a scope accessible by both event handlers

  // Handle double-click on car items
  $(".caritems").on("dblclick", function () {
    const carType = $(this).find("td:first").text().trim();
    console.log(carType);
    //remove class
    $(".caritems").removeClass("markedforoperation");
    //add a class
    $(this).addClass("markedforoperation");

    const encodedCarType = encodeURIComponent(carType);

    // Fetch one car by car type
    fetch(`http://localhost:3000/cars/findone/${encodedCarType}`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("data", JSON.stringify(data, null, 6));

        // Populate the form fields with the car data
        $("#type").val(data.targetCar.type);
        $("#HP").val(data.targetCar.HP); // Set car horsepower
        $("#HPl100").val(data.targetCar.HPl100); // Set fuel efficiency

        // Set targetId to the car's _id from the fetched data
        targetId = data.targetCar._id;
        console.log("Target ID:", targetId); // Confirm that targetId is set
      })
      .catch((error) => {
        console.error("error", error);
      });
  });

  // Handle delete button click
  $("#deletecarbutton").on("click", function (e) {
    e.preventDefault();
    console.log("clicked delete button");

    if (!targetId) {
      console.error("No target car selected to delete.");
      return; // Stop execution if no car is selected
    }

    //easy confirm
    if (
      window.confirm(`are you sure to delete car with id ${targetId} `) == false
    ) {
      alert("you have canceled to delete");
      return;
    }

    // Fetch request to delete the car using targetId in the body
    fetch("http://localhost:3000/cars", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ existedId: targetId }), // Send targetId in the request body
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error deleting the car.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Car deleted successfully:", data);
        //add sinple alert
        alert(`you have deleted car `);

        // reload to show update
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});

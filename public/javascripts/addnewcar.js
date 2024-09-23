//add new car

$(document).ready(function () {
  const baseOrigin = window.location.origin;
  const testData = $("#addCarForm").find("input");
  console.log(testData);
  testData.each(() => {
    console.log($(this).val());
  });
  $("#addnewcarbutton").on("click", (e) => {
    e.preventDefault();
    console.log("intercepted");

    //get fields  serialize array
    const formData = $("#addCarForm").serializeArray();

    const carData = {}; //created an empty object

    formData.forEach((item) => {
      carData[item.name] = item.value;
    });

    console.log(`car object ${carData.type}`);

    //fetch
    fetch(`${baseOrigin}/cars`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(carData),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        alert("you have added new car");
        window.location.reload();
      })
      .catch((error) => {
        console.error("error", error);
      });
  });
  /*
  $(".caritems").on("click", function () {
    const carType = $(this).find("td:first").text();
    console.log(carType);
  });
  */
});

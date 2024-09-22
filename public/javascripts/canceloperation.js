//cancel operation

$("document").ready(function () {
  $("#canceloperationbutton").on("click", function (e) {
    e.preventDefault();
    console.log("cancel button taken");
    const formData = $("#addCarForm");
    formData.find("input").val("");
    alert("operation canceled by user");

    //get table td which was taken for operation
    const markedItem = $(".caritems"); //.find("td:first");
    console.log("++marked for cancel operation", markedItem.text());
    markedItem.removeClass("markedforoperation");

    markedItem.css({
      "background-color": "", // Reset to default (none)
      "font-size": "", // Reset to default (normal)
    });
  });
});

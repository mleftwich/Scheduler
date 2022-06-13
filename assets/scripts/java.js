// Clock in Header

function dateTime() {
  setInterval((currentTime) => {
    let currentDay = moment().format("Do MMMM YYYY hh:mm:ss");
    $("#currentDay").text(currentDay);
  }, 1000);
}
dateTime();

// How many rows needed

$(function () {
  const rowContainer = $(".container");
  for (let hour = 9; hour < 18; hour++) {
    const plannerRow = createPlannerRow(hour);
    rowContainer.append(plannerRow);
  }
});

// Creating grid for timeblocks

function createPlannerRow(hour) {
  // Timeblock Row, appropriate colouring for past/present/future

  const row = $("<div>");

  let rowClass = "row";
  const timeNow = moment().format("H");
  if (hour < timeNow) {
    rowClass = rowClass + " past";
  }

  if (hour > timeNow) {
    rowClass = rowClass + " future";
  }
  if (hour == timeNow) {
    rowClass = rowClass + " present";
  }

  row.attr("class", rowClass);

  // Time Column

  const timeCol = $("<div>");
  timeCol.attr("class", "time-col col-2");
  timeCol.text(moment(hour, "hh").format("LT"));

  // Textarea column

  const textCol = $("<div>");
  textCol.attr("class", "textarea-col col-8");

  // Create textarea and append it to column

  const textArea = $("<textarea>");
  textArea.attr("class", "textarea");
  
  // Get existing plans

  const plansMade = localStorage.getItem(hour);
  textArea.val(plansMade);
  textCol.append(textArea);

  // Column for save button
  const buttonCol = $("<div>");
  buttonCol.attr("class", "button-col col-2");

  // Create save button and append to column

  const saveBtn = $("<button>");
  saveBtn.attr("class", "saveBtn");
  saveBtn.text("Save");
  buttonCol.append(saveBtn);

  // Append all the columns to textblock row and return
  row.append(timeCol, textCol, buttonCol);

  return row;
}

// Save button onClick
$(document).on("click", ".saveBtn", function (event) {
  // Which row is targeted
  const clickField = $(event.target);
  const textarea = clickField.parent().prev().children();
  const timeCol = clickField.parent().prev().prev();
  const time = timeCol.text();
  // Convert time back to numeric value to store in appropriate field

  const hour = moment(time, "LT").format("HH");

  // Get the input and save it to local storage
  const toPlan = textarea.val();
  localStorage.setItem(hour, toPlan);
});

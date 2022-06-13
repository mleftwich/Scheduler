// Clock in Header

function dateTime() {
  setInterval((currentTime) => {
    let currentDay = moment().format("Do MMMM YYYY hh:mm:ss");
    $("#currentDay").text(currentDay);
  }, 1000);
}
dateTime();

// Creating grid for timeblocks 

function createPlannerRow(hour) {
  // Timeblock Row

  const row = $("<div>");
  row.attr("class", "row");
  
  // Time Column

  const timeCol = $("<div>");
  timeCol.attr("class", "time-col col-2");
  timeCol.text(moment(hour, "hh").format("LT"));
  
  // Textarea column for input

  const textCol = $("<div>");
  textCol.attr("class", "textarea-col col-8");
  
  // Create textarea and append it to column
  
  const textArea = $("<textarea>");
  textArea.attr("class", "textarea");
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
// How many rows needed 

$(function () {
  const rowContainer = $(".container");
  for (let hour = 9; hour < 18; hour++) {
    const plannerRow = createPlannerRow(hour);
    rowContainer.append(plannerRow);
  }
});
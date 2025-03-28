// Description: This file contains the JavaScript code for the Local Events application.
// Author: Kyle Barker - 1630724

// On page load, load a list of events
document.addEventListener("DOMContentLoaded", getEventsList);

// Event details array to store the details of the event - publically declared to enable access from multiple functions
let eventDetails = [];
document.getElementById("back").addEventListener("click", getEventsList);

// Fetch events list using an XHR request and display them in the eventList container
function getEventsList() {
  // Clear the eventList container to avoid caching
  document.getElementById("eventList").innerHTML = "";
  // Display the eventList container and title
  document.getElementById("eventList").innerHTML = "<h1>Local Events</h1>";
  document.getElementById("eventList").style.display = "block";
  // Hide the eventDetails container
  document.getElementById("eventDetails").style.display = "none";

  // Create an XHR request
  let asyncRequest = new XMLHttpRequest();
  asyncRequest.onload = () => {
    // Check if the request was successful
    if (asyncRequest.status === 200) {
      let eventContainer = document.getElementById("eventList");
      let events = JSON.parse(asyncRequest.responseText); // Parse JSON
      // Insert events into the container
      eventContainer.innerHTML += events
        .map(
          (event) =>
            `<div class="event-item" data-id="${event.id}">${event.name}</div>`
        )
        .join("");

      // Event delegation for click so that the event details can be fetched for the event clicked
      eventContainer.addEventListener("click", function (event) {
        let target = event.target;

        if (target.classList.contains("event-item")) {
          let eventId = target.getAttribute("data-id");
          fetchEventDetails(eventId);
        }
      });
    }
  };
  // Error handling
  asyncRequest.onerror = () =>
    console.error("Network error: Could not retrieve data");

  asyncRequest.open("GET", "getEventsList.php?t=" + Date.now(), true); // Prevents caching by adding date/time to url
  asyncRequest.send();
}

// Fetch event details using an XHR request and display them in the eventDetails container
function fetchEventDetails(eventId) {
  //DOM manipulation to display the event details container and hide the event list container
  document.getElementById("eventList").style.display = "none";
  document.getElementById("eventDetails").style.display = "block";
  document.getElementById("weather").style.display = "none";
  document.getElementById("editEvent").style.display = "none";

  // Fetch details of a specific event by event number (ID)
  // Number sent for the php file to query the DB in URL

  var eDetails = new XMLHttpRequest();
  eDetails.open("GET", "getEventDetails.php?eventId=" + eventId, true);
  eDetails.send();

  // Event listener to handle the response from the server when recived
  eDetails.onreadystatechange = function () {
    if (eDetails.readyState == 4 && eDetails.status == 200) {
      // Parse the JSON response
      eventDetails = JSON.parse(eDetails.responseText);
      console.log(eventDetails);
      console.log("Event NAME:" + eventDetails[0].name);

      // Display event details
      document.getElementById("eventName").innerHTML = eventDetails[0].name;

      document.getElementById("eventMonth").innerHTML =
        "Month: " + eventDetails[0].month;
      document.getElementById("eventDay").innerHTML =
        "Day: " + eventDetails[0].day;
      document.getElementById("eventTime").innerHTML =
        "Time: " + eventDetails[0].time;
      document.getElementById("eventLocation").innerHTML =
        "Location: " + eventDetails[0].location;
      document.getElementById("eventCategory").innerHTML =
        "Category: " + eventDetails[0].category;
      document.getElementById("eventCost").innerHTML =
        "Cost: $" + eventDetails[0].cost;

      document.getElementById("lon_lat").innerHTML =
        "Longitude: " + eventDetails[0].lon_lat;

      document.getElementById("eventTagged").innerHTML =
        "Tagged: " + eventDetails[0].tagged;

      document.getElementById("eventNotes").innerHTML =
        "Notes: " + eventDetails[0].notes;
    }
  };
}

// Event listener for the getWeather button
document.getElementById("getWeather").addEventListener("click", getWeather);

// Function to get the weather for the event
async function getWeather() {
  document.getElementById("weather").innerHTML = "";
  document.getElementById("weather").style.display = "block";
  document.getElementById("weather").innerHTML =
    "<h2> Current Weather Info</h2>";

  // API key for OpenWeatherMap
  var apiKey = "69b9fe24c1ed2aee705d6f960fa76b25";

  // Get the latitude and longitude of the event and split
  console.log("Getting weather for event:", eventDetails[0].lon_lat);
  let latlong = eventDetails[0].lon_lat.split(",");
  let lat = latlong[0].trim();
  let lon = latlong[1].trim();
  console.log("Lat:", lat, "Long:", lon);

  // Fetch the weather data from OpenWeatherMap
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
      encodeURIComponent(lat) +
      "&lon=" +
      encodeURIComponent(lon) +
      "&appid=" +
      apiKey +
      "&units=metric"
  )
    .then((response) => response.json()) // Convert response to JSON
    .then((data) => {
      console.log(data); // Handle the data
      // Display the weather data in the weather container
      document.getElementById("weather").innerHTML +=
        "Current Tempurature (C): " +
        data.main.temp +
        "<br>" +
        "Current Humidity (%): " +
        data.main.humidity +
        "<br>" +
        "Current Wind Speed (kph): " +
        data.wind.speed;
    })
    .catch((error) => console.error("Error:", error)); // Handle errors
}

// Event listener for the editEventButton
document.getElementById("editEventButton").addEventListener("click", editEvent);
// Event listener for the saveEvent button
document.getElementById("saveEvent").addEventListener("click", saveEvent);

// Function to display the edit event form
function editEvent() {
  document.getElementById("editEvent").style.display = "block";
  //Fill in the form with the event details
  document.getElementsByName("eventName")[0].value = eventDetails[0].name;
  document.getElementsByName("eventMonth")[0].value = eventDetails[0].month;
  document.getElementsByName("eventDay")[0].value = eventDetails[0].day;
  document.getElementsByName("eventTime")[0].value = eventDetails[0].time;
  document.getElementsByName("eventLocation")[0].value =
    eventDetails[0].location;
  document.getElementsByName("eventCategory")[0].value =
    eventDetails[0].category;
  document.getElementsByName("eventCost")[0].value = eventDetails[0].cost;
  document.getElementsByName("lon_lat")[0].value = eventDetails[0].lon_lat;
  document.getElementsByName("eventTagged")[0].value = eventDetails[0].tagged;
  document.getElementsByName("eventNotes")[0].value = eventDetails[0].notes;
}
// Function to save the event details
function saveEvent() {
  let updatedEvent = {
    id: eventDetails[0].id,
    name: document.getElementsByName("eventName")[0].value,
    month: document.getElementsByName("eventMonth")[0].value,
    day: document.getElementsByName("eventDay")[0].value,
    time: document.getElementsByName("eventTime")[0].value,
    location: document.getElementsByName("eventLocation")[0].value,
    category: document.getElementsByName("eventCategory")[0].value,
    cost: document.getElementsByName("eventCost")[0].value,
    lon_lat: document.getElementsByName("lon_lat")[0].value,
    tagged: document.getElementsByName("eventTagged")[0].value,
    notes: document.getElementsByName("eventNotes")[0].value,
  };

  console.log(updatedEvent);

  // Send the updated event details to the server
  var eventUpdate = new XMLHttpRequest();
  // Open a POST request to the saveEventDetails.php file
  eventUpdate.open("POST", "saveEventDetails.php", true);
  // Set the request header
  eventUpdate.setRequestHeader(
    "Content-Type",
    "application/json;charset=UTF-8"
  );
  // Send the updated event details as a JSON string
  eventUpdate.send(JSON.stringify(updatedEvent));
  // Update current detials with the new details
  eventUpdate.onreadystatechange = function () {
    if (eventUpdate.readyState == 4 && eventUpdate.status == 200) {
      console.log(eventUpdate.responseText);
      fetchEventDetails(updatedEvent.id); // Fetch updated event details after saving
    }
  };
}

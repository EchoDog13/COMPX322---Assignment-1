document.addEventListener("DOMContentLoaded", getEventsList);

let eventDetails = [];

function getEventsList() {
  let asyncRequest = new XMLHttpRequest();

  asyncRequest.onload = () => {
    if (asyncRequest.status === 200) {
      let eventContainer = document.getElementById("eventList");

      let events = JSON.parse(asyncRequest.responseText); // Parse JSON

      // Insert events into the container
      eventContainer.innerHTML = events
        .map(
          (event) =>
            `<div class="event-item" data-id="${event.id}">${event.name}</div>`
        )
        .join("");

      // Use event delegation for clicks
      eventContainer.addEventListener("click", function (event) {
        let target = event.target;

        if (target.classList.contains("event-item")) {
          let eventId = target.getAttribute("data-id");
          fetchEventDetails(eventId);
          alert(`Clicked on event ID: ${eventId}`);
        }
      });
    }
  };

  asyncRequest.onerror = () =>
    console.error("Network error: Could not retrieve data");

  asyncRequest.open("GET", "getEventsList.php", true);
  asyncRequest.send();
}

// Fetch event details using an XHR request
// eventID is the ID of the event to fetch
function fetchEventDetails(eventId) {
  // Fetch details of a specific event by event number (ID)
  // Number must be sent for the php file to query the DB

  var eDetails = new XMLHttpRequest();
  eDetails.open("GET", "getEventDetails.php?eventId=" + eventId, true);
  eDetails.send();

  eDetails.onreadystatechange = function () {
    if (eDetails.readyState == 4 && eDetails.status == 200) {
      eventDetails = JSON.parse(eDetails.responseText);
      console.log(eventDetails);
      console.log("Event NAME:" + eventDetails[0].name);

      // Display event details
      document.getElementById("eventName").innerHTML =
        "Event Name: " + eventDetails[0].name;

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
      document.getElementById("eventCost").src =
        "Cost: " + eventDetails[0].cost;

      document.getElementById("lon_lat").innerHTML =
        "Longitude: " + eventDetails[0].lon_lat;

      document.getElementById("eventTagged").innerHTML =
        "Tagged: " + eventDetails[0].tagged;
    }
  };
}

document.getElementById("getWeather").addEventListener("click", getWeather);

async function getWeather() {
  var apiKey = "69b9fe24c1ed2aee705d6f960fa76b25";

  console.log("Getting weather for event:", eventDetails[0].lon_lat);
  let latlong = eventDetails[0].lon_lat.split(",");
  let lat = latlong[0].trim();
  let lon = latlong[1].trim();
  console.log("Lat:", lat, "Long:", lon);

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
      document.getElementById("weather").innerHTML =
        "Current Tempurature (C): " +
        data.main.temp +
        "<br>" +
        "Current Humidity: " +
        data.main.humidity +
        "<br>" +
        "Current Wind Speed: " +
        data.wind.speed +
        "<br>" +
        "Daily Tempurate Maximum: " +
        data.main.temp_max +
        "<br>" +
        "Daily Tempurate Minimum: " +
        data.main.temp_min;
    })
    .catch((error) => console.error("Error:", error)); // Handle errors
}

document.getElementById("editEventButton").addEventListener("click", editEvent);
document.getElementById("saveEvent").addEventListener("click", saveEvent);

function editEvent() {
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
}

function saveEvent() {
  let newEvent = {
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
  };

  console.log(newEvent);

  var eventUpdate = new XMLHttpRequest();
  eventUpdate.open("POST", "saveEventDetails.php", true);
  eventUpdate.setRequestHeader(
    "Content-Type",
    "application/json;charset=UTF-8"
  );
  eventUpdate.send(JSON.stringify(newEvent));

  // eventUpdate.onreadystatechange = function () {
  //   if (eventUpdate.readyState == 4 && eventUpdate.status == 200) {
  //     console.log(eventUpdate.responseText);
  //     getEventsList();
  //   }
  // };
}

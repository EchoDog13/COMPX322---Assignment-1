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
  fetch;

  console.log("Getting weather" + eventDetails[0].lon_lat);
  let latlong = eventDetails[0].lon_lat;
  let lat = latlong.split(",")[0];
  let lon = latlong.split(",")[1];
  console.log("Lat" + lat, "Long" + lon);

  fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${apiKey}&units=metric"
  )
    .then((response) => response.json()) // Convert response to JSON
    .then((data) => console.log(data)) // Handle the data
    .then(
      (data) =>
        (document.getElementById("weather").innerHTML =
          "Weather: " + data.weather.temp)
    )
    .then.catch((error) => console.error("Error:", error)); // Handle errors
}

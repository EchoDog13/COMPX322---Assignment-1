document.addEventListener("DOMContentLoaded", getEventsList);

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
      var eventDetails = JSON.parse(eDetails.responseText);
      console.log(eventDetails);
      console.log("Event NAME:" + eventDetails[0].name);

      // Display event details
      document.getElementById("eventName").innerHTML =
        "Event Name:" + eventDetails[0].name;
      document.getElementById("eventDay").innerHTML =
        "Day" + eventDetails[0].day;
      document.getElementById("eventTime").innerHTML =
        "Time" + eventDetails[0].time;
      document.getElementById("eventLocation").innerHTML =
        "Location" + eventDetails[0].location;
      document.getElementById("eventCategory").innerHTML =
        "Category" + eventDetails[0].category;
      document.getElementById("eventCost").src = "Cost" + eventDetails[0].cost;
    }
  };
}

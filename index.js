function getEventsList() {
  let asyncRequest = new XMLHttpRequest(); // Declare variable properly

  asyncRequest.onload = () => {
    if (asyncRequest.status === 200) {
      // Check if request was successful

      document.addEventListener("DOMContentLoaded", function () {
        let eventContainer = document.getElementById("eventList");

        let events = JSON.parse(asyncRequest.responseText); // Parse JSON

        eventContainer.innerHTML = events
          .map(
            (event) =>
              `<div class="event-item" data-id="${event.id}">${event.name}</div>`
          )
          .join("");
      });

      eventContainer.addEventListener("click", function (event) {
        let target = event.target;

        if (target.classList.contains("event-item")) {
          let eventId = target.getAttribute("data-id");
          alert(`Clicked on event: ${event.name}`);
        }
      });

      events.array.forEach((element) => {
        let eventElement = document.createElement("div");
        eventElement.textContent = element.name;
        eventElement.classList.add("event-item");
        eventElement.setAttribute("id", element.id);
      });
    }
  };

  asyncRequest.onerror = () =>
    console.error("Network error: Could not retrieve data");

  asyncRequest.open("GET", "getEventsList.php", true); // Ensure async=true
  asyncRequest.send();
}

document.addEventListener("DOMContentLoaded", getEventsList);

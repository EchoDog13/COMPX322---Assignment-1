function getEventsList() {
  let asyncRequest = new XMLHttpRequest(); // Declare variable properly

  asyncRequest.onload = () => {
    if (asyncRequest.status === 200) {
      // Check if request was successful
      let events = JSON.parse(asyncRequest.responseText); // Parse JSON

      //   let content = document.getElementById("testArea");
      //   content.innerHTML = data.map((event) => `<p>${event.name}</p>`).join(""); // Display event names

      //   console.log(data); // Log the JSON data
      // } else {
      //   console.error("Error: " + asyncRequest.status);

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

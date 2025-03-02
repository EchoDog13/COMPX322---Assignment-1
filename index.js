function getEventsList() {
  asyncRequest = new XMLHttpRequest();
  asyncRequest.onload = showData;
  asyncRequest.onerror = handleError;
  asyncRequest.open("GET", getEventsList.php);
  asyncRequest.send();

  let showData = () => {
    let data = asyncRequest.responseText;
    let content = document.getElementById("testArea");
    content.innerHTML = data;
  };
  let handleError = () => {
    console.error("Error: could not retrieve data");
  };
}

document.addEventListener("DOMContentLoaded", getEventsList);

function getEventsList() {
  asyncRequest = new XMLHttpRequest();

  let showData = () => {
    let data = asyncRequest.responseText;
    console.log(data);
    let content = document.getElementById("testArea");
    content.innerHTML = data;
  };
  let handleError = () => {
    console.error("Error: could not retrieve data");
  };

  asyncRequest.onload = showData;
  asyncRequest.onerror = handleError;
  asyncRequest.open("GET", getEventsList.php);
  asyncRequest.send();
}

document.addEventListener("DOMContentLoaded", getEventsList);

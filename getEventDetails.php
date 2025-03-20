<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'connectdb.php'; // Include the PDO connection

//receive the id from the get request
$id = $_GET['eventId'];

$sql = "SELECT * FROM events WHERE id = $id"; // SQL query to get all events
$result = $con->query($sql);

$events = []; // Store results in an array
while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    $events[] = $row; // Add each row to the array
}

// Send JSON response
header('Content-Type: application/json');
echo json_encode($events);
?>
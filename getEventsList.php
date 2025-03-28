<?php
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

include 'connectdb.php'; // Include the PDO connection

// SQL query to get all events and thier id
$sql = "SELECT `name`, `id` FROM events";
$result = $con->query($sql);

$events = []; // Store results in an array
while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    $events[] = $row; // Add each row to the array
}

// Send JSON response
header('Content-Type: application/json');
echo json_encode($events);
?>
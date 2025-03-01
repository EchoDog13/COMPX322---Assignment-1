<?php

require_once('connectdb.php');

// if ($con) {
//     die("Connection failed: " . $cnn->connect_error);
// }




$query = "SELECT name FROM events";

$result = $conn->query($sql);

$events = [];
while ($row = $result->fetch_assoc()) {
    $events[] = $row;
}

echo json_encode($events);

$conn->close();

?>
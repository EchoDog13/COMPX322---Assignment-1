<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);


require_once('connectdb.php');

// if ($con) {
//     die("Connection failed: " . $cnn->connect_error);
// }




$query = "SELECT name FROM events";

$result = $con->query($query);
system(print ($result));

//$events = [];
// while ($row = $result->fetch_assoc()) {
//     $events[] = $row;
// }

echo json_encode($events);

// $con->close();

?>
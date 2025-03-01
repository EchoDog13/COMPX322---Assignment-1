<!-- <?php

error_reporting(E_ALL);
ini_set('display_errors', 1);


require_once('connectdb.php');

// if ($con) {
//     die("Connection failed: " . $cnn->connect_error);
// }




$query = "SELECT name FROM events";

$result = $con->query($query);

//$events = [];
// while ($row = $result->fetch_assoc()) {
//     $events[] = $row;
// }

echo json_encode($events);

// $con->close();

?> -->

<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'connectdb.php'; // Include the PDO connection

$sql = "SELECT name FROM events";
$stmt = $con->query($sql); // Execute query

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    echo "ID: " . $row["id"] . " - Name: " . $row["name"] . "<br>";
}
?>
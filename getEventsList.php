<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'connectdb.php'; // Include the PDO connection

$sql = "SELECT name FROM events"; //
$result = $con->query($sql); // Execute query

while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
   // echo $row["name"] . "<br>";
};
?>
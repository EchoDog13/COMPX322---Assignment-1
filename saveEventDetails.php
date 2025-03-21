<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'connectdb.php'; // Include the PDO connection

try {

    $JSONData = json_decode(file_get_contents('php://input'), true); // Get the JSON data from the POST request
    if ($JSONData == null) {
        throw new Exception("Invalid JSON data");
    } else {

        $name = $JSONData['name'];
        $lat_long = $JSONData['lat_log'];
        $cost = $JSONData['cost'];
        $month = $JSONData['month'];
        $day = $JSONData['day'];

        $time = $JSONData['time'];
        $location = $JSONData['location'];
        $id = $JSONData['id'];
        $tagged = $JSONData['tagged'];

        //UPDATE into db at ID
        $sql = "UPDATE events SET name = '$name', lat_lon = '$lat_long', cost = '$cost', month = '$month', day = '$day', time = '$time', location = '$location', tagged = '$tagged' WHERE id = $id";


        $con->query($sql);
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
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
        $lat_long = $JSONData['lon_lat'];
        $cost = $JSONData['cost'];
        $month = $JSONData['month'];
        $day = $JSONData['day'];
        $time = $JSONData['time'];
        $location = $JSONData['location'];
        $id = $JSONData['id'];
        $tagged = $JSONData['tagged'];

        // Prepare the SQL query to update the event details
        $sql = "UPDATE events SET 
            name = :name,
            lon_lat = :lon_lat,
            cost = :cost,
            month = :month,
            day = :day,
            time = :time,
            location = :location,
            tagged = :tagged
            WHERE id = :id";

        $stmt = $con->prepare($sql);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':lon_lat', $lat_long);
        $stmt->bindParam(':cost', $cost);
        $stmt->bindParam(':month', $month);
        $stmt->bindParam(':day', $day);
        $stmt->bindParam(':time', $time);
        $stmt->bindParam(':location', $location);
        $stmt->bindParam(':tagged', $tagged);
        $stmt->bindParam(':id', $id);

        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Event details updated successfully']);
        } else {
            throw new Exception('Failed to update event details');
        }
    }
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
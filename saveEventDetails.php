<?php
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

//Connect to the database
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
        $notes = $JSONData['notes'];

        // Prepare the SQL query to update the event details
        $sql = "UPDATE events SET 
            name = :name,
            lon_lat = :lon_lat,
            cost = :cost,
            month = :month,
            day = :day,
            time = :time,
            location = :location,
            notes = :notes,
            tagged = :tagged
            WHERE id = :id";

        //Binging variables to the prepared statement to alow for speical characters and prevent SQL injection
        $bind = $con->prepare($sql);
        $bind->bindParam(':name', $name);
        $bind->bindParam(':lon_lat', $lat_long);
        $bind->bindParam(':cost', $cost);
        $bind->bindParam(':month', $month);
        $bind->bindParam(':day', $day);
        $bind->bindParam(':time', $time);
        $bind->bindParam(':location', $location);
        $bind->bindParam(':tagged', $tagged);
        $bind->bindParam(':id', $id);
        $bind->bindParam(':notes', $notes);

        // Execute the query
        if ($bind->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Event details updated successfully']);
        } else {
            throw new Exception('Failed to update event details');
        }
    }
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'connectdb.php'; // Include the PDO connection

try {
    // Receive the id from the GET request
    if (!isset($_GET['eventId'])) {
        throw new Exception('Event ID is required');
    }
    $id = $_GET['eventId'];

    // Receive form data from POST request
    $fields = ['name', 'month', 'day', 'time', 'location', 'category', 'cost', 'lon_lat', 'tagged'];
    $formData = [];
    foreach ($fields as $field) {
        if (!isset($_POST[$field])) {
            throw new Exception("Field $field is required");
        }
        $formData[$field] = $_POST[$field];
    }

    // Prepare the SQL query to update the event details
    $sql = "UPDATE events SET 
        name = :name,
        month = :month,
        day = :day,
        time = :time,
        location = :location,
        category = :category,
        cost = :cost,
        lon_lat = :lon_lat,
        tagged = :tagged
        WHERE id = :id";

    if ($con->exec($sql)) {
        echo json_encode(['status' => 'success', 'message' => 'Event details updated successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to update event details']);
    }
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
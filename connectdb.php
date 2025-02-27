<?php

try {

    $con = new PDO('mysql:host=learn-mysql.cms.waikato.ac.nz;dbname=kb477', 'kb477', 'my413052sql');
} catch (PDOException $e) {
    echo "Database connection error " . $e->getMessage();
}


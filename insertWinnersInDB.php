<?php
$servername = "localhost";
$username = "admin";
$password = "admin";
$dbname = "LOTTERY_RESULTS";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$data = json_decode(file_get_contents('php://input'), true);
$winners = $data["winners"];
$number = $data["number"];
$lot_num_time = $data["lot_num_time"];
if($winners != "" && $number != "" && $lot_num_time != ""){
    $stmt = $conn->prepare("INSERT INTO LOTTERY_RESULTS (WINNERS, LOTTERY_NUMBER, LOT_NUM_TIME) VALUES (?, ?, ?)");
    $stmt->bind_param("sis", $winners, $number, $lot_num_time);
    $stmt->execute();
    echo "success";
    $stmt->close();
}

$conn->close();
?> 
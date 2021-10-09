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
$stmt = $conn->prepare("INSERT INTO LOTTERY_RESULTS (WINNERS, LOTTERY_NUMBER) VALUES (?, ?)");
$stmt->bind_param("si", $winners, $number);
$stmt->execute();
echo "success";
$stmt->close();
$conn->close();
?> 
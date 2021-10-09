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
$lot_num_time = $data["lot_num_time"];
/*$number = $data["number"];
$lot_num_time = $data["lot_num_time"];*/
$stmt = $conn->prepare("SELECT WINNERS FROM LOTTERY_RESULTS WHERE LOT_NUM_TIME = ?");
$stmt->bind_param("s", $lot_num_time);
$stmt->execute();
//echo "success";
$winners = "";
$result = $stmt->get_result();
while ($row = $result->fetch_assoc()) {
    $winners .= $row['WINNERS'];
    $winners .=", ";
}
echo substr($winners, 0 , -2);


$stmt->close();
$conn->close();

?> 
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
//$data = json_decode(file_get_contents('php://input'), true);
//$lot_num_time = $data["lot_num_time"];
/*$number = $data["number"];
$lot_num_time = $data["lot_num_time"];*/
$stmt = $conn->prepare("SELECT GROUP_CONCAT(tab.winners SEPARATOR ', ') AS WINNERS
FROM (SELECT winners, lr1.LOT_NUM_TIME FROM lottery_results lr1 INNER JOIN (SELECT LOT_NUM_TIME FROM lottery_results GROUP BY LOT_NUM_TIME DESC LIMIT 5) AS lr2 ON lr1.LOT_NUM_TIME = lr2.LOT_NUM_TIME ) AS tab
GROUP BY tab.LOT_NUM_TIME;");
//$stmt->bind_param("s", $lot_num_time);
$stmt->execute();
//echo "success";
$winners = [];
$result = $stmt->get_result();
while ($row = $result->fetch_assoc()) {
    array_unshift($winners, $row["WINNERS"]);
}
echo json_encode($winners, JSON_FORCE_OBJECT);


$stmt->close();
$conn->close();

?> 
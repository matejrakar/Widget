<?php
/**
 * This piece of code connects to DB and retrieves grouped data of all names of winners and corresponding lottery number.
 * It returns stringified JSON.
 */
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

$stmt = $conn->prepare("SELECT GROUP_CONCAT(NULLIF(tab.winners, '') SEPARATOR ', ') AS WINNERS, LOTTERY_NUMBER 
FROM (SELECT winners, lr1.LOT_NUM_TIME, LOTTERY_NUMBER FROM LOTTERY_RESULTS lr1 
INNER JOIN (SELECT LOT_NUM_TIME FROM LOTTERY_RESULTS GROUP BY LOT_NUM_TIME DESC LIMIT 5) AS lr2 
ON lr1.LOT_NUM_TIME = lr2.LOT_NUM_TIME ) AS tab 
GROUP BY tab.LOT_NUM_TIME ");

$stmt->execute();

$winners = [];
$result = $stmt->get_result();

while ($row = $result->fetch_assoc()) {
    array_unshift($winners, $row);
}

echo json_encode($winners, JSON_FORCE_OBJECT);

$stmt->close();
$conn->close();

?> 
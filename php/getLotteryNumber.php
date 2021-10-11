<?php
echo CallAPI("https://celtra-lottery.herokuapp.com/api/getLotteryNumber", []);
/**
 * This function fetches lottery data from Celtra API
 */
function CallAPI($url, $data = [])
{
    $curl = curl_init();
    if ($data){
        $url = sprintf("%s?%s", $url, http_build_query($data));
    }

    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

    $result = curl_exec($curl);

    curl_close($curl);

    return $result;
}

?>











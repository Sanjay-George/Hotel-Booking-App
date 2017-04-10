<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$hId = $request->hId;
$uId = $request->uId;
$start = $request->start;
$end = $request->end;

//echo $end;
$link = mysqli_connect("localhost", "root", "", "hotel");
if(mysqli_connect_error())
    die("Unable to connect to database");


$query = "SELECT SUM(singleBR) AS availSB, SUM(doubleBR) AS availDB, SUM(familyBR) AS availFR FROM bookings WHERE h_id = ".$hId." AND startDate >= '".$start."' AND endDate <= '".$end."' ";
//echo $query;


$response = [];

$result = mysqli_query($link, $query);
if(mysqli_num_rows($result) != 0){
    while($row = mysqli_fetch_array($result)){
        array_push($response, $row);
    }
}

$responseJson = json_encode($response);
echo $responseJson;
//echo 'HI';



?>
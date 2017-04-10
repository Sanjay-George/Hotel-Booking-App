<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$userId = $request->uId;
//echo $hotelId;
$link = mysqli_connect("localhost", "root", "", "hotel");
if(mysqli_connect_error())
    die("Unable to connect to database");


$query = "SELECT hotels.name,bookings.* FROM bookings INNER JOIN hotels ON hotels.id = bookings.h_id WHERE bookings.u_id = ".$userId;


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
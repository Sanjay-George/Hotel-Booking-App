<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$hId = $request->hId;
$uId = $request->uId;
$start = $request->start;
$end = $request->end;
$single = $request->single;
$double = $request->double;
$family = $request->family;
$response = "";
//echo $end;
$link = mysqli_connect("localhost", "root", "", "hotel");
if(mysqli_connect_error())
    die("Unable to connect to database");


if($single>0 || $double>0 or $family>0){
    $query = "INSERT INTO bookings (u_id, h_id, singleBR, doubleBR, familyBR, startDate, endDate) VALUES (".$uId.", ".$hId.", ".$single.",".$double.", ".$family.", '".$start."', '".$end."') ";
//    echo $query;
    if (!mysqli_query($link, $query))
        $response  = "failed";
    else 
        $response = "success";
    
}

echo $response;


?>
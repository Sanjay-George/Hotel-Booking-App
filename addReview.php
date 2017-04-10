<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$hId = $request->hId;
$uId = $request->uId;
$text = $request->text;
$rating = $request->rating;
$response = "";
//echo $end;
$link = mysqli_connect("localhost", "root", "", "hotel");
if(mysqli_connect_error())
    die("Unable to connect to database");


$query = "INSERT INTO reviews (u_id, h_id, review_text, rating) VALUES (".$uId.", ".$hId.", '".$text."', ".$rating.") ";
//    echo $query;
if (!mysqli_query($link, $query))
    $response  = "failed";
else 
    $response = "success";
    


echo $response;


?>
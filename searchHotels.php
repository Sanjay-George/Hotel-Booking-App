<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$keyword = $request->query;
$filter = $request->filter;
$location = $request->location;



$link = mysqli_connect("localhost", "root", "", "hotel");
if(mysqli_connect_error())
    die("Unable to connect to database");

if($location == 0){
    if($filter != "")
        $query = "SELECT id,name,address,cost,rat_avg FROM hotels WHERE    name LIKE '%".$keyword."%' OR address LIKE '%".$keyword."%' ORDER BY ".$filter."";
    else
        $query = "SELECT id,name,address,cost,rat_avg FROM hotels WHERE    name LIKE '%".$keyword."%' OR address LIKE '%".$keyword."%' ";
}
else if($location == 1) {
    $maxLat = $request->maxLat;
    $minLat = $request->minLat;
    $maxLong = $request->maxLong;
    $minLong = $request->minLong;
    
    if($filter != "")
        $query = "SELECT id,name,address,cost,rat_avg FROM hotels WHERE latitude <= ".$maxLat." AND latitude >= ".$minLat." AND longitude <= ".$maxLong." AND longitude >= ".$minLong." ORDER BY ".$filter." ";
    else
        $query = "SELECT id,name,address,cost,rat_avg FROM hotels WHERE latitude <= ".$maxLat." AND latitude >= ".$minLat." AND longitude <= ".$maxLong." AND longitude >= ".$minLong." ";
    
//    $query = "SELECT id,name,address,cost,rat_avg FROM hotels WHERE latitude <= ".$maxLat." AND latitude >= ".$minLat." AND longitude <= ".$maxLong." AND longitude >= ".$minLong." ";
//    echo $query;
}

//$query = "SELECT * FROM `hotels` ";
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
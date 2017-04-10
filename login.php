<?php
// FOR LOGGING IN
// RETURN ERROR OR SUCCESS

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$email = $request->email;
$password = $request->password;


$link = mysqli_connect("localhost", "root", "","hotel");
if (mysqli_connect_error()){
    die('Unable to connect to the database');
}
$error=""; 

if (!$email){
    $error = 'One or more fields are empty';
}
if (!$password){
    $error = 'One or more fields are empty';
}
if ($error == ""){
    $query = "SELECT * FROM `users` WHERE users.email = '".mysqli_real_escape_string($link, $email)."' LIMIT 1";
    $result = mysqli_query($link, $query);
    $row = mysqli_fetch_array($result);
 
    if (array_key_exists("u_id", $row)){
        $hashedpassword = md5(md5($row['u_id']).$password);
        if ($hashedpassword == $row['password']){
            // valid
            $id = $row['u_id'];
//            $_SESSION["id"] = $id;
            setcookie("id", $id, time() + 60*60*24*15);

        }else{
            $error = 'Invalid email/password';

        }
    }
    else{
        $error = 'Invalid email/password';
    }
    
    if ($error == ""){
        $error = 'success';
    }
    
}

echo $error;
//print_r($_SESSION);






?>
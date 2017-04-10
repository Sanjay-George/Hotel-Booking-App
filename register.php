<?php
// FOR SIGNUP QUERY 
// RETURN ERROR OR SUCCESS 

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$email = $request->email;
$name = $request->fullName;
$password = $request->password;
$confirm = $request->confirm;



$link = mysqli_connect("localhost", "root", "","hotel");
if (mysqli_connect_error()){
    die('Unable to connect to the database');
}
$error=""; 


if ($confirm != $password){
    $error = 'Passwords do not match';
}
if (strlen($password) < 8){
    $error = 'Password must have atleast 8 characters';
}
if (!$confirm){
    $error = 'Please confirm the password';
}
if (!$password){
    $error = 'Please enter password';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $error = "Invalid email format"; 
}
if (!$email){
    $error = 'Please enter a valid email id';
}
if (!$name){
    $error = 'Enter username';
}

if ($error == ""){

    
    $query = "SELECT u_id FROM `users` WHERE email='".mysqli_real_escape_string($link, $email)."'";

    $result = mysqli_query($link, $query);

    if (mysqli_num_rows($result) != 0){
        $error = "Email id already taken";
    } else{
        // INSERT ALL VALUES INTO DB
        $query = "INSERT INTO `users` (`name`, `email`, `password`) values ( '".mysqli_real_escape_string($link, $name)."', '".mysqli_real_escape_string($link, $email)."', '".mysqli_real_escape_string($link, $password)."')";

        if (!mysqli_query($link, $query)){
            $error = "Sign up failed ! Please try again later.";
        }
        else{
            $query = "SELECT u_id FROM `users` WHERE email='".mysqli_real_escape_string($link, $email)."'";
            $result = mysqli_query($link, $query);
            $row = mysqli_fetch_array($result);
            $id = $row['u_id'];

            //HASH PASSWORD
            $query = "UPDATE `users` SET password= '".md5(md5($id).$password)."' WHERE u_id =".$id." LIMIT 1";
            mysqli_query($link, $query);

            //setting session
            $_SESSION["id"] = $id; 
            setcookie("id", $id, time() + 60*60*24*15);

        }
    }
    
    if ($error == ""){
        $error = 'success';
    }

}

echo $error;


?>
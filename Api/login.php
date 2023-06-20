<?php
require 'connect.php';
$db = db();
$username = $_POST['user_name'];
$password = $_POST['pass_word'];
$checkSql = "SELECT * FROM user_details WHERE email = '$username'";
$checkResult = mysqli_query($db, $checkSql);
  if ($checkResult->num_rows > 0) {
    $PassCheck = "SELECT * FROM user_details WHERE email = '$username' AND password = '$password'";
    $checkPass = mysqli_query($db, $PassCheck);
    if ($checkPass->num_rows > 0){
        $res['success'] = true;
        $res['message'] = 'Authorized User';
    }
    else {
      $res['success'] = false;
      $res['message'] = 'Incorrect Password';
    }  
    }
     else {
        $res['success'] = false;
        $res['message'] = 'Username Not Found';
}
echo json_encode($res);
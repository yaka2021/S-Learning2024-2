<?php
$userName = trim($_POST["username"]);
include("userManager.php");

if(strlen($userName) > 0){
  $result = UserManager::UpdateName($userName); 

  if($result != false){
    session_start();
    $_SESSION["username"] = $result["NAME"];
    header("Location: ../index.php");
    exit;
  }else{
    header("Location: ../f_user_name.php");
    exit;
  }
}

header("Location: ../f_user_name.php");
exit;
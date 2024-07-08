<?php 
$userName = trim($_POST["username"]);
$password = trim($_POST["password"]);

include("userManager.php");

if(isset($userName) && isset($password)){
  $result = UserManager::UserLogin($userName,$password); 
  
  // if(strlen($password) > 10){
  //   header("Location: ../f_login.php");
  //   exit;
  // }

  if(!preg_match('/[a-zA-Z0-9]+/u', $password)){
    header("Location: ../f_create_user.php");
    exit;
  }
  
  if(isset($result["NAME"]) && isset($result["PASSWORD"])){
    session_start();
    $_SESSION["username"] = $result["NAME"];
    
    header("Location: ../index.php");
    exit;
  }else{
    header("Location: ../f_login.php");
    exit;
  }
}

header("Location: ../f_login.php");
exit;
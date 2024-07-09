<?php 
$userName = trim($_POST["username"]);
$password = trim($_POST["password"]);

include("userManager.php");
session_start();

  if(!isset($userName) || !isset($password)){
    $_SESSION['error_meg'] = 'shortageInfo';
    header("Location: ../f_login.php");
    exit;
  }
    
  if(strlen($userName) < 1 || strlen($userName) > 10){
    $_SESSION['error_meg'] = 'charLengthOver';
    header("Location: ../f_login.php");
    exit;
  }

  if(preg_match('/[^a-zA-Z0-9]+/u', $password) ||preg_match('/[^a-zA-Z0-9]+/u', $userName)){
    $_SESSION['error_meg'] = 'illegalChar';
    header("Location: ../f_login.php");
    exit;
  }

  $result = UserManager::UserLogin($userName,$password); 
  
  if(isset($result["NAME"]) && isset($result["PASSWORD"])){    
    $_SESSION["username"] = $result["NAME"];
    header("Location: ../index.php");
    exit;
  }else{
    $_SESSION['error_meg'] = 'diffLoginInfo';
    header("Location: ../f_login.php");
    exit;
  }


  
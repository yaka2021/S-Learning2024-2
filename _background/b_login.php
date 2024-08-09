<?php 
$userName = trim($_POST["user_name"]);
$password = trim($_POST["password"]);

include("userManager.php");
session_start();
$ErrorMsgArr = array();
  if(!isset($userName) || !isset($password)){
    array_push($ErrorMsgArr,'shortageInfo');
  }
    
  if(strlen($userName) < 1 || strlen($userName) > 10){
    array_push($ErrorMsgArr,'charLengthOver');
  }

  if(preg_match('/[^a-zA-Z0-9]+/u', $password) ||preg_match('/[^a-zA-Z0-9]+/u', $userName)){
    array_push($ErrorMsgArr,'illegalChar');
  }

  $_SESSION['error_meg'] = $ErrorMsgArr;

  if(count($ErrorMsgArr) > 0){
    header("Location: ../f_login.php");
    exit;
  }

  $result = UserManager::UserLogin($userName,$password); 
  
  if(isset($result["NAME"]) && isset($result["PASSWORD"])){    
    $_SESSION["username"] = $result["NAME"];
    header("Location: ../index.php");
    exit;
  }else{
    array_push($ErrorMsgArr,'diffLoginInfo');
    $_SESSION['error_meg'] = $ErrorMsgArr;
    header("Location: ../f_login.php");
    exit;
  }


  
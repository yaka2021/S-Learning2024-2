<?php
  $userName = trim($_POST["username"]);
  include("userManager.php");
  
  session_start();
  $ErrorMsgArr = array();

  if(strlen($userName) < 1 || strlen($userName) > 10){
    array_push($ErrorMsgArr,'charLengthOver');
  }

  if(preg_match('/[^a-zA-Z0-9]+/u', $userName)){
    array_push($ErrorMsgArr,'illegalChar');
  }

  if($userName == $_SESSION["username"]){
    array_push($ErrorMsgArr,'unChangeName');
  }
  
  $_SESSION['error_meg'] = $ErrorMsgArr;
  if(count($ErrorMsgArr) > 0){
    header("Location: ../f_user_name.php");
    exit;
  }

  $result = UserManager::UpdateName($userName); 

  if($result != false){
    $_SESSION["username"] = $result["NAME"];
    $_SESSION['nameUpdate'] = 'success';
    header("Location: ../index.php");
    exit;
  }else{
    array_push($ErrorMsgArr,'dupUserName');
    $_SESSION['error_meg'] = $ErrorMsgArr;
    header("Location: ../f_user_name.php");
    exit;
  }
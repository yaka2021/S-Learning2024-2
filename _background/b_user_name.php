<?php
  $userName = trim($_POST["username"]);
  include("userManager.php");
  
  session_start();

  if(strlen($userName) < 1 || strlen($userName) > 10){
    $_SESSION['error_meg'] = 'charLengthOver';
    header("Location: ../f_user_name.php");
    exit;
  }

  if(preg_match('/[^a-zA-Z0-9]+/u', $userName)){
    $_SESSION['error_meg'] = 'illegalChar';
    header("Location: ../f_user_name.php");
    exit;
  }

  $result = UserManager::UpdateName($userName); 

  if($result != false){
    $_SESSION["username"] = $result["NAME"];
    header("Location: ../index.php");
    exit;
  }else{
    $_SESSION['error_meg'] = 'dupUserName';
    header("Location: ../f_user_name.php");
    exit;
  }
<?php

  include("userManager.php");

  $userName = trim($_POST["user_name"]);
  $password = trim($_POST["password"]);
  $passConf = trim($_POST["pass_conf"]);

  session_start();

  if($password != $passConf){
    $_SESSION['error_meg'] = 'notMatchPass';
    header("Location: ../f_create_user.php");
    exit;
  }

  if(preg_match('/[^a-zA-Z0-9]+/u', $userName) || preg_match('/[^a-zA-Z0-9]+/u', $password)){
    $_SESSION['error_meg'] = 'illegalChar';
    header("Location: ../f_create_user.php");
    exit;
  }

  if(strlen($userName) < 1 || strlen($userName) > 10){
    $_SESSION['error_meg'] = 'charLengthOver';
    header("Location: ../f_create_user.php");
    exit;
  }
    $result = UserManager::CreateUser($userName,$password);  
  

    if(isset($result["NAME"])){
      $_SESSION['userRegist'] = 'success';
      header("Location: ../f_login.php");
      exit;
    }else{
      $_SESSION['error_meg'] = 'dupUserName';
      header("Location: ../f_create_user.php");
      exit;
    }
  

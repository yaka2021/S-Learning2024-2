<?php

  include("userManager.php");

  $userName = trim($_POST["username"]);
  $password = trim($_POST["password"]);
  $passConf = trim($_POST["PassConf"]);

  if($password != $passConf){
    header("Location: ../f_create_user.php");
    exit;
  }

  // || strlen($password) < 11

  if(!preg_match('/[a-zA-Z0-9]+/u', $password)){
    header("Location: ../f_create_user.php");
    exit;
  }

  if(strlen($userName) > 0 && strlen($password) > 0){
    $result = UserManager::CreateUser($userName,$password);  
    if(isset($result["NAME"])){
      session_start();
      $_SESSION["username"] = $result["NAME"];
      header("Location: ../index.php");
      exit;
    }else{
      header("Location: ../f_create_user.php");
      exit;
    }
  }
  header("Location: ../f_create_user.php");
  exit;
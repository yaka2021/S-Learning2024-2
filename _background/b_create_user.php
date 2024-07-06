<?php

  $userName = trim($_POST["username"]);
  $password = trim($_POST["password"]);
  $passConf = trim($_POST["PassConf"]);

  if($password != $passConf){
    header("Location: ../f_create_user.php");
    exit;
  }

  include("./sqlManager.php");
  
  if(strlen($userName) > 0 && strlen($password) > 0 ){
    $db = SqlManager::getManager();
    $result = $db->CreateUser($userName,$password);  
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
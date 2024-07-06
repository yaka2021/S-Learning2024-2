<?php

$userName = trim($_POST["username"]);

include("./sqlManager.php");

if(strlen($userName) > 0){
  $db = SqlManager::getManager();
  $result = $db->UpdateName($userName); 

  var_dump($result);

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
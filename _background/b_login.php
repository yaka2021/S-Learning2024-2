<?php 

$userName = trim($_POST["username"]);
$password = trim($_POST["password"]);

include("./sqlManager.php");

if(isset($userName) && isset($password)){
  $db = SqlManager::getManager();
  $result = $db->UserLogin($userName,$password);  
  
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
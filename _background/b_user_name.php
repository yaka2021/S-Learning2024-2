<?php
  $userName = trim($_POST["username"]);
  include("userManager.php");

  session_start();
  $ErrorMsgArr = array();

  //文字数制限
  if(strlen($userName) < 1 || strlen($userName) > 10){
    array_push($ErrorMsgArr,'charLengthOver');
  }

  //指定された文字以外を使用しているか
  if(preg_match('/[^a-zA-Z0-9]+/u', $userName)){
    array_push($ErrorMsgArr,'illegalChar');
  }

  //入力した名前が現在のユーザ名か
  if($userName == $_SESSION["username"]){
    array_push($ErrorMsgArr,'unChangeName');
  }
  
  $_SESSION['error_meg'] = $ErrorMsgArr;

  //出力するエラーメッセージはあるか
  if(count($ErrorMsgArr) > 0){
    header("Location: ../f_user_name.php");
    exit;
  }

  $result = UserManager::UpdateName($userName); 

  //正常にユーザー名が変更できているか
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
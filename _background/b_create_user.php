<?php

  include("userManager.php");

  $userName = trim($_POST["user_name"]);
  $password = trim($_POST["password"]);
  $passConf = trim($_POST["pass_conf"]);

  session_start();
  $ErrorMsgArr = array();

  //パスワード不一致か
  if($password != $passConf){
    array_push($ErrorMsgArr,'notMatchPass');
  }

  //指定された文字以外を使用しているか
  if(preg_match('/[^a-zA-Z0-9]+/u', $userName) || preg_match('/[^a-zA-Z0-9]+/u', $password)){
    array_push($ErrorMsgArr,'illegalChar');
  }

  //文字数制限
  if(strlen($userName) < 1 || strlen($userName) > 10){
    array_push($ErrorMsgArr,'charLengthOver');
  }

  $_SESSION['error_meg'] = $ErrorMsgArr;

  //出力するエラーメッセージはあるか
  if(count($ErrorMsgArr) > 0){
    header("Location: ../f_create_user.php");
    exit;
  }

  //ユーザー作成
  $result = UserManager::CreateUser($userName,$password);  

  //正常にユーザーが作成できたか
  if(isset($result["NAME"])){
    $_SESSION['userRegist'] = 'success';
    header("Location: ../f_login.php");
    exit;
  }else{
    array_push($ErrorMsgArr,'dupUserName');
    $_SESSION['error_meg'] = $ErrorMsgArr;
    header("Location: ../f_create_user.php");
    exit;
  }


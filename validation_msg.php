<?php
include("_src/modal.php");

if (session_status() == PHP_SESSION_NONE) {
  session_start();
}

if(isset($_SESSION['userRegist'])){
    DisplayModal("ユーザー登録が完了しました");
    unset($_SESSION['userRegist']);
}

if(isset($_SESSION['nameUpdate'])){
  DisplayModal("ユーザー名の更新が完了しました");
  unset($_SESSION['nameUpdate']);
}

if(!empty($_SESSION['error_meg'])){
  $TotalErrorMsg = "";
  foreach($_SESSION['error_meg'] as $error_msg){
    switch($error_msg){
      case "illegalChar":
          $TotalErrorMsg .= "<br>不正な文字列が含まれています";
        break;
      case 'dupUserName':
        $TotalErrorMsg .= "<br>そのユーザー名は既に使用されています";
        break;
      case 'notMatchPass':
        $TotalErrorMsg .= "<br>パスワードとパスワード確認欄の入力内容が一致していません";
        break;
      case "charLengthOver":
        $TotalErrorMsg .= "<br>ユーザ名は1文字以上10文字以下で設定してください";
        break;
      case "shortageInfo":
        $TotalErrorMsg .= "<br>ログイン情報が不足しています";
        break;
      case "diffLoginInfo":
        $TotalErrorMsg .= "<br>ユーザー名かパスワードが間違っています";
        break;
      case "unChangeName":
        $TotalErrorMsg .= "<br>ユーザー名が変更されていません";
        break;
    }
  }
  
  DisplayModal($TotalErrorMsg);
  $_SESSION['error_meg'] = '';
}
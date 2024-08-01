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

if(isset($_SESSION['error_meg'])){
    switch($_SESSION['error_meg']){
      case "illegalChar":
        DisplayModal("不正な文字列が含まれています");
        break;
      case 'dupUserName':
        DisplayModal("そのユーザー名は既に使用されています");
        break;
      case 'notMatchPass':
        DisplayModal("パスワードとパスワード確認欄の入力内容が一致していません");
        break;
      case "charLengthOver":
        DisplayModal("ユーザ名は1文字以上10文字以下で設定してください");
        break;
      case "shortageInfo":
        DisplayModal("ログイン情報が不足しています");
        break;
      case "diffLoginInfo":
        DisplayModal("ユーザー名かパスワードが間違っています");
        break;
      case "unChangeName":
        DisplayModal("ユーザー名が変更されていません");
        break;
    }

    $_SESSION['error_meg'] = '';
}
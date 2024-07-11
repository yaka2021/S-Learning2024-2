<?php
function AlertMessage($message){
  echo "<script>window.addEventListener('load', function() {
    alert('$message');});</script>";
}

if (session_status() == PHP_SESSION_NONE) {
  session_start();
}

if(isset($_SESSION['userRegist'])){
    AlertMessage("ユーザー登録が完了しました");
    unset($_SESSION['userRegist']);
}

if(isset($_SESSION['nameUpdate'])){
  AlertMessage("ユーザー名の更新が完了しました");
  unset($_SESSION['nameUpdate']);
}

if(isset($_SESSION['error_meg'])){
    switch($_SESSION['error_meg']){
      case "illegalChar":
        AlertMessage("不正な文字列が含まれています");
        break;
      case 'dupUserName':
        AlertMessage("そのユーザー名は既に使用されています");
        break;
      case 'notMatchPass':
        AlertMessage("パスワードとパスワード確認欄の入力内容が一致していません");
        break;
      case "charLengthOver":
        AlertMessage("ユーザ名は1文字以上10文字以下で設定してください");
        break;
      case "shortageInfo":
        AlertMessage("ログイン情報が不足しています");
        break;
      case "diffLoginInfo":
        AlertMessage("ユーザー名かパスワードが間違っています");
        break;
    }

    $_SESSION['error_meg'] = '';
}
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

  $StartTag = "<br>";
  $EndTag = "";
  if(count($_SESSION['error_meg']) > 1){
    $TotalErrorMsg = "<ul>";
    $StartTag = "<li>";
    $EndTag = "</li>";
  }else{
    $StartTag = "<p class='TextCenter'>";
    $EndTag = "</p>";
  }

  foreach($_SESSION['error_meg'] as $error_msg){
    switch($error_msg){
      case "illegalChar":
          $TotalErrorMsg .= $StartTag."不正な文字列が含まれています".$EndTag;
        break;
      case 'dupUserName':
        $TotalErrorMsg .= $StartTag."そのユーザー名は既に使用されています".$EndTag;
        break;
      case 'notMatchPass':
        $TotalErrorMsg .= $StartTag."パスワードとパスワード確認欄の入力内容が一致していません".$EndTag;
        break;
      case "charLengthOver":
        $TotalErrorMsg .= $StartTag."ユーザ名は1文字以上10文字以下で設定してください".$EndTag;
        break;
      case "shortageInfo":
        $TotalErrorMsg .= $StartTag."ログイン情報が不足しています".$EndTag;
        break;
      case "diffLoginInfo":
        $TotalErrorMsg .= $StartTag."ユーザー名かパスワードが間違っています".$EndTag;
        break;
      case "unChangeName":
        $TotalErrorMsg .= $StartTag."ユーザー名が変更されていません".$EndTag;
        break;
    }
  }

  if(count($_SESSION['error_meg']) > 1){
    $TotalErrorMsg .= "</ul>";
  }
  
  DisplayModal($TotalErrorMsg);
  $_SESSION['error_meg'] = '';
}
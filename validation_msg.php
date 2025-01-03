<?php
include("_src/modal.php");

//セッションは有効になっているか
if (session_status() == PHP_SESSION_NONE) {
    session_cache_limiter('nocache');
    session_start();
}

//正常にユーザー登録が出来たか
if(isset($_SESSION['userRegist'])){
    DisplayModal("<p class='TextCenter'>ユーザー登録が完了しました</p>");
    unset($_SESSION['userRegist']);
}

//正常にユーザー名更新が出来たか
if(isset($_SESSION['nameUpdate'])){
    DisplayModal("<p class='TextCenter'>ユーザー名の更新が完了しました</p>");
    unset($_SESSION['nameUpdate']);
}

//表示するエラーメッセージはないか
if(!empty($_SESSION['error_meg'])){
  $TotalErrorMsg = "";

  $StartTag = "<br>";
  $EndTag = "";
  //表示するエラーメッセージ数は1より大きいか
  if(count($_SESSION['error_meg']) > 1){
    $TotalErrorMsg = "<ul>";
    $StartTag = "<li>";
    $EndTag = "</li>";
  }else{
    $StartTag = "<p class='TextCenter'>";
    $EndTag = "</p>";
  }

  //エラーメッセージ用のHTML要素を作成
  foreach($_SESSION['error_meg'] as $error_msg){
    switch($error_msg){
      case "illegalChar":
          $TotalErrorMsg .= $StartTag."使用できない文字が含まれています".$EndTag;
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

  //表示するエラーメッセージ数は1より大きいか
  if(count($_SESSION['error_meg']) > 1){
    $TotalErrorMsg .= "</ul>";
  }
  
  //エラーメッセージ表示
  DisplayModal($TotalErrorMsg);
  $_SESSION['error_meg'] = '';

}
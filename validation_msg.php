<?php
function AlertMessage($message){
  echo '<link  rel="stylesheet" type="text/css" href="_css/modal.css">
<div class="layer js-modal">
    <div class="modal">
      <div class="modal__inner">
        <div class="modal__button-wrap">
          <button class="close-button js-close-button">
            <span></span>
            <span></span>
          </button>
        </div>
        <div class="modal__contents">
          <div class="modal__content">
            '.$message.'
          </div>
        </div>
      </div>
    </div>
  </div>
  <script>
      const modal = document.querySelector(".js-modal");
  const modalButton = document.querySelector(".js-modal-button");
  const modalClose = document.querySelector(".js-close-button");
    modal.classList.add("is-open");

  modalClose.addEventListener("click", () => {
    modal.classList.remove("is-open");
  });
</script>';
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
      case "unChangeName":
        AlertMessage("ユーザー名が変更されていません");
        break;
    }

    $_SESSION['error_meg'] = '';
}
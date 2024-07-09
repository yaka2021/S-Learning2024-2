<html>
<?php
  include("./_src/_head.php");
  include("./_src/_header.php");
?>

<head>
  <link  rel="stylesheet" type="text/css" href="_css/user_name.css">
</head>
  <body>
            <div class="userName_mainScreen">                
              <div class="SingUp_main-div"><span>修正したい項目を変更してください</span></div>
                <form action="_background/b_user_name.php" method="post">
                  <div class="SingUp_main-div_1-3">
                      <label class="SignUp-main-div-label">　ユーザー名　</label>
                      <input class="main-div-input" type="text" name="username" required 
                      value=<?php 
                      //userManagerクラス宣言済み
                      echo userManager::GetUserName();
                       ?> />
                  </div>
                  <div class="BtnArea">
                      <input type="submit" class="SigUp-main-div-div_Btn" value="確認" />
                      <a href="index.php" class="SigUp-main-div-div_Atag"><span>戻る</span></a>
                  </div> 
                </form>
            </div>
</body>

<?php
  include("./_src/_footer.php");
  //session_start()は_footer.phpで実行済み

  //未ログインであればf_login.phpに遷移する
  if(!isset($_SESSION['username'])){
    header("Location: f_login.php");
    exit;
  }
  if(isset($_SESSION['error_meg'])){
    if($_SESSION['error_meg'] == 'dupUserName'){
      echo "<script>window.addEventListener('load', function() {
          alert('そのユーザー名は既に使用されています');});</script>";
      $_SESSION['error_meg'] = '';
    }

    if($_SESSION['error_meg'] == 'charLengthOver'){
      echo "<script>window.addEventListener('load', function() {
          alert('ユーザ名は1文字以上10文字以下で設定してください');});</script>";
          $_SESSION['error_meg'] = '';
    }

  if($_SESSION['error_meg'] == 'illegalChar'){
      echo "<script>window.addEventListener('load', function() {
      alert('不正な文字列が含まれています');});</script>";
      $_SESSION['error_meg'] = '';
  }
}
?>
</html>
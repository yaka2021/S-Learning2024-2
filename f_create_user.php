<html>
<head>
    <link  rel="stylesheet" type="text/css" href="_css/create_user.css">
</head>
<body>
    <main>
            <div class="main-div_mainScreen">                
              <div class="SingUp_main-div"><span>アカウント作成</span></div>
                <form action="_background/b_create_user.php" method="post">
                  <div class="SingUp_main-div_1-3">
                      <label class="SignUp-main-div-label">　ユーザー名　</label>
                      <input class="main-div-input" type="text" name="username" 
                      placeholder="1～10文字で設定してください" maxlength="10" minlength="1"/>
                  </div>
                  <div class="SingUp_main-div_1-3">
                      <label class="SignUp-main-div-label">新規パスワード</label>
                      <input class="main-div-input" type="password" name="password"　/>
                  </div>
                  <div class="SingUp_main-div_1-3">
                      <label class="SignUp-main-div-label">パスワード確認</label>
                      <input class="main-div-input" type="password" name="PassConf" 
                      placeholder="パスワードは後から変更することができません！ご注意ください" maxlength="10" minlength="1" />
                  </div>
                  <div class="main-div_SigUpBtn">
                      <input type="submit" class="SigUp-main-div-div_Btn" value="確認" />
                  </div> 
                </form>
            </div>
        </main>
</body>
</html>

<?php
session_start();

//ログイン済みであればindex.phpに遷移する
if(isset($_SESSION['username'])){
    header("Location: index.php");
    exit;
}

if(isset($_SESSION['error_meg'])){
    if($_SESSION['error_meg'] == 'dupUserName'){
        echo "<script>window.addEventListener('load', function() {
            alert('そのユーザー名は既に使用されています');});</script>";
        $_SESSION['error_meg'] = '';
    }

    if($_SESSION['error_meg'] == 'notMatchPass'){
        echo "<script>window.addEventListener('load', function() {
            alert('パスワードとパスワード確認欄の入力内容が一致していません');});</script>";
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
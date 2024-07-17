<!DOCTYPE HTML>
<html lang="ja">
    <head>
        <link  rel="stylesheet" type="text/css" href="_css/login.css">
    </head>
    <body>
        <main>            
            <div class="SignIn_main-div">
            <img src="_topImg/favicon.ico" alt="icon" width="50" height="50">
                <span>S-Learning 2024</span>
            </div>
            <form action="_background/b_login.php" method="post">
                <div class="SignIn_main-div_1-3">
                    <label class="SignIn-main-div-label">ユーザー名</label>
                    <input class="main-div-input" type="text"  name="username" minlength="1" maxlength="10" required/>
                </div>
                <div class="SignIn_main-div_1-3">
                    <label class="SignIn-main-div-label">パスワード</label>
                    <input class="main-div-input" type="password" name="password" required/>
                </div>
                <div class="main-div_1-4">
                    <input type="submit" class="main-div-div_1-1" value="ログイン" />
                    <a class="Btn_Atag" href="f_create_user.php">  
                        <div class="main-div-div_1-2">アカウント作成はこちら</div>
                    </a>
                </div> 
            </form>
        </main>
    </body>
</html>

<?php
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }
    include("validation_msg.php");

    //ログイン済みであればindex.phpに遷移する
    if(isset($_SESSION['username'])){
        header("Location: index.php");
        exit;
    }
    
?>
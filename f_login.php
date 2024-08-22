<!DOCTYPE HTML>
<html lang="ja">
    <head>
        <title>ログインページ | S-Learning 2024</title>
        <link  rel="stylesheet" type="text/css" href="_css/login.css">
    </head>
    <body>
        <main>            
            <div class="login_page-title">
                <img src="_topImg/favicon.ico" alt="icon" width="50" height="50"><span class="login_span">S-Learning 2024</span>
            </div>
            <form action="_background/b_login.php" method="post">
                <div class="login_form-items">
                    <label for="user_name" class="login_labels">ユーザー名</label>
                    <input type="text" id="user_name" name="user_name" maxlength="10" class="login_inputs" required/>
                </div>
                <div class="login_form-items">
                    <label for="password" class="login_labels">パスワード</label>
                    <input type="password" id="password" name="password" class="login_inputs" required/>
                </div>
                <div class="login_button-group">
                    <input type="submit" class="login_submit" value="ログイン" />
                    <a class="login_create-user" href="f_create_user.php">  
                        <div class="login_link_bottom">アカウント作成はこちら</div>
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
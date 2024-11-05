<!DOCTYPE HTML>
<html lang="ja">
    <head>
        <title>アカウント作成ページ | S-Learning 2024</title>
        <link  rel="stylesheet" type="text/css" href="_css/create_user.css">
    </head>
    <body>
        <main>              
            <div class="SingUp_main-div"><span>アカウント作成</span></div>
                <form action="_background/b_create_user.php" method="post">
                    <div class="SingUp_main-div_1-3">
                        <label for="user_name" class="SignUp-main-div-label">　ユーザー名　</label>
                        <input type="text" id="user_name" name="user_name"   
                        placeholder="1～10文字の半角英数字で設定してください" maxlength="10" class="main-div-input" required/>
                    </div>
                    <div class="SingUp_main-div_1-3">
                        <label for="password" class="SignUp-main-div-label">新規パスワード</label>
                        <input type="password" id="password" name="password"
                        placeholder="半角英数字のみ使用できます" class="main-div-input" required/>
                    </div>
                    <div class="SingUp_main-div_1-3">
                        <label for="pass_conf" class="SignUp-main-div-label">パスワード確認</label>
                        <input type="password" id="pass_conf" name="pass_conf" placeholder= "パスワードは後から変更することができません！　ご注意ください"class="main-div-input" required/>
                    </div>
                    <div class="main-div_SigUpBtn">
                        <input type="submit" class="SigUp-main-div-div-Btn_1-1" value="作成" />
                        <a class="Btn_Atag" href="f_login.php">  
                            <div class="SigUp-main-div-div-Btn_1-2">ログイン画面に戻る</div>
                        </a>
                    </div> 
                </form>
            </div>
        </main>
    </body>
</html>

<?php
session_start();

include("validation_msg.php");
//ログイン済みであればindex.phpに遷移する
if(isset($_SESSION['username'])){
    header("Location: index.php");
    exit;
}
?>
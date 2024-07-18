<!DOCTYPE HTML>
<html lang="ja">
    <head>
        <link  rel="stylesheet" type="text/css" href="_css/create_user.css">
    </head>
    <body>
        <main>              
            <div class="SingUp_main-div"><span>アカウント作成</span></div>
                <form action="_background/b_create_user.php" method="post">
                    <div class="SingUp_main-div_1-3">
                        <label class="SignUp-main-div-label">　ユーザー名　</label>
                        <input class="main-div-input" type="text" name="username" 
                        placeholder="1～10文字で設定してください" maxlength="10" required/>
                    </div>
                    <div class="SingUp_main-div_1-3">
                        <label class="SignUp-main-div-label">新規パスワード</label>
                        <input class="main-div-input" type="password" name="password" placeholder="パスワードは後から変更することができません！ご注意ください" required/>
                    </div>
                    <div class="SingUp_main-div_1-3">
                        <label class="SignUp-main-div-label">パスワード確認</label>
                        <input class="main-div-input" type="password" name="PassConf" required/>
                    </div>
                    <div class="main-div_SigUpBtn">
                        <input type="submit" class="SigUp-main-div-div-Btn_1-1" value="確認" />
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
<!DOCTYPE HTML>
<html lang="ja">
    <head>
        <title>アカウント作成ページ | S-Learning 2024</title>
        <link  rel="stylesheet" type="text/css" href="_css/create_user.css">
    </head>
    <body>
        <main>              
            <div class="create-user_page-title"><span class="create-user_span">アカウント作成</span></div>
                <form action="_background/b_create_user.php" method="post">
                    <div class="create-user_form-items">
                        <label for="user_name" class="create-user_labels">　ユーザー名　</label>
                        <input type="text" id="user_name" name="user_name"   
                        placeholder="1～10文字で設定してください" maxlength="10" class="create-user_inputs" required/>
                    </div>
                    <div class="create-user_form-items">
                        <label for="password" class="create-user_labels">新規パスワード</label>
                        <input type="password" id="password" name="password"
                        placeholder="パスワードは後から変更することができません！ご注意ください" class="create-user_inputs" required/>
                    </div>
                    <div class="create-user_form-items">
                        <label for="pass_conf" class="create-user_labels">パスワード確認</label>
                        <input type="password" id="pass_conf" name="pass_conf" class="create-user_inputs" required/>
                    </div>
                    <div class="create-user_button-group">
                        <input type="submit" class="create-user_submit" value="作成" />
                        <a class="create-user_return" href="f_login.php">  
                            <div class="create-user_link_bottom">ログイン画面に戻る</div>
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
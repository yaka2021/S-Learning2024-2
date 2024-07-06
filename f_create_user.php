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
                      <input class="main-div-input" type="text" name="username" />
                  </div>
                  <div class="SingUp_main-div_1-3">
                      <label class="SignUp-main-div-label">新規パスワード</label>
                      <input class="main-div-input" type="password" name="password" placeholder="1～10文字で設定してください"/>
                  </div>
                  <div class="SingUp_main-div_1-3">
                      <label class="SignUp-main-div-label">パスワード確認</label>
                      <input class="main-div-input" type="password" name="PassConf" placeholder="パスワードは後から変更することができません！ご注意ください"/>
                  </div>
                  <div class="main-div_SigUpBtn">
                      <input type="submit" class="SigUp-main-div-div_Btn" value="確認" />
                  </div> 
                </form>
            </div>
        </main>
</body>
</html>
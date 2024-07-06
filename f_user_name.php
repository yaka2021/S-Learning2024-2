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
                <form action="" method="post">
                  <div class="SingUp_main-div_1-3">
                      <label class="SignUp-main-div-label">　ユーザー名　</label>
                      <input class="main-div-input" type="text" name="username" />
                  </div>
                  <div class="BtnArea">
                      <input type="submit" class="SigUp-main-div-div_Btn" value="確認" />
                      <a href="" class="SigUp-main-div-div_Atag"><span>戻る</span></a>

                  </div> 
                </form>
            </div>
</body>

<?php
  include("./_src/_footer.php");
?>
</html>
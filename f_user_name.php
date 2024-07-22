<?php
  include("./_src/_head.php");
  include("./_src/_header.php");
?>
<title>ユーザー名変更ページ | S-Learning 2024</title>
<style>
	header .user_name{
		display: none;
	}

  header ul li:first-child{
		position: relative;
		top:3px;
	}
</style>
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
          <input type="submit" class="SigUp-main-div-div_Btn" name="submit" value="確認" />
          <a href="index.php" class="SigUp-main-div-div_Atag"><span>戻る</span></a>
        </div> 
      </form>
    </div>
</body>

<?php
  include("./_src/_footer.php");
  $path = pathinfo($_SERVER['REQUEST_URI']);
	footerArea($path["filename"]);
  //session_start()は_footer.phpで実行済み

  include("validation_msg.php");

  //未ログインであればf_login.phpに遷移する
  if(!isset($_SESSION['username'])){
    header("Location: f_login.php");
    exit;
  }

?>
</html>
<?php
  include("./_src/_head.php");
?>
<title>ユーザー名変更ページ | S-Learning 2024</title>
<style>
    main{
    background: none;
    background-image: url(./_topImg/cyberBack.png);
    animation: popLoop 5s infinite linear;
  }

  .header_btn_bottom-left{
		display: none;
	}

  .header_user-info_bottom:first-child{
		position: relative;
		top:3px;
	}

  .b{
                height:50px;
   }
  @keyframes popLoop {
  0% {
    background-position-x: 96px
  }

  100% {
    background-position-x: 0
  }
}
</style>
</head>

<body>
  <?php include("./_src/_header.php"); ?>
  <main>
  <div class="userName_mainScreen">                
    <div class="SingUp_main-div"><span>ユーザー名変更</span></div>
      <form class="a1" action="_background/b_user_name.php" method="post">
        <div class="SingUp_main-div_1-3">
          <label class="SignUp-main-div-label">　現在のユーザー名　</label>
          <input class="main-div-input" type="text" name="username" maxlength="10"  required 
          value=<?php 
          //userManagerクラス宣言済み
          echo userManager::GetUserName();
          ?> />
	  <div class="BtnArea">
          <input type="submit" class="SigUp-main-div-div_Btn" name="submit" value="変更" />
        </div> 
	<div class="b"></div>
        </div>
      </form>
    </div>
  </main>
  <?php include("./_src/_footer.php"); ?>
</body>
</html>

<?php
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
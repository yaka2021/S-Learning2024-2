<?php
  include("./_src/_head.php");
?>
<title>ユーザー名変更ページ | S-Learning 2024</title>
<style>
  body {
    animation: popLoop 5s infinite linear;
    background-image: url(./_topImg/cyberBack.png);
  }

  main{
    background: none;
  }

  .header_btn_bottom-left{
		display: none;
	}

  .header_user-info_bottom:first-child{
		position: relative;
		top:3px;
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
  <main class="user-name_main">                
    <div class="user-name_page-title"><span class="user-name_span">ユーザー名変更</span></div>
      <form action="_background/b_user_name.php" method="post">
        <div>
          <label class="user-name_labels">　現在のユーザー名　</label>
          <input class="user-name_inputs" type="text" name="username" required 
          value=<?php 
          //userManagerクラス宣言済み
          echo userManager::GetUserName();
          ?> />
        </div>
        <div class="login_button">
          <input type="submit" class="login_submit" name="submit" value="変更" />
        </div> 
      </form>
    <?php include("./_src/_footer.php"); ?>
  </main>
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
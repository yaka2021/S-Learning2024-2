<header>
	<div class="wrapper">
		<h1>
			<a href="./">
				<img src="_topImg/favicon.ico" alt="icon" width="48" height="48">S-Learning 2022
			</a>
		</h1>
		<nav>
			<ul>
				<li class="cookie_warning">
					<?php 
						include("_background/userManager.php");
						echo UserManager::GetUserName();
					 "さん"; ?>
					<a href="./f_user_name.php"><input type="button" value="名前変更"></a>
				</li>
				<li class="header_timestamp">
					初めての訪問: <?php  
					echo UserManager::GetTimestamp();
					 ?>
				</li>
				<li><button><a href="_background/logout.php">ログアウト</a></button></li>
			</ul>
		</nav>
		<div style="clear:left"></div>
	</div>
</header>
<script>
	window.addEventListener('load', function(){
		if (document.cookie.length == 0){
			const warning = document.getElementsByClassName("cookie_warning");
			warning[0].innerText = "(Cookieを有効にしてください)";
		}
	});
</script>

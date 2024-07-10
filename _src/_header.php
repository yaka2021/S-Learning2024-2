<header>
	<div class="wrapper">
		<h1>
			<a href="./">
				<img src="_topImg/favicon.ico" alt="icon" width="50" height="50">S-Learning 2024
			</a>
		</h1>
		<nav>
			<ul>
				<li class="cookie_warning">
					ユーザー名：
					<?php include("_background/userManager.php");
						echo UserManager::GetUserName(); ?>
					<a href="_background/b_user_name.php"><input type="button" value="ユーザー名変更"></a>
				</li>
				<li class="header_timestamp">
					初回ログイン：<?php echo UserManager::GetTimestamp(); ?>
				</li>
			</ul>
			<button><a href="_background/logout.php">ログアウト</a></button>
			<button><a href="obtained_flags.php">手に入れたFLAG</a></button>
		</nav>
	</div>
</header>

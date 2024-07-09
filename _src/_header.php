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
					<a href="#"><input type="button" value="ユーザー名変更"></a>
				</li>
				<li class="header_timestamp">
					初回ログイン: <?php echo UserManager::GetTimestamp(); ?>
				</li>
			</ul>
			<a href="_background/b_logout.php"><button>ログアウト</button></a>
			<a href="#"><button>手に入れたFLAG</button></a>
		</nav>
	</div>
</header>

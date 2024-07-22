<header>
	<div class="wrapper">
		<h1>
			<a href="./">
				<img src="_topImg/favicon.ico" alt="icon" width="50" height="50">S-Learning 2024
			</a>
		</h1>
		<nav>
			<ul>
				<li>
					ユーザー名：
					<?php include("_background/userManager.php");
						echo UserManager::GetUserName(); ?>
					<a href="f_user_name.php" class="user_name">ユーザー名変更</a>
				</li>
				<li class="header_timestamp">
					初回ログイン：<?php echo UserManager::GetTimestamp(); ?>
				</li>
			</ul>
			<a id="logout" class="header_button">ログアウト</a>
			<a href="obtained_flags.php" class="header_button">手に入れたFLAG</a>
		</nav>
	</div>
</header>

<script>
	var a = document.getElementById('logout');
			
	a.addEventListener('click', (event) => {
		let result = window.confirm('本当にログアウトしますか？');
		if(result){
			alert("ログアウトしました。");
			location.href = "_background/b_logout.php";
		}
		else{	
			event.preventDefault();
		}
	})
</script>

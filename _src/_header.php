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
<div id="ComfirmModal" style="display: none;">
	<?php 
		include("_src/confirm_modal.php"); 
		DisplayLogoutCofirmModal(); 
	?>
</div>
<script>
	let logoutBtn = document.getElementById('logout');	
	logoutBtn.addEventListener('click', (event) => {
		let ComfirmModal = document.getElementById('ComfirmModal');	
		ComfirmModal.style.display = "block";
	})
</script>

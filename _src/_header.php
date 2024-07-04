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
					<?php echo (string) $db->getPlayerName() . "さん"; ?>
					<a href="./rename.php"><input type="button" value="名前変更"></a>
				</li>
				<li class="header_timestamp">
					初めての訪問: <?php echo $db->firstVisitTime; ?>
				</li>
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

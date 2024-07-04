<!DOCTYPE HTML>
<html>
	<head>
		<meta charset="UTF-8">
		<title>対応していないブラウザ | S-Learning 2022</title>
		<style>
			main, footer{
				display: block;
				max-width: 600px;
				margin: 10px auto 0;
			}
			button{ margin: 4px auto; display: block; }
			h1, footer{ text-align: center; }
			.fuwaPop{
				width: 100%;
				color: green;
				border: 3px solid green;
				background-color: white;
				border-radius: 16px;
				padding: 4px 10px;
				margin: 0;
			}
			.fuwaPop p, .fuwaPop ul{ margin: 4px 0;}
		</style>
		<script type="text/javascript">
			if (!String.prototype.includes) {
				String.prototype.includes = function(search, start) {
					if (typeof start !== 'number'){ start = 0; }
					if (start + search.length > this.length) {
					return false;
					} else {
					return this.indexOf(search, start) !== -1;
					}
				};
			}
			function setIgnore(){
				const cookie = "IGNORE_BROWSER=true"
				if (!document.cookie.includes(cookie)){
					document.cookie = cookie;
				}
				location.reload();
			}
		</script>
	</head>
	<body>
		<main>
			<h1>S-Learning 2022</h1>
			<hr>
			<table>
				<tr>
					<td>
						<img src="_topImg/FuwaPop.png" alt="fuwarin" width="96" height="96">
					</td>
					<td class="fuwaPop">
						<p>
						対応していないブラウザの可能性があります！
						<br>PCから下記のブラウザで入り直してください。
						</p>
						<ul>
							<li>Google Chrome</li>
							<li>Firefox</li>
							<li>Microsoft Edge</li>
						</ul>
						<p>(Cookieを有効にしている必要があります)</p>
					</td>
				</tr>
			</table>
			<button onclick="setIgnore()">それでも進む</button>
			<hr>
		</main>
		<?php include("./_src/_footer.php"); ?>
	</body>
</html>

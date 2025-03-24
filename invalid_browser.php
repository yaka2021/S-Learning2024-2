<!DOCTYPE HTML>
<html>
	<head>
		<meta charset="UTF-8">
		<title>非対応のブラウザ、デバイスでアクセスした際に表示されるページです | S-Learning 2024</title>
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
	</head>
	<body>
		<main>
			<h1>S-Learning 2024</h1>
			<hr>
			<table>
				<tr>
					<td>
						<img src="_topImg/FuwaPop.png" alt="fuwarin" width="96" height="96">
					</td>
					<td class="fuwaPop">
						<p>
						非対応のブラウザ、デバイスでアクセスしています！
						</p>
						<p>
						PCから下記のブラウザでアクセスし直してください。
						</p>
						<ul>
							<li>Google Chrome</li>
							<li>Firefox</li>
							<li>Microsoft Edge</li>
						</ul>
					</td>
				</tr>
			</table>
			<hr>
		</main>
		<?php include("./_src/_footer.php") ;
		$path = pathinfo($_SERVER['REQUEST_URI']);
		footerArea($path["filename"]);
		?>
	</body>
</html>

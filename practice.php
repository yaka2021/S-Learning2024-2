<?php include("./_src/_head.php");
$current_key = isset($_GET['app']) ? $_GET['app'] : "";
$json = StageManager::formatJsonIntoHash();
$item = $json[$current_key];
?>
<title><?php echo $item['TITLE']; ?>演習 | S-Learning 2022</title>
</head>
	<body>
		<?php include("./_src/_header.php") ?>
		<main>
			<h2><?php echo (string) $item['ID'] . ". " . $item['TITLE'] . " (" . str_repeat("★", (int) $item['RATE']) . ")"; ?></h2>
			<div class="iframe-wrapper">
				<iframe id="practiceIframe" title="「<?php echo $item['TITLE']; ?>」のCTF演習フレームです。"
				width="1060" height="750" src='<?php echo $current_key; ?>'></iframe>
			</div>
			<h2>他の演習問題</h2>
			<div class="practiceWorks">
			<?php
				foreach ($json as $key => $data) {
					if ($key == $current_key) { continue; }
					StageManager::drawJsonData($key, $data);
				};
			?>
			</div>
			<?php include("./_src/_ranking.php") ?>
		</main>
		<?php include("./_src/_footer.php") ?>
	</body>
</html>

<?php include("./_src/_head.php");

//未ログインであればf_login.phpに遷移する
if(!isset($_SESSION['username'])){
	header("Location: f_login.php");
	exit;
}

$current_key = isset($_GET['app']) ? $_GET['app'] : "";
$json = StageManager::formatJsonIntoHash();
$item = $json[$current_key];
?>

<title><?php echo $item['TITLE']; ?>演習 | S-Learning 2024</title>
<style>
	/* ロード画面　ここから*/
	.loader {
	position: fixed;
	width: 100%;
	height: 100%;
	background-color: var(--back-color);
	z-index: 0;

	display: flex;
	justify-content: center;
	align-items: center;
	}
	.loader .txt {
	position: absolute;
	display: inline-block;
	color: var(--clear-color);
	font-size: 50px;
	text-shadow: 1px 1px var(--text-shadow), -1px 1px var(--text-shadow),
				1px -1px var(--text-shadow), -1px -1px var(--text-shadow);
	}
	/* ロード画面　ここまで*/
</style>
<script>

//ロード画面表示
$(function () {
  function end_loader() {
    $('.loader').fadeOut(800);
  }
  $(window).on('load', function () {
    setTimeout(function () {
    end_loader();
    }, 4000)
  })
})

</script>
</head>
	<body>
		<?php include("./_src/_header.php") ?>
		<div class="loader">
  			<p class="txt">Now Loading.....</p>
		</div>
		<main>
			<h2><?php echo (string) $item['ID'] . ". " . $item['TITLE'] . " (" . "LEVEL" .  (int) $item['RATE'] . ")"; ?></h2>
			<div class="iframe-wrapper">
				<iframe id="practiceIframe" title="「<?php echo $item['TITLE']; ?>」のCTF演習フレームです。"
				width="1060" height="750" src='<?php echo $current_key; ?>'></iframe>
			</div>
		</main>

		<?php include("./_src/_footer.php") ;
		$path = pathinfo($_SERVER['REQUEST_URI']);
		footerArea($path["filename"]);

		$clear_level = StageManager::getClearLevel($_SESSION["username"]);

		//LEVEL1の演習を開放しているか判定する
		if($clear_level < 1 && ($path["filename"] == "practice?app=newSlot" || $path["filename"] == "practice?app=gacha" || $path["filename"] == "practice?app=exifInfo")){
		$_SESSION["NotOpenLevelMsg"] = "not_opened_level1";
		header("location:index.php");
		}

		//LEVEL2の演習を開放しているか判定する
		if($clear_level < 2 && ($path["filename"] == "practice?app=division" || $path["filename"] == "practice?app=random" || $path["filename"] == "practice?app=triste")){
		$_SESSION["NotOpenLevelMsg"] = "not_opened_level2";
		header("location:index.php");
		}

		//LEVEL3の演習を開放しているか判定する
		if($clear_level < 3 && ($path["filename"] == "practice?app=hexagon" || $path["filename"] == "practice?app=sanitize")){
		$_SESSION["NotOpenLevelMsg"] = "not_opened_level3";
		header("location:index.php");
		}

		?>
	</body>
</html>
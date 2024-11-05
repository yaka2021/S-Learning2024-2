<?php include("./_src/_head.php"); ?>
<title>CTF演習一覧ページ（LEVEL1） | S-Learning 2022</title>
<script>
<?php
$clear_level = StageManager::getClearLevel($_SESSION["username"]);

//レベル1を開放しているか判定する
if($clear_level < 1){
	$_SESSION["NotOpenLevelMsg"] = "not_opened_level1";
	header("location:index.php");
}

//未ログインであればf_login.phpに遷移する
  if(!isset($_SESSION['username'])){
    header("Location: f_login.php");
    exit;
  }

$flags = $db->query("SELECT `ID`, `NAME`, `SCORE` FROM :STS;");
$stages = array();
$length = count($flags);
for ($i = 1; $i <= $length; $i++){
	array_push($stages, "STAGE" . (string) $i);
}
$player_got = $db->query(
	"SELECT :STAGES FROM :PLT WHERE ID = :ID",
	array(":STAGES" => implode(", ", $stages))
)[0];

$allClear = count(array_filter($player_got)) == $length;
?>
</script>
		<script src="./_src/index.js" type="text/javascript"></script>
	</head>
	<body>
		<?php include("./_src/_header.php") ?>
		<main>
			<h2>CTF演習(LEVEL1)</h2>
			<div class="practiceWorks">
			<?php
				foreach (StageManager::formatJsonIntoHash() as $key => $data) {
					StageManager::drawJsonData($key, $data);
				};
			?>
			</div>
		</main>
		<?php 
		include("./_src/_footer.php");
		$path = pathinfo($_SERVER['REQUEST_URI']);
		footerArea($path["filename"]);
		?>
	</body>
</html>

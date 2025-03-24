<?php include("./_src/_head.php"); ?>
<title>トップページ | S-Learning 2024</title>
<script>

<?php
//未ログインであればindex.phpに遷移する

session_start();

if(empty($_SESSION['username'])){
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

?>

//ふわりんのお喋りの内容
const $popQue = [
`今日は私のサイトに来てくれてどうもありがとう！@
サイバーセキュリティマイスターの
ふわりんです！`,
`皆さんにセキュリティの大切さを知ってもらうために
このサイトを設立しました！`,
`このサイトを通じてたくさんの人が
セキュリティに興味を持ってくれたら嬉しいなぁ.....`,
`注意！　@ここで学習した悪いことは他のサイトには
やらないでくださいね！@　ふわりんとの約束だよ！`
];
</script>
<script src="./_src/index.js" type="text/javascript"></script>
</head>
	<body>
		<?php include("./_src/_header.php") ?>
		<main>
			<img src="./_topImg/topPop2.jpg" alt="top" id="topImage">
			<div class="fuwaNamePop">
				<p>サイバーセキュリティマイスター<br><span>ふわりん</span></p>
			</div>
			<p id="fuwaPop" style="border-bottom: none"></p>
			<h2>難易度選択</h2>
			<div class="works">
				<a href="practice?app=tutorial" class="tutorial">チュートリアル</a>
				<div class="practiceWorks">
					<?php 
						$clear_level = StageManager::getClearLevel($_SESSION["username"]);
						if($clear_level > 0){ //解放されている場合
							print "<a href='./level1.php'  class='level1'>L E V E L 1</a>";
						}else{//解放されていない場合
							print "<a href='./level1.php' class='level1' style='opacity: 0.3'>L E V E L 1</a>";
						}

						if($clear_level > 1){//解放されている場合
							print "<a href='./level2.php' class='level2'>L E V E L 2</a>";
						}else{//解放されていない場合
							print "<a href='./level2.php' class='level2' style='opacity: 0.3'>L E V E L 2</a>";
						}

						if($clear_level > 2){//解放されている場合
							print "<a href='./level3.php' class='level3'>L E V E L 3</a>";
						}else{//解放されていない場合
							print "<a href='./level3.php' class='level3' style='opacity: 0.3'>L E V E L 3</a>";
						}
					?>

				</div>
			</div>
		</main>
		<?php include("./_src/_footer.php") ;
		$path = pathinfo($_SERVER['REQUEST_URI']);
		footerArea($path["filename"]);
		?>
	</body>
</html>
<?php
	//ユーザー名変更メッセージ
	if(isset($_SESSION['nameUpdate'])){
		include("./_src/modal.php");
		$_SESSION['nameUpdate'] = null;
		DisplayModal("<p class='TextCenter'>ユーザー名の変更が完了しました</p>");
	}

	//レベル未開放メッセージ
	include("_src/modal.php");
	$message = "";
	if(strlen($_SESSION["NotOpenLevelMsg"]) > 0){
		switch($_SESSION["NotOpenLevelMsg"]){
			case "not_opened_level1":
				$message = "<p class='TextCenter'>LEVEL1の演習はまだ解放されていません。
				<br>チュートリアル演習をクリアすると解放されます。</p>";
				break;
			case "not_opened_level2":
				$message = "<p class='TextCenter'>LEVEL2の演習はまだ解放されていません。
				<br>LEVEL1の演習を1つクリアすると解放されます。</p>";
				break;
			case "not_opened_level3":
				$message = "<p class='TextCenter'>LEVEL3の演習はまだ解放されていません。
				<br>LEVEL2の演習を1つクリアすると解放されます。</p>";
			break;
		}
		DisplayModal($message);
		$_SESSION["NotOpenLevelMsg"] = "";
	}?>
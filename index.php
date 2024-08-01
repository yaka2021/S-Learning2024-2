<?php include("./_src/_head.php"); ?>
<title>トップページ | S-Learning 2024</title>
 <style>
	footer button:nth-child(1){
		display: block !important;
	}

	footer button:nth-child(2){
		display: none;
	}
</style>
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

$allClear = count(array_filter($player_got)) == $length;
?>
const $popQue = [
<?php if ($db->isFirstVisit == true){ ?>
`今日は私のサイトに来てくれてどうもありがとう！@
大人気アイドル兼サイバーセキュリティマイスターの
ふわふわふわりんです！`,
`皆さんにセキュリティの大切さを知ってもらうために
このサイトを設立しました！`,
`このサイトを通じてたくさんの学生さんが
セキュリティに興味を持ってくれたらうれしいです！`,
`注意！　@ここで学習した悪いことは他のサイトには
やらないでくださいね！@　ふわりんとの約束だよ！`,
`それじゃあさっそく演習問題を
下から選んで遊んでみてね！`
<?php }else if($allClear){ ?>
`問題を全部解いてくれてありがとう～！@
楽しめてもらえたならうれしいなぁ`,
`ふわりんの大きな野望……@S-Learningで日本中……いや、
世界中の人たちに楽しみながらセキュリティの大切さを
知ってもらえる日もそう遠くないかも……`,
`そうだ！　問題を全部解いてくれたキミなら
ふわりんとおんなじ野望、共有できてるかも！`,
`もしよかったら、ふわりんがいる情報科学専門学校に
会いにおいでよ！`,
`キミとならまた、新しい問題を作っていけそうだから……`
<?php }else{ ?>
`また会えたね！　@私が作った問題、
楽しんでもらえてる？`,
`もしよかったらページ下のアンケートに
協力してもらえるとはげみになるなぁ……`,
`それじゃあ、引き続き楽しんでいってね！`
<?php } ?>
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
				<a href="#" class="tutorial">チュートリアル</a>

				<div class="practiceWorks">
					<a href="#" class="level1">L E V E L 1</a>
					<a href="#" class="level2">L E V E L 2</a>
					<a href="#" class="level3">L E V E L 3</a>
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
	if(isset($_SESSION['nameUpdate'])){
		include("./_src/modal.php");
		$_SESSION['nameUpdate'] = null;
		DisplayModal("ユーザー名の変更が完了しました");
	}
?>
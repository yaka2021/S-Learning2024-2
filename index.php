<?php include("./_src/_head.php"); ?>
<title>トップページ | S-Learning 2022</title>
<script>
<?php
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
			<img src="./_topImg/topPop<?php
			if ($db->isFirstVisit == true){ echo 2; }else
			if($allClear){ echo 3; }else{ echo 1; }
			?>.jpg" alt="top" id="topImage">
			<div class="fuwaNamePop">
				<p>サイバーセキュリティマイスター<br><span>ふわりん</span></p>
			</div>
			<p id="fuwaPop" style="border-bottom: none"></p>
			<div id="fuwaPopSpeech">
				<input type="button" value="喋ってもらう">
			</div>
			<h2>CTF演習</h2>
			<div class="practiceWorks">
			<?php
				foreach (StageManager::formatJsonIntoHash() as $key => $data) {
					StageManager::drawJsonData($key, $data);
				};
			?>
			</div>
			<h2>手に入れたFLAG</h2>
			<div class="practiceWorks">
				<table class="obtainedFlags">
				<?php
				$i = 0;
				foreach ($flags as $flag){
					if ((int) $player_got[$stages[$i++]] == 1){
						$name = (string) $flag["NAME"];
						$price = (string) $flag["SCORE"];
					}else{
						$name = str_repeat("?", strlen($flag["NAME"]));
						$price = "?";
					}
					echo ($i % 2 === 0 ? "<tr class='oddTR'>" : "<tr class='evenTR'>");
					echo "<td class='spaceTD'></td><th>No. " . $flag["ID"] .
					"</th><td>FLAG={</td><td style='width: 100%;text-align: center;'>{$name}</td><td>}</td>
					<td style='text-align: right'>{$price}</td>
					<td>pts</td><td class='spaceTD'></td></tr>";
				}
				?>
				</table>
			</div>
			<h2>プレゼン資料</h2>
			<div class="practiceWorks">
				<iframe class="demoSlides" src="./demo.pdf" width="640" height="480">
				</iframe>
				<p style="width: 100%; text-align: center; font-size: larger;">
					<a href="./demo.pdf" target="_blank">別タブで見る</a>
					<br>
				</p>
			</div>
			<?php include("./_src/_ranking.php") ?>
		</main>
		<?php include("./_src/_footer.php") ?>
	</body>
</html>

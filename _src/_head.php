<?php
$ua = getenv('HTTP_USER_AGENT');
if (
	isset($_COOKIE["IGNORE_BROWSER"]) ||
	(!strstr($ua, 'Edge') && strstr($ua, 'Edg')) ||
	strstr($ua, 'Chrome') || strstr($ua, 'Firefox')
){
	include("./_background/stageManager.php");
}else{
	include("./invalid_browser.php");
	exit();
}
?>
<!DOCTYPE HTML>
<html lang="ja">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width,initial-scale=1">
		<meta name="description" content="[学生向けCTF教材]S-Learning公式ホームページです。">
		<meta property="og:title" content="S-Learning" />
		<meta property="og:site_name" content="S-Learning" />
		<meta property="og:description" content="[学生向けCTF教材]S-Learning公式ホームページです。" />
		<meta property="og:type" content="activities website" />
		<meta property="og:url" content="https://secret-learn.ssl-lolipop.jp/2022/" />
		<meta property="og:image" content="/2022/_topImg/android-chrome-192x192.png" />
		<meta name="twitter:card" content="summary" />

		<link rel="icon" href="/2022/_topImg/favicon.ico">
		<link  href="./_css/topStyle.css" rel="stylesheet">
		<link  href="./_css/practiceStyle.css" rel="stylesheet">
		<script src="./_src/barChart.js" type="text/javascript"></script>
		<script> const $player_id = <?php echo $db->player_id; ?>; </script>

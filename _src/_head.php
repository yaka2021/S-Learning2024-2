<?php
$ua = $_SERVER['HTTP_USER_AGENT'];

if ((strstr($ua , 'Edge') || strstr($ua , 'Chrome') || strstr($ua , 'Firefox')) 
   && (strpos($ua, 'pc') !== true)) {
    include("./_background/stageManager.php");
}else {
    include("./invalid_browser.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta
      name="description"
      content="[学生向けCTF教材]S-Learning公式ホームページです。"
    />
    <meta property="og:title" content="S-Learning" />
    <meta property="og:site_name" content="S-Learning" />
    <meta
      property="og:description"
      content="[学生向けCTF教材]S-Learning公式ホームページです。"
    />
    <meta property="og:type" content="activities website" />
    <meta
      property="og:url"
      content="https://secret-learn.ssl-lolipop.jp/2024/"
    />
    <meta
      property="og:image"
      content="/2024/_topImg/android-chrome-192x192.png"
    />

    <link href="./_css/topStyle.css" rel="stylesheet" />
    <link href="./_css/practiceStyle.css" rel="stylesheet" />
    <script src="./jquery-3.7.1.min.js" type="text/javascript"></script>
    <script>
      const $player_id = <?php echo $db->player_id; ?>;
    </script>
  </head>
</html>
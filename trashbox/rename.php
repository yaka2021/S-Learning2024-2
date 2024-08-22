<?php include("./_src/_head.php");
$current_key = isset($_GET['app']) ? $_GET['app'] : "";
?>
<title>お名前変更 | S-Learning 2022</title>
<style>
header input[type="button"]{ display: none; }
main{
    margin-top: 0
}
main p{
    text-align: center;
    font-size: large;
}
main input[type="text"]{
    font-size: large;
    display: inline-block;
}
main input[type="submit"]{
    font-size: large;
    display: inline-block;
}
main .inputForm{
    display: block;
    text-align: center;
}
#errorLog{
    color: red;
    font-weight: bold;
}
</style>
<script type="text/javascript">
    const $currentName = "<?php echo $db->getPlayerName(); ?>";
</script>
<script src="./_src/practice.js" type="text/javascript"></script>
</head>
	<body>
		<?php include("./_src/_header.php") ?>
        <img src="./_topImg/topPop1.jpg" alt="top" id="topImage">
		<main>
            <h2>0. 名前変更 (★)</h2>
            <p>注意！　ここで入力した名前は他のプレイヤーにもランキングで公開されます！<br>
            本名や誰かを傷つけるような名前は使わないようにしましょう！</p>
            <div class="inputForm">
                <input id="name" type="text">
                <input id="submit" type="submit" value="変更">
            </div>
            <p>・１～１０文字まで<br>
            <a href="./">トップに戻る</a>
            </p>
            <p id="errorLog"></p>
            <p style="color: #94cf9a;">
            " or ""="と入力してみよう！
            </p>
		</main>
		<?php include("./_src/_footer.php") ?>
	</body>
</html>

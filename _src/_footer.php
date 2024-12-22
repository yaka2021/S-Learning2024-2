<?php
function footerArea($path){
 if($path == "f_user_name" || $path == "obtained_flags" || $path == "practice?app=tutorial" || $path == "level1" || $path == "level2" || $path == "level3"){
		echo '
		<footer>
			<div class="wrapper">
				<a href="index.php" class="footer_btn">トップページに戻る</a>
				<p class="footer_copyright">
					情報科学専門学校<br>
					S-Learningプロジェクトチーム
				</p>
			</div>
		</footer>';
 }else if($path == "practice?app=newSlot" || $path == "practice?app=gacha" || $path == "practice?app=exifInfo"){
		echo '
		<footer>
			<div class="wrapper">
				<a href="level1.php" class="footer_btn">CTF演習選択問題に戻る(LEVEL1)</a>
				<p class="footer_copyright">
					情報科学専門学校<br>
					S-Learningプロジェクトチーム
				</p>
			</div>
		</footer>';

}else if($path == "practice?app=division" || $path == "practice?app=random" || $path == "practice?app=triste"){
		echo '
		<footer>
			<div class="wrapper">
				<a href="level2.php" class="footer_btn">CTF演習選択問題に戻る(LEVEL2)</a>
				<p class="footer_copyright">
					情報科学専門学校<br>
					S-Learningプロジェクトチーム
				</p>
			</div>
		</footer>';
}else if($path == "practice?app=hexagon" || $path == "practice?app=sanitize"){
		echo '
		<footer>
			<div class="wrapper">
				<a href="level3.php" class="footer_btn">CTF演習選択問題に戻る(LEVEL3)</a>
				<p class="footer_copyright">
					情報科学専門学校<br>
					S-Learningプロジェクトチーム
				</p>
			</div>
		</footer>';
}
else{
		echo '
		<footer>
			<div class="wrapper">
				<a target="_blank" href="https://forms.gle/dfQa7v4QzFh53qMr7" class="footer_btn">
					アンケートはこちら
				</a>
				<p class="footer_copyright">
					情報科学専門学校<br>
					S-Learningプロジェクトチーム
				</p>
			</div>
		</footer>';
}
}
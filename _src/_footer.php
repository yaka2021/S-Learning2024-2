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
 }else{
		echo '
		<footer>
			<div class="wrapper">
				<a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSeqeAsNCx2iETBFRKZXJlDKD33Oo-ba7LkZxpHiQzO8TC6hPA/viewform?usp=sf_link" class="footer_btn">
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
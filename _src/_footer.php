<?php
function footerArea($path){
 if($path == "f_user_name" || $path == "obtained_flags"){
		echo '
		<footer>
			<div class="wrapper">
				<a href="index.php">トップページに戻る</a>
				<p>
					情報科学専門学校<br>
					S-Learningプロジェクトチーム
				</p>
			</div>
		</footer>';
 }else if($path == ("index" || "")){
		echo '
		<footer>
			<div class="wrapper">
				<a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSeqeAsNCx2iETBFRKZXJlDKD33Oo-ba7LkZxpHiQzO8TC6hPA/viewform?usp=sf_link">
					アンケートはこちら
				</a>
				<p>
					情報科学専門学校<br>
					S-Learningプロジェクトチーム
				</p>
			</div>
		</footer>';
 }
}
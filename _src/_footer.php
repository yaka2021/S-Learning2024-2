<?php
function footerArea($path){
 if($path == "f_user_name" || $path == "obtained_flags"){
		echo '<footer>
		<div class="wrapper">
			<button type="button">
				<a href="index.php">ホーム画面に戻る</a>
			</button>
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
		<button type="button">
			<a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSeqeAsNCx2iETBFRKZXJlDKD33Oo-ba7LkZxpHiQzO8TC6hPA/viewform?usp=sf_link">
			アンケートはこちら</a>
		</button>
		<p>
			情報科学専門学校<br>
			S-Learningプロジェクトチーム
		</p>
	</div>
	</footer>';
 }
}
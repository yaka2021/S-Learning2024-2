<?php include("./_src/_head.php"); ?>
<title>手に入れたFLAGの確認ページ | S-Learning 2024</title>
<style>

	.header_button:last-child{
		display: none;
	}

	.practiceWorks{
		height: 460px;
		overflow: auto;
	}

</style>
<script>
	<?php
	$flags = $db->query("SELECT `ID`, `NAME` FROM :STS;");
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
</script>
</head>
<body>
	<?php include("./_src/_header.php") ?>
	<main>
		<h2>手に入れたFLAG</h2>
		<div class="practiceWorks">
			<table class="obtainedFlags">
			<?php
			$i = 0;
			foreach ($flags as $flag){
				if ((int) $player_got[$stages[$i++]] == 1){
					$name = (string) $flag["NAME"];
				}else{
					$name = str_repeat("?", strlen($flag["NAME"]));
				}
				echo ($i % 2 === 0 ? "<tr class='oddTR'>" : "<tr class='evenTR'>");
				echo "<td class='spaceTD'></td><th>No. " . $flag["ID"] .
				"</th><td>FLAG={</td><td style='width: 100%;text-align: center;'>{$name}</td><td>}</td>
				<td style='text-align: right'></td>
				<td class='spaceTD'></td></tr>";
			}
			?>
			</table>
		</div>
	</main>
	<?php 
		include("./_src/_footer.php");
		$path = pathinfo($_SERVER['REQUEST_URI']);
		footerArea($path["filename"]);
	?>
</body>
</html>

<?php
include("_background/sqlManager.php");
$db = SqlManager::getManager();
$db->setUserId();

class StageManager{
	public static $stages;
	public static $stageColums = array(
		"ID", "TITLE", "DESCRIPT", "RATE", "CLEAR_FLAG1", "CLEAR_FLAG2"
	);
	public static function formatJsonIntoHash() : array{
		if (!isset($stages)){
			global $db;
			$result = $db->query("SELECT * FROM :STI");
			StageManager::$stages = array();
			foreach ($result as $val){
				$name = $val['NAME'];
				StageManager::$stages[$name] = array();
				foreach (StageManager::$stageColums as $key){
					StageManager::$stages[$name][$key] = $val[$key];
				}
			}
		}
		return StageManager::$stages;
	}
	static function isStageCleared($key) : bool{
		$json = StageManager::formatJsonIntoHash();
		if (!isset($json[$key])){ return false; }
		$flags = array_map(
			function($el){ return "STAGE" . $el; },
			array_filter(
				array($json[$key]["CLEAR_FLAG1"], $json[$key]["CLEAR_FLAG2"])
			)
		);
		global $db;
		$result = $db->query(
			"SELECT :STAGES AS FLAG FROM :PLT WHERE ID = :ID LIMIT 1;",
			array(":STAGES" => implode(" + ", $flags))
		)[0];
		return (int) $result["FLAG"] != 0;
	}
	static function drawJsonData($key, $data) : void{
		$a_tag = "<a href=\"practice?app={$key}\">";
		$star_num = isset($data['RATE']) ? (int) $data['RATE'] : 0;
		$clearText = StageManager::isStageCleared($key) ? "★" : "";
		echo "
<table class='practice'>
	<tr>
		<td rowspan='2'>
			<div class='thumbImg'>
				{$a_tag}<img src='{$key}/thumb.png' width=\"250\" height=\"172\" alt='thumb'></a>
			</div>
		</td>
		<td>
			<h3>{$a_tag}{$clearText}{$data['TITLE']}</a></h3>
			<p class='practiceDesc'>{$data['DESCRIPT']}</p>
			<p>
				<span>難易度：</span>
				<span class='starNum'>" .
				str_repeat('★', $star_num) . str_repeat('☆', 5 - $star_num) .
				"</span>
			</p>
		</td>
	</tr>
</table>";
	}
}

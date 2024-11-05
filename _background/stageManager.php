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
		$path_name = pathinfo($_SERVER['REQUEST_URI'], PATHINFO_FILENAME);
		$level_num = str_replace("level","",$path_name);

	if($data['RATE'] == $level_num){
			echo "
			<table class='practice'>
				<tr>
					<td rowspan='2'>";
					//クリアしている場合はthumb_cleared.pngを表示する
					if($clearText == "★"){
						echo "<div class='thumbImg'>
							{$a_tag}<img src='{$key}/thumb_cleared.png' width=\"250\" height=\"172\" alt='thumb'></a>
						</div>";
					}else{
						echo "<div class='thumbImg'>
							{$a_tag}<img src='{$key}/thumb.png' width=\"250\" height=\"172\" alt='thumb'></a>
						</div>";
					}					
						echo "</td>
					<td>
						<h3>{$data['ID']}.{$a_tag}{$data['TITLE']}</a></h3>
						<p class='practiceDesc'>{$data['DESCRIPT']}</p>
					</td>
				</tr>
			</table>";
		}	
	}

	public static function getClearLevel($userName){
	    	global $db;
	    	$CLEAR_LEVEL = 0;
		
    	   	$results = $db->query("SELECT `STAGE1` AS TUTORIAL_CLEAR_COUNT,
		(`STAGE2` + `STAGE3` +  `STAGE4` + `STAGE5`) AS LEVEL1_CLEAR_COUNT,
		(`STAGE6` + `STAGE7` + `STAGE8`) AS LEVEL2_CLEAR_COUNT 
		FROM :PLT  WHERE  `NAME` = \":NAME\";",
        	array(":NAME" => $userName ))[0];
        
    		if($results["TUTORIAL_CLEAR_COUNT"] > 0){
			$CLEAR_LEVEL = 1;
    		}
		if($results["TUTORIAL_CLEAR_COUNT"] > 0 && $results["LEVEL1_CLEAR_COUNT"] > 0){
			$CLEAR_LEVEL = 2;
		}
		if($results["TUTORIAL_CLEAR_COUNT"] > 0 && $results["LEVEL1_CLEAR_COUNT"] > 0 
		&& $results["LEVEL2_CLEAR_COUNT"] > 0){
			$CLEAR_LEVEL = 3;
		}

    		return $CLEAR_LEVEL;
	}


}

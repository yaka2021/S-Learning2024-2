<?php
if (isset($_POST["STAGE"])){
    include("sqlManager.php");
    $db = SqlManager::getManager();
    $db->setUserId();

    $id = htmlspecialchars($_POST["STAGE"]);
    $stageInfo = array(
        ":SID" => $id,
        ":CST" => "`STAGE{$id}`"
    );
    $result = $db->query(
        "SELECT :CST AS FLAG FROM :PLT WHERE `ID` = :ID;",
        $stageInfo
    );
    if ((int) $result[0]["FLAG"] == 1){
        echo "!ALREADY!";
    }else{
        $result = $db->query(
            "SELECT @SCORE := `SCORE` AS OBTAIN, `NAME` FROM :STS WHERE `ID` = :SID;
            WHERE `ID` = :ID;", $stageInfo
        )[0];
        echo "!DONE:" .
        (string) $result["OBTAIN"] . "," .
        (string) $result["NAME"] . "!";
    }
}else{
    echo "!FAILED!";
}
?>

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
}else{
    echo "!FAILED!";
}
?>

<?php
if (isset($_POST["NAME"])){
    include("sqlManager.php");
    $db = SqlManager::getManager();
    $db->setUserId();
    $name = htmlspecialchars(urldecode($_POST["NAME"]));
    try{
        $db->query("UPDATE :PLT SET `NAME` = \"{$name}\" WHERE `ID` = :ID;");
        echo "!DONE!";
    }catch(Exception $e){
        echo "!FAILED!";
    }
}else{
    echo "!FAILED!";
}
?>

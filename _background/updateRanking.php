<?php
(function(){
    try{
        if ($_SERVER["REQUEST_METHOD"] == "POST"){
            include("./sqlManager.php");
            $db = SqlManager::getManager();
            $db->setUserId();
            echo $db->getRanking();
            return;
        }else{
            echo "\"NOT THIS WAY\"";
        }
    }catch(Exception $e){
        echo "\"ERROR HAPPENED\"";
    }
})();
?>

<?php 
if (!class_exists('SqlManager')) {
  include("sqlManager.php");
  $db = SqlManager::getManager(); 
}

class UserManager{
  public static function CreateUser($userName,$password){
    global $db;
    $dupNameCheck = $db->query("SELECT `NAME` FROM :PLT WHERE `NAME` = \":NAME\";",
        array(":NAME" => $userName));

    if(empty($dupNameCheck)){
        $db->query("INSERT INTO :PLT(`NAME`,`PASSWORD`,`TIMESTAMP`) VALUES(\":NAME\",\":PASSWORD\",NOW());",
        array(":NAME" => $userName,":PASSWORD" => $password));

        $results = $db->query("SELECT `NAME` FROM :PLT WHERE `NAME` = \":NAME\";",
        array(":NAME" => $userName))[0];
        return $results;
    }
    return false;
}

public static function UserLogin($userName,$password){
    global $db;
    $results = $db->query("SELECT `NAME`,`PASSWORD` FROM :PLT WHERE 
    `NAME` = \":NAME\" AND `PASSWORD` = \":PASSWORD\";",
        array(":NAME" => $userName ,":PASSWORD" => $password))[0];
        
    if(isset($results["NAME"]) && isset($results["PASSWORD"])){
        $db->query("UPDATE :PLT SET `TIMESTAMP` = NOW() WHERE `NAME` = \":NAME\" AND `PASSWORD` = \":PASSWORD\";",
        array(":NAME" => $results["NAME"],":PASSWORD" => $results["PASSWORD"]));
        return $results;
    }
    return false;
}

public static function UpdateName($newName){
    global $db;
    session_start();
    $nowName = $db->query("SELECT `ID` FROM :PLT WHERE `NAME` =  \":NAME\";",
    array(":NAME" => $_SESSION["username"]))[0];

    $dupNameCheck = $db->query("SELECT `ID` FROM :PLT WHERE `NAME` =  \":NAME\";",
    array(":NAME" => $newName))[0];

    if(isset($nowName["ID"]) && !isset($dupNameCheck)){
        $db->query("UPDATE :PLT SET `NAME` = \":NEWNAME\" WHERE
        `ID` = (SELECT `ID` FROM :PLT WHERE `NAME` =  \":NAME\");",
            array(":NEWNAME" => $newName,":NAME" => $_SESSION["username"]));

        $results = $db->query("SELECT `NAME` FROM :PLT WHERE `NAME` =  \":NEWNAME\";",
            array(":NEWNAME" => $newName))[0];
        
       return $results;
    }
    return false;
}

public static function GetUserName(){
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }
	return $_SESSION["username"];
}

public static function GetTimestamp(){
  global $db;
  if (session_status() == PHP_SESSION_NONE) {
    session_start();
  }
  $timeStamp = $db->query("SELECT `TIMESTAMP` FROM :PLT WHERE `NAME` =  \":NAME\";",
    array(":NAME" => $_SESSION["username"]))[0]["TIMESTAMP"];
   
   return $timeStamp;
}

}
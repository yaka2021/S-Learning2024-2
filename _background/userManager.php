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

    if(empty($dupNameCheck)){//ハッシュ化するだけでは甘いので暗号化とキーを生成したい　不十分
        $db->query("INSERT INTO :PLT(`NAME`,`PASSWORD`) VALUES(\":NAME\",\":PASSWORD\");",
        array(":NAME" => $userName,":PASSWORD" => password_hash($password, PASSWORD_DEFAULT)));

        $results = $db->query("SELECT `NAME` FROM :PLT WHERE `NAME` = \":NAME\";",
        array(":NAME" => $userName))[0];
        return $results;
    }
    return false;
}

public static function UserLogin($userName,$password){

        session_start();
        $_SESSION["NotOpenLevelMsg"] = "";

        global $db;
    $results = $db->query("SELECT `NAME`,`PASSWORD` FROM :PLT WHERE `NAME` = \":NAME\";", 
    array(":NAME" => $userName ))[0];
        
    if(isset($results["NAME"])){
        //パスワードの復号化　不十分
        if(password_verify($password,$results['PASSWORD'])){
            $db->query("UPDATE :PLT SET `TIMESTAMP` = NOW() WHERE `NAME` = \":NAME\" AND 
            `PASSWORD` = \":PASSWORD\" AND TIMESTAMP IS NULL;",
            array(":NAME" => $results["NAME"],":PASSWORD" => $results["PASSWORD"]));
            return $results;
        }
    }
    return false;}

public static function UpdateName($newName){
    global $db;

    session_start();
    $nowName = $db->query("SELECT `ID` FROM :PLT WHERE `NAME` =  \":NAME\";",
    array(":NAME" => $_SESSION["username"]))[0];

    $dupNameCheck = $db->query("SELECT `ID` FROM :PLT WHERE `NAME` =  \":NAME\";",
    array(":NAME" => $newName))[0];

    if(isset($nowName["ID"]) && !isset($dupNameCheck)){
 	$nowNameID = $db->query("SELECT `ID` FROM :PLT WHERE `NAME` =  \":NAME\";",
	    array(":NAME" => $_SESSION["username"]))[0];

	    $db->query("UPDATE :PLT SET `NAME` = \":NEWNAME\" WHERE `ID` = \":NowNameID\";",
            array(":NEWNAME" => $newName,":NowNameID" => $nowNameID["ID"]));
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
<?php 

//SqlManagerクラスは既に宣言されているか
if (!class_exists('SqlManager')) {
  include("sqlManager.php");
  $db = SqlManager::getManager(); 
}

class UserManager{
  public static function CreateUser($userName,$password){
        global $db;

        //ユーザ名が重複していないか探索
        $dupNameCheck = $db->query("SELECT `NAME` FROM :PLT WHERE `NAME` = \":NAME\";",
            array(":NAME" => $userName));

        //作成するユーザ名が登録されていなければ
        if(empty($dupNameCheck)){
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
            
        //入力が空でないか
        if(isset($results["NAME"])){

            //パスワードが合致するか
            if(password_verify($password,$results['PASSWORD'])){
                $db->query("UPDATE :PLT SET `TIMESTAMP` = NOW() WHERE `NAME` = \":NAME\" AND 
                `PASSWORD` = \":PASSWORD\" AND TIMESTAMP IS NULL;",
                array(":NAME" => $results["NAME"],":PASSWORD" => $results["PASSWORD"]));
                return $results;
            }
        }
        return false;
    }

    public static function UpdateName($newName){
        global $db;

        session_start();

        //現在のユーザ名が保管されているフィールドのIDを取得
        $nowName = $db->query("SELECT `ID` FROM :PLT WHERE `NAME` =  \":NAME\";",
        array(":NAME" => $_SESSION["username"]))[0];

        //新しい名前と登録済みの名前で重複がないか調べる
        $dupNameCheck = $db->query("SELECT `ID` FROM :PLT WHERE `NAME` =  \":NAME\";",
        array(":NAME" => $newName))[0];

        //現在のユーザ名のIDが取得できていて、重複する名前がないか
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
        //セッションは有効になっているか
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        return $_SESSION["username"];
    }

    public static function GetTimestamp(){
        global $db;
        //セッションは有効になっているか
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        $timeStamp = $db->query("SELECT `TIMESTAMP` FROM :PLT WHERE `NAME` =  \":NAME\";",
            array(":NAME" => $_SESSION["username"]))[0]["TIMESTAMP"];       
        return $timeStamp;
    }

}
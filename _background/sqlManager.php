<?php
class SqlManager{
    static function getManager() : SqlManager{
        $pos = strpos(getcwd(), "xampp");
        if ($pos > 0){
            return new TestSqlManager();
        }else{
            return new SqlManager();
        }
    }
    protected function getHostName() : string { return "mysql203.phy.lolipop.lan"; }
    protected function getDBName() : string { return "LAA1175090-learn"; }
    protected function getConnectOptions() : string { return ""; }
    protected function getHostInfo() : string {
        $str = "mysql:host=";
        $str .= $this->getHostName() . "; dbname=";
        $str .= $this->getDBName() . ";" . $this->getConnectOptions();
        return $str;
    }

    protected function getUserName() : string { return "LAA1175090"; }
    protected function getPassword() : string { return "dFi7DUjm"; }
    protected function getPlayerTable() : string { return "PLAYER_INFO"; }
    protected function getStageInfoTable() : string { return "STAGES_INFO"; }
    protected function getStageScoreTable() : string { return "STAGES_SCORE"; }
    public $cookie_name = 'SESSION';
    public $isFirstVisit = true;
    public $firstVisitTime = "";
    public $player_id = 0;
    protected $pdo;
    function __construct(){
        try{
            $this->pdo = new PDO(
                $this->getHostInfo(), $this->getUserName(), $this->getPassword()
            );
        }catch (PDOException $e){
            header('Content-Type: text/plain; charset=UTF-8', true, 500);
            exit($e->getMessage());
        }
    }

    public function setUserId() : void{
        $cookie_name = $this->cookie_name;
        if (isset($_COOKIE[$cookie_name])){
            // COOKIEが正常か
            $result = $this->decodeUserOnCookie($_COOKIE[$cookie_name]);
            if (count($result) > 0){
                $this->player_id = $result[0]["ID"];
                $this->firstVisitTime = $result[0]["TIMESTAMP"];
                $this->isFirstVisit = false;
                return;
            }
        }
        // COOKIEを生成
        $this->firstVisitTime = (new DateTime())->format('Y-m-d H:i:s');
        $this->query(
            "INSERT INTO :PLT(`TIMESTAMP`) VALUES(\":TIMESTAMP\");",
            array(":TIMESTAMP" => $this->firstVisitTime)
        );
        $this->firstVisitTime = $this->firstVisitTime;
        $this->player_id = (int) $this->pdo->lastInsertId();
        $user_cookie = $this->encodeUserOnCookie($this->player_id);
        $this->query(
            "UPDATE :PLT SET `COOKIE` = \":VAL\", `NAME` = \":NAME\" WHERE `ID` = :ID",
            array(":VAL" => $user_cookie, ":NAME" => "NO.{$this->player_id}")
        );
        $limit = $this->cookieLimitDate();
        setcookie($cookie_name, $user_cookie, $limit,
            '/2022', $_SERVER["SERVER_NAME"]
        );
        setcookie($cookie_name, $user_cookie, $limit,
            '/2021', $_SERVER["SERVER_NAME"]
        );
    }
    protected function cookieLimitDate() : int{
        return time() + 86400 * 31;
    }
    protected function encodeUserOnCookie($id) : string{
        $mul_mod = mt_rand(0x0f, 0x700);
        $int_mod = mt_rand(0x00f, 0x8ff);
        $hex = base_convert(
            ($id + $mul_mod) % $int_mod + $int_mod + $id * 4096, 10, 16
        );
        return $hex; //password_hash($hex, PASSWORD_DEFAULT);
    }
    protected function decodeUserOnCookie($cache) : array{
        $results = $this->query(
            "SELECT `ID`, `TIMESTAMP` FROM :PLT WHERE `COOKIE` = \":VAL\" LIMIT 1;",
            array(":VAL" => $cache)
        );
        return $results;
    }
    public function query($sql, $param = array(), $type = PDO::FETCH_ASSOC) : array{
        if (isset($this->pdo)){
            $param[':ID'] = $this->player_id;
            $param[':PLT'] = $this->getPlayerTable();
            $param[':STI'] = $this->getStageInfoTable();
            $param[':STS'] = $this->getStageScoreTable();
            foreach( $param as $key => $value ) {
                $sql = str_replace($key, htmlspecialchars($value, ENT_QUOTES), $sql);
            }
            $stmt = $this->pdo->prepare($sql);
            if ($stmt->execute()){
                return $stmt->fetchAll($type);
            }else{
                echo debug_backtrace()[1]['function'] . "<br>";
                die("SQL: something went wrong: " . $sql . "<br>");
            }
        }
        return array();
    }
    public function getPlayerScores() : int{
        return $this->query("SELECT `SCORES` FROM :PLT WHERE `ID` = :ID;")[0]["SCORES"];
    }
    public function getPlayerName() : string{
        return $this->query("SELECT `NAME` FROM :PLT WHERE `ID` = :ID;")[0]["NAME"];
    }
    public function getRanking() : string{
        $this->query("SET @r = 0");
        return json_encode($this->query(
            "SELECT * FROM (
                SELECT `ID`, `SCORES`, `NAME`, @r := @r + 1 AS RANKS
                FROM :PLT ORDER BY `SCORES` DESC
            ) AS RANKLIST WHERE `RANKS` < 6 OR `ID` = :ID;"
        ));
    }
}


class TestSqlManager extends SqlManager{
    protected function getHostName() : string { return "localhost"; }
    protected function getDBName() : string { return "s_learning"; }
    protected function getUserName() : string { return "root"; }
    protected function getPassword() : string { return ""; }
    function __construct(){
        parent::__construct();
        $this->createLocalTablesForTest();
        echo "<span style='color:white'>This is local test</span><BR>";
    }
    function createLocalTablesForTest() : void{
    }
}
?>

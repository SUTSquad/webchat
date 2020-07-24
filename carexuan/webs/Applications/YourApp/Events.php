<?php
//declare(ticks=1);

use \GatewayWorker\Lib\Gateway;

/**
 * 主逻辑
 * 主要是处理 onConnect onMessage onClose 三个方法
 * onConnect 和 onClose 如果不需要可以不用实现并删除
 */
class Events
{
    private static $dbms     = 'mysql';
    private static $host     = 'localhost';
    private static $dbName   = 'chat';
    private static $user     = 'root';
    private static $pass     = 'root';
    private static $pdo;
    private static $groupIds = [];

    public static function onWorkerStart()
    {
        try {
            self::$pdo = new PDO(self::$dbms . ":host=" . self::$host . ";dbname=" . self::$dbName, self::$user, self::$pass);
        } catch (PDOException $e) {
            die($e->getMessage());
        }
        self::$groupIds = array_column(self::$pdo->query("select id from room")->fetchAll(PDO::FETCH_ASSOC),'id');
    }

    /**
     * 当客户端连接时触发
     * 如果业务不需此回调可以删除onConnect
     *
     * @param  int  $client_id  连接id
     */
    public static function onConnect($client_id)
    {
        // 向当前client_id发送数据 
        Gateway::sendToClient($client_id, "Hello $client_id\r\n");
        // 向所有人发送
        Gateway::sendToAll("$client_id login\r\n");
    }

    public static function onWebSocketConnect($client_id,$data){
        $token = trim($data['get']['token']);
        $sql = "select id from user where token='{$token}'";
        $userid = self::$pdo->query($sql)->fetch(PDO::FETCH_ASSOC)['id'];
        Gateway::bindUid($client_id,$userid);
    }

    /**
     * 当客户端发来消息时触发
     *
     * @param  int    $client_id  连接id
     * @param  mixed  $message    具体消息
     */
    public static function onMessage($client_id, $message)
    {
        Gateway::sendToClient($client_id, $message);
        // 向所有人发送 
        Gateway::sendToAll("$client_id said $message\r\n");
    }

    /**
     * 当用户断开连接时触发
     *
     * @param  int  $client_id  连接id
     */
    public static function onClose($client_id)
    {
        // 向所有人发送
        GateWay::sendToAll("$client_id logout\r\n");
    }
}

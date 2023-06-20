<?php
// include '../display_error.php';
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


function db()
{
    $host = 'localhost';
    $username = 'root';
    $password = '';
    $database = 'ptac';;
    try {
        $db = mysqli_connect($host, $username, $password, $database);
        if ($db) {
            return $db;
        } else {
            return null;
        }
    } catch (Exception $ex) {
        die($ex);
    }
}
$db = db();
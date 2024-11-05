<?php
include("userManager.php");
session_start();
unset($_SESSION);
session_destroy();

header("Location: ../f_login.php");
exit;
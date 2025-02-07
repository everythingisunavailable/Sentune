<?php
//setting certain cookie params to true
ini_set('session.use_only_cookies', 1);
ini_set('session.use_strict_mode', 1);

session_set_cookie_params([
    'lifetime' => 3600,
    'domain' => 'https://sentune.great-site.net/',
    'path' => '/',
    'secure' => true,
    'httponly' => false
]);
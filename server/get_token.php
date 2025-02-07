<?php

require_once 'session_config.inc.php'; // start session

if (!isset($_SESSION['token'])){
    session_start();
    $_SESSION['token'] = get_token();
}

function get_token(){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://accounts.spotify.com/api/token');
    curl_setopt($ch, CURLOPT_POST, true);

    $client_id = getenv('CLIENT_ID');
    $client_secret = getenv('CLIENT_SECRET');
    $data = [
        'grant_type' => 'client_credentials',
        'client_id' => $client_id,
        'client_secret' => $client_secret
    ];

    $postData = http_build_query($data);
    
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
    $headers = [
        "Content-Type: application/x-www-form-urlencoded"
    ];
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    
    
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    
    if (curl_errno($ch)) {
        echo "cURL Error: " . curl_error($ch);
        curl_close($ch);
        die();
    }
    curl_close($ch);

    return $response;
}
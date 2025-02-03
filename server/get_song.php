<?php

try {
    require_once 'get_token.php'; //token is in session

    $sentence = file_get_contents('php://input');
    $words = preg_split('/[\s,]+/', $sentence);
    
    if (sizeof($words) >= 15) {
        echo 'limit is 15 words at a time';
    }
    else{

        $results = [];
        $results = search_songs($words, sizeof($words)-1, $results);
        if (empty($results)) {
            echo 'not a single song found';
        }
        else{
            echo json_encode($results);
        }
    }
} catch (Exception $e) {
    echo 'couldnt read from body or could not get token, one or the other, who knows? maybe both, maybe none. This is meaningless.';
}


function get_song(string $given_track, $object) {
    usleep(100000); // Limit to 10 requests per second

    $url = 'https://api.spotify.com/v1/search?q=track:%22' . urlencode($given_track) . '%22&type=track&limit=20';
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url); 
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $headers = [
        "Authorization: Bearer $object->access_token",
        "Content-Type: application/json"
    ];
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    // Set precise timeouts in milliseconds
    curl_setopt($ch, CURLOPT_TIMEOUT_MS, 30000);        // Max execution time: 30 seconds
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT_MS, 30000); // Max connection time: 30 seconds
    
    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        if (curl_errno($ch) == CURLE_OPERATION_TIMEDOUT) {
            echo 'Request timed out for track: ' . $given_track . PHP_EOL;
        } else {
            echo 'cURL Error: ' . curl_error($ch) . PHP_EOL;
        }
        curl_close($ch);
        return null;
    }
    
    curl_close($ch);
    return json_decode($response);
}

function compare($objects, $given_track){
    foreach ($objects as $track){
        if (strtolower($track->name) === strtolower($given_track)){
            return $track;
        }
    }
    return null;
}

function glue_together($words, $end_index){
    $sentence = $words[0];
    for ($i=0; $i <= $end_index-1; $i++) { 
        $sentence = $sentence .'+'. $words[$i+1]; 
    }
    return $sentence;
}

function search_songs(array $words, int $end_index, array $results){
    if ($end_index < 0) {
        return $results;
    }

    $prepared_sentence = glue_together($words, $end_index);
    
    $unfiltered_results = get_song($prepared_sentence, json_decode($_SESSION['token']));

    if (isset($unfiltered_results->tracks)) {
        //remove + from sentence if any
        $sentence = str_replace('+', ' ', $prepared_sentence);
        $tmp = compare($unfiltered_results->tracks->items, $sentence);
        $result = [];
        if ($tmp != null ) {
            $result[] = $tmp;
        }
    }
    else{
        $result = [];
    }

    if (!empty($result)) {
        $results = array_merge($results, $result);
        //now search for the remaining string if any
        $words = array_slice($words, $end_index+1);
        if (empty($words)) {
            return $results;
        }
        $remaining_results = [];
        $new_results = search_songs($words, sizeof($words)-1, $remaining_results);
        if (!empty($new_results)) {
            $results = array_merge($results, $new_results);
        }
    }
    else if ($end_index != 0){
        //if we dont find results when comparing current 
        $remaining_results = [];
        $new_results = search_songs($words, $end_index-1, $remaining_results);
        if (!empty($new_results)) {
            $results = array_merge($results, $new_results);
        } 
    }
    else{
        $words = array_slice($words, $end_index+1);
        if (empty($words)) {
            return $results;
        }
        $remaining_results = [];
        $new_results = search_songs($words, sizeof($words)-1, $remaining_results);
        if (!empty($new_results)) {
            $results = array_merge($results, $new_results);
        }
    }

    return $results;
}
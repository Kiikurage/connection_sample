<?php
    header('Access-Control-Allow-Origin: *');

    $SECRET = [
        1 => "DOCUMENT_ROOT",
        2 => "PHPRC", 
        3 => "PATH",
        4 => "SCRIPT_FILENAME"
    ];

    echo "==============================\n";
    echo "REQUEST SUCCESS\n";
    echo "------------------------------\n";

    foreach ($_SERVER as $key => $value) {
        if (array_search($key, $SECRET)) {
            echo $key." : (秘密)\n";
        } else {
            echo $key." : ".$value."\n";
        }
    }

    switch ($_SERVER["REQUEST_METHOD"]) {
        case "GET":
            echo "------------------------------\n";
            echo "GET METHOD PARAMETER\n";
            echo "------------------------------\n";

            foreach ($_GET as $key => $value) {
                echo $key." : ".$value."\n";
            }
            break;

        case "POST":
            echo "------------------------------\n";
            echo "POST METHOD PARAMETER\n";
            echo "------------------------------\n";

            foreach ($_POST as $key => $value) {
                echo $key." : ".$value."\n";
            }
            break;

        default:
            echo "------------------------------\n";
            echo "METHOD TYPE IS UNDEFINED\n";
            echo "------------------------------\n";
    }

    echo "------------------------------\n";
?>

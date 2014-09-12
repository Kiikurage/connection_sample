/**
 *
 *  Sample2: XMLHttpRequestを利用したAjax
 *
 */

function get(url, param, onload, onerror) {
    var xhr = new XMLHttpRequest();

    if (param) {
        url += "?" + encodeURLParam(param);
    }

    xhr.open("GET", url);
    xhr.addEventListener("load", function() {
        onload(xhr.responseText);
    });
    xhr.addEventListener("error", onerror);
    xhr.send();
}

function post(url, body, onload, onerror) {
    var xhr = new XMLHttpRequest();

    xhr.open("POST", url);
    xhr.addEventListener("load", function() {
        onload(xhr.responseText);
    });
    xhr.addEventListener("error", onerror);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(encodeURLParam(body));
}

function encodeURLParam(params) {
    var res = [];

    for (var k in params) {
        if (!(params.hasOwnProperty(k))) {
            continue;
        }

        res.push(k + "=" + encodeURIComponent(params[k]));
    }

    return res.join("&");
}

function send1() {
    get("http://silverlance.sakura.ne.jp/connection_sample/server/privateresource.php", {
        num: 12345,
        str: "hello world!"
    }, function(res) {
        response.value = res;
    }, function() {
        response.value = "失敗";
    });
}

function send2() {
    get("http://silverlance.sakura.ne.jp/connection_sample/server/publicresource.php", {
        num: 12345,
        str: "hello world!"
    }, function(res) {
        response.value = res;
    }, function() {
        response.value = "失敗";
    });
}

function send3() {
    post("http://silverlance.sakura.ne.jp/connection_sample/server/publicresource.php", {
        num: 12345,
        str: "hello world!"
    }, function(res) {
        response.value = res;
    }, function() {
        response.value = "失敗";
    });
}

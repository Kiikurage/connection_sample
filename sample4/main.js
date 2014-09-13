/**
 *
 *  Sample4: ブラウザでのFaceBookへOAuth認証
 *
 */

function checkAccessToken() {
    var b = {};
    document.location.hash.substr(1).split("&").forEach(function(a) {
        a = a.split("=");
        b[a[0]] = a[1]
    });
    return b.access_token;
}

var CLIENT_ID = "525403397594677",
    REDIRECT_URI = document.location.origin + document.location.pathname;

var AccessToken = null;

function auth() {
    var url = "https://www.facebook.com/dialog/oauth?" + encodeURLParam({
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        response_type: "token"
    });

    document.location.href = url;
}

function getProfile() {
    get("https://graph.facebook.com/me", {
        access_token: AccessToken
    }, function(body) {
        var profile = JSON.parse(body);
        console.log(profile);
        view.innerHTML = body;
    }, function() {
        console.log("失敗")
    });
}

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

function goAuth() {
    auth();
}

window.addEventListener("load", function() {
    AccessToken = checkAccessToken();

    if (AccessToken) {
        getProfile();
    } else {
        auth();
    }
});

/**
 *
 *  Sample3: Node.jsでのFaceBookへOAuth認証
 *
 */

var request = require("request"),
    exec = require("child_process").exec;

var CLIENT_ID = "819377864774244",
    REDIRECT_URI = "http://kikura-yuichiro.github.io/connection_sample/server/redirect.html";

var AccessToken = null;

if (process.argv.length >= 3) {
    AccessToken = process.argv[2];
    getProfile();
} else {
    auth();
    console.log("Please call as 'node main.js {{accessToken}}'");
}

function auth() {
    var url = "https://www.facebook.com/dialog/oauth?" + encodeURLParam({
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        response_type: "token"
    });

    exec("open " + url.replace(/&/g, "\\&"));
}

function getProfile() {
    var url = "https://graph.facebook.com/me?" + encodeURLParam({
        access_token: AccessToken
    });

    request.get(url, function(err, res, body) {
        if (err) {
            console.error(err);
        } else {
            var profile = JSON.parse(body);
            console.log(profile);
        }
    });
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

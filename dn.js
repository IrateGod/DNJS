var httpBase = "http://www.duelingnetwork.com:8080/Dueling_Network/v2/action/";

function executeHttpRequest (action, method, body, callback) {
    jQuery.ajax({
        method: method,
        url: httpBase + action,
        success: callback,
        data: body,
        dataType: "json",
        error: function (jqXHR, status, error) {
            console.error("An error occurred during the process: ", error);
        }
    });
}

function login (username, password, rememberMe, callback) {
    executeHttpRequest("login", "POST", { username: username, password: password, rememberMe: rememberMe }, callback);
}

function isLoggedIn (callback) {
    executeHttpRequest("logged_in", "GET", {}, callback);
}

function forgotPassword (email, callback) {
    executeHttpRequest("forgot_password", "POST", { email: email }, callback);
}

function logout (callback) {
    executeHttpRequest("logout", "POST", {}, callback);
}

function register (username, password, email, callback) {
    executeHttpRequest("register", "POST", { username: username, password: password, email: email }, callback);
}

function duelServerLogin (loginToken, adminStatus, isAdminNormalUser) {
    console.log(loginToken, adminStatus, isAdminNormalUser);
}    

$(function () {
    isLoggedIn(function (response) {
        console.log(response);
        if (response.success) {
            var canLogIn = true;
            console.log("Server didn't throw an error.");
            if (undefined !== response.username) {
                console.log("User is already logged in. Check if he's not banned or hasn't confirmed his email.");
                if (response.banned) {
                    canLogIn = false;
                    console.log("You are banned!");
                }
                if (!response.confirmed) {
                    canLogIn = false;
                    console.log("Confirm your mail first. Resend confirmation mail?");
                }
                if (response.firstLogin) {
                    console.log("Welcome to DN. I hope you enjoy your stay here. - Black Luster Soldier");
                }
            } else {
                canLogIn = false;
            }
            if (canLogIn) {
                duelServerLogin(response.loginToken, response.admin, true); // TODO: figure out a better way to make a switch button for admins available
            }
        } else {
            console.error("Server encountered an error when logging in: ", response.error);
        }
    });
});
var httpBase = "http://www.duelingnetwork.com:8080/Dueling_Network/v2/action/";

function executeHttpRequest (action, method, body, callback) {
    jQuery.ajax({
        method: method,
        url: httpBase + action,
        complete: callback,
        data: body,
        dataType: "json",
        error: function (jqXHR, status, error) {
            console.error("An error occurred during the process: ", error);
        }
    });
}

function login (username, password, rememberMe) {
    executeHttpRequest("login", "POST", { username: username, password: password, rememberMe: rememberMe }, function (response) {
        console.log(response);
        if (response.success) {
            console.log("Server processed request.");
        } else {
            console.error("Encountered error: ", error);
        }
    });
}

function isLoggedIn () {
    executeHttpRequest("logged_in", "GET", {}, function (response) {
        if (response.success) {
            console.log("Server processed request.");
            if (response.username) {
                console.log("We're also logged in. Handle this!");
            }
        } else {
            console.error("Encountered error: ", error);
        }
    });
}

function forgotPassword (email) {
    executeHttpRequest("forgot_password", "POST", { email: email }, function (response) {
        // handle forgot password response
    });
}

function logout () {
    executeHttpRequest("logout", "POST", {}, function (response) {
        // handle logout
    });
}

function register (username, password, email) {
    executeHttpRequest("register", "POST", { username: username, password: password, email: email }, function (response) {
        // handle register
    });
}
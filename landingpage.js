function setCookie(cookieName, cookieValue, expires="", path="/") {
    if (expires === "") {
        let currentDate = new Date();
        expires = new Date(
            currentDate.getFullYear() + 1,
            currentDate.getMonth(),
            currentDate.getDate()
        );
    }

    let cookie = "";
    cookie += `${cookieName}=${cookieValue};`;
    cookie += `expires=${(new Date(expires)).toUTCString()};`;
    cookie += `path=${path};`;
    
    document.cookie = cookie;
}

function getCookie(cookieName) {
    var key = cookieName + "=";
    var retrieveCookie = document.cookie;
    var ca = retrieveCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(key) == 0) {
            return c.substring(key.length, c.length);
        }
    }
    return "";
}

function userLogin() {
    let username = document.getElementById("username").value;
    const validCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    if (username.length == 0) {
        document.getElementById("username-display").innerHTML = "";
        return;
    }

    for (let char of username) {
        if (!validCharacters.includes(char)) {
            document.getElementById("username-display").innerHTML = "Username invalid. Please enter numbers and letters only.";
            return;
        }
    }

    setCookie("username", username);
    document.getElementById("username-display").innerHTML = "Welcome, " + username + ".";
}

window.onload = function() {
    let storedUsername = getCookie("username");
    if (storedUsername) {
        document.getElementById("username-display").innerHTML = "Welcome, " + storedUsername + ".";
    }
}
function userLogin() {
    let username = document.getElementById("username").value;
    const validCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let char of username) {
        if (!validCharacters.includes(char)) {
            document.getElementById("username-display").innerHTML = "Please enter numbers and letters only. Logged in to previous user.";
            return;
        } else {
            localStorage.setItem('username', username);
        }
    }

    if (username.length == 0) {
        document.getElementById("username-display").innerHTML = "Logged in to previous user.";
        return;
    } else {
        localStorage.setItem('username', username);
    }

    
    document.getElementById("username-display").innerHTML = "Welcome, " + username + ".";
}
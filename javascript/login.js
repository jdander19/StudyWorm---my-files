console.log("login.js linked");
// Login logic 

function LoginClick(e) { // click events for login Login
    if (debug) {
        console.log("LoginClick function: " + e.getAttribute('id') + " was processed")
    }

    if (e.getAttribute('id') === 'new-account') { // new account clicked
        console.log(e)
        if (e.checked) { // toggles Login box labeling new/login
            loginMode = "new";
            document.getElementById("dialog-title").textContent = "New User";
            document.getElementById("goLogin").textContent = "Create New User";
            document.getElementById("login-reset").style.display = "none";
        } else {
            loginMode = "login";
            document.getElementById("dialog-title").textContent = "Study Worm Login";
            document.getElementById("goLogin").textContent = "Login";
            document.getElementById("login-reset").style.display = "inline-block";
        }
    }

    if (e.getAttribute('id') === 'reset-account') { // reset account clicked
        if (e.checked) { // toggles Login box labeling reset/login
            loginMode = "reset";
            document.getElementById("dialog-title").textContent = "Reset Password";
            document.getElementById("goLogin").textContent = "Send Reset Email";
            document.getElementById("login-checkbox").style.display = "none";
            document.getElementById("password-block").style.display = "none";
        } else {
            loginMode = "login";
            document.getElementById("dialog-title").textContent = "Study Worm Login";
            document.getElementById("goLogin").textContent = "Login";
            document.getElementById("login-checkbox").style.display = "inline-block";
            document.getElementById("password-block").style.display = "inline-block";
        }
    }

    if (e.getAttribute('id') === 'goLogin') { // go button clicked
        email = document.getElementById("user-name").value;
        password = document.getElementById("current-password").value;

        if (loginMode === "reset") {
            if (validateEmail(email)) {
                // password reset here
                console.log("about to reset");
                firebase.auth().sendPasswordResetEmail(email).then(function () {
                    if (debug) {
                        console.log("Reset email to to: " + email)
                    }
                    hideModal();
                }).catch(function (error) {
                    if (debug) { // An error happened.
                        console.log(errorCode);
                        console.log(errorMessage);
                    }
                });
            } else {
                alert(email + " is not a valid email address!")
            }
        }
        if (loginMode === "new") {
            if (validateEmail(email) && password.length >= 6) {
                // new account here
                firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
                    if (debug) {
                        console.log(errorCode)
                        console.log(errorMessage)
                    }
                });
                // verify new email address
                setTimeout(function () { // need a few seconds for new doc to set
                    user = firebase.auth().currentUser;
                    user.sendEmailVerification().then(function () {
                        // Email sent.
                        hideModal();
                    }).catch(function (error) {
                        if (debug) {
                            console.log(errorCode)
                            console.log(errorMessage)
                        }
                    });
                }, 3000);

            } else {
                alert(email + " is not a valid or password is less than 6 characters.");
            }
        }
        if (loginMode === "login") {
            if (validateEmail(email) && password.length >= 6) {
                // login here
                firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (debug) {
                        console.log(errorCode)
                        console.log(errorMessage)
                    }
                });
                if (debug) { // good to go - logged in successfully  
                    console.log(firebase.auth().currentUser);
                    hideModal();
                }
            } else {
                alert(email + " is not a valid or password is less than 6 characters.");
            }
        }
    }
}

function showModal() { // resets and displays modal 
    loginMode = "login";
    document.getElementById("dialog-title").textContent = "Study Worm Login";
    document.getElementById("goLogin").textContent = "Login";
    document.getElementById("new-account").checked = false;
    document.getElementById("reset-account").checked = false;
    document.getElementById("login-checkbox").style.display = "inline-block";
    document.getElementById("password-block").style.display = "inline-block";
    document.getElementById("login-reset").style.display = "inline-block";
    // document.getElementById("goLogin").disabled = true;
    $('#modal').modal('open');
};

function hideModal() { // hides modal
    document.getElementById('modal').style.display = 'none';
};
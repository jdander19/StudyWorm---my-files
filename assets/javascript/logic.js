console.log("logic.js linked");

// Global Assignments
let debug = true;
let modalMode;
let ipAddress;
let password;
let email;


document.body.onclick = keyClick;

//let user = firebase.auth().currentUser;

console.log(geoplugin_request());



$(document).ready(function () {
    $('ul.tabs').tabs({
        swipeable: false,
        responsiveThreshold: 1920
    });
});

function validateEmail(email) { // regex text email validation
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// showModal();





// click event
function keyClick(e) { // looking for clicks  - wheel or on-screen keyboard
    e = window.event ? event.srcElement : e.target;
    if (debug) {
        console.log("click event: " + e.getAttribute('id') + " was clicked")
        console.log(e);
    }

    if (e.getAttribute('id') === 'login') {
        if (debug) {
            console.log("validated login click: " + e.getAttribute('id') + " was processed")
        }
        if (document.getElementById("login").value = "Login") {
            showModal();
        }
        if (document.getElementById("login").value = "Logout") {
            // sign out via top nav
            password = "";
            firebase.auth().signOut().then(function () {
                document.getElementById("login").value = "Login";
                console.log("Sign-out successful.");
            }).catch(function (error) {
                console.log("Sign-out error");
            });

        }
    }


    if (e.classList.contains("login-item")) {
        loginClick(e);
    }
    return;
}
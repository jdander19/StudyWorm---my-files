console.log("logic.js linked");
// Javascript base code

// Global Assignments
let debug = true;
let loginMode = "login";
let ipAddress;
let password;
let email;
let fbUid;
let myLatLng = {
	// UT Austin default
	lat: 30.28575,
	lng: -97.7292
};

let mySubject = new Array();
let user = firebase.auth().currentUser;

$(document).ready(function() {
	$("ul.tabs").tabs({
		swipeable: true,
		responsiveThreshold: Infinity
	});
	$("#modal").modal();

	// timer events
	$("#pause").on("click", stop);
	// $("#reset").on("click", reset);
	$("#start").on("click", start);
});

// TEST *** REMOVE LATER VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
let myTest = {
	email: "billstephan@yahoo.com",
	displayName: "billstephan",
	ipAddress: "70.122.32.121",
	city: "Austin",
	state: "Texas",
	location: [30.3471, -97.7609],
	subjects: ["Math", "Science", "French", "FSD Bootcamp"],
	goals: [50, 70, 20, 150],
	hours: [0, 0, 0, 0],
	subjectStartTime: [0, 0, 0, 0],
	subjectOpen: [false, false, false, false],
	accessCount: 1,
	tsCreated: 1580483465519,
	tsUpdated: 1580483465519
};
console.log("Test userObj myTest");
console.log(myTest); // view test data Object
console.log("Test IP availability: " + geoplugin_request());
myLatLng.lat = myTest.location[0];
myLatLng.lng = myTest.location[1];

//initMap(); // load map to page div

// TEST *** REMOVE LATER ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// mouse click or touch listener
document.body.onclick = keyClick;

// click event tree
function keyClick(e) {
	// looking for clicks  - wheel or on-screen keyboard
	e = window.event ? event.srcElement : e.target;
	if (debug) {
		console.log("click event: " + e.getAttribute("id") + " was clicked");
		console.log(e);
	}

	initMap();
	// };
	// END OF MAP

	if (e.getAttribute("id") === "loginButton") {
		// clicked #login"
		if ((document.getElementById("loginButton").value = "Login")) {
			// if displayed text of #login = "Login"
			showModal();
		}
		if ((document.getElementById("loginButton").value = "Logout")) {
			// if displayed text of #login = "Logout"
			password = "";
			firebase
				.auth()
				.signOut()
				.then(function() {
					// Firebase sign out process
					document.getElementById("loginButton").value = "Login";
					console.log("Sign-out successful.");
				})
				.catch(function(error) {
					console.log("Sign-out error");
				});
		}
	}

	if (e.classList.contains("login-item")) {
		// Branches login clicks to login.js
		console.log(e);
		LoginClick(e);
	}

	if (e.getAttribute("id") === "twit-icon") {
		// create usrObj Test
		user = firebase.auth().currentUser;
		if (debug) {
			console.log(
				"Rules click: " + e.getAttribute("id") + " was processed"
			);
		}
		// local user area
		user = firebase.auth().currentUser;
		initLocalUser(user.email);
		console.log(user);
		fbUid = user.uid;
		localUser.tsCreated = firebase.firestore.Timestamp.now().toMillis();
		localUser.tsUpdated = firebase.firestore.Timestamp.now().toMillis();

		// subject data
		initSubject("Math", 50);
		initSubject("Science", 70);
		initSubject("French", 20);
		initSubject("FSD Bootcamp", 150);

		for (var i = 0; i < subjectArr.length; i++) {
			localUser.subjects.push(subjectArr[i].subject);
			localUser.goals.push(subjectArr[i].goal);
			localUser.hours.push(0);
			localUser.subjectOpen.push(false);
			localUser.subjectStartTime.push(0);
		}
		createUser(fbUid);
	}
}

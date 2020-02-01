console.log("connected firebase.js");
// Firestore and Geolocation 

var db = firebase.firestore();

// sign out any residual user on fresh start
firebase.auth().signOut().then(function () {
    console.log("Sign-out successful.");
}).catch(function (error) {
    console.log("Sign-out error");
});

firebase.auth().onAuthStateChanged(function (user) { // User state listener 
    if (user) {
        hideModal();
        document.getElementById("goLogin").value = "Logout";
        document.getElementById("loginButton").value = "Logout";
        email = user.email;
        logActivity();
        if (debug) {
            console.log(user);
        }
    } else {
        document.getElementById("goLogin").value = "Login";
        document.getElementById("loginButton").value = "Login";

        //showModal();
        // No user is signed in.
    }
});

function logActivity() { // create and edit activity database
    let activityData = {};
    $.getJSON('https://ssl.geoplugin.net/json.gp?k=207167b5568cc2a4', function (data) {
            // loading object for activity creation of Firebase activity document  
            ipAddress = data.geoplugin_request;
            activityData = {
                city: data.geoplugin_city,
                region: data.geoplugin_region,
                regionCode: data.geoplugin_regionCode,
                country: data.geoplugin_countryName,
                countryCode: data.geoplugin_countryCode,
                continentCode: data.geoplugin_continentCode,
                dmaCode: parseInt(data.geoplugin_dmaCode),
                longitude: parseFloat(data.geoplugin_longitude),
                latitude: parseFloat(data.geoplugin_latitude),
                timezone: data.geoplugin_timezone,
                currencyCode: data.geoplugin_currencyCode,
                currencySymbol: data.geoplugin_currencySymbol,
                appName: navigator.appCodeName + "-" + navigator.appName,
                usrAgent: navigator.userAgent,
                tsCreated: firebase.firestore.FieldValue.serverTimestamp(),
                tsUpdated: firebase.firestore.FieldValue.serverTimestamp(),
                accessCount: 1
            }
        })
        .then(function () {
            const refActivityDoc = db.collection('activity').doc(ipAddress);
            refActivityDoc.get()
                .then(doc => {
                    if (doc.exists) { // activity doc for IP address exists (UPDATE)
                        refActivityDoc.update({
                                tsUpdated: firebase.firestore.Timestamp.now().toMillis(),
                                accessCount: firebase.firestore.FieldValue.increment(1)
                            })
                            .then(function () { // success logging
                                if (debug) {
                                    console.log("Activity document updated with IP: " + ipAddress);
                                }
                            })
                            .catch(function (error) { // error logging
                                console.error("Error updating activity document: ", error);
                            });
                    } else { // activity doc for IP address does NOT exists (CREATE)
                        refActivityDoc.set(activityData) // creates activity document
                            .then(function () { // success logging
                                if (debug) {
                                    console.log("Activity document written with IP: " + ipAddress);
                                }
                            })
                            .catch(function (error) { // error logging
                                console.error("Error adding activity document: ", error);
                            });
                    }
                    if (doc.exists) {
                        if (debug) {
                            console.log("YEP! It wrote to the Activity database!");
                        }
                    }
                })
        });
}

function createUser() {
    const refUserData = db.collection('userData').doc(fbUid);
    refUserData.get()
        .then(doc => {
            if (doc.exists) { // doc exists (UPDATE)
                refUserData.update({
                        tsUpdated: firebase.firestore.Timestamp.now().toMillis(),
                        accessCount: firebase.firestore.FieldValue.increment(1)
                    })
                    .then(function () { // success logging
                        if (debug) {
                            console.log("Activity document updated with IP: " + ipAddress);
                        }
                    })
                    .catch(function (error) { // error logging
                        console.error("Error updating activity document: ", error);
                    });
            } else { // activity doc for IP address does NOT exists (create)
                refUserData.set(localUser) // creates activity document
                    .then(function () { // success logging
                        if (debug) {
                            console.log("Activity document written with IP: " + ipAddress);
                        }
                    })
                    .catch(function (error) { // error logging
                        console.error("Error adding activity document: ", error);
                    });
            }
            if (doc.exists) {
                if (debug) {
                    console.log("YEP! It wrote to the User database!");
                }
            }
        });
}

function getUser(userName, ipAddress) {
    const refUsrDoc = db.collection('user').doc(ipAddress + ":" + userName);
    refUsrDoc.get()
        .then(doc => {
            if (doc.exists) { // user doc for IP address exists (update)
                refUsrDoc.update({

                        tsUpdated: firebase.firestore.Timestamp.now().toMillis(),
                        accessCount: firebase.firestore.FieldValue.increment(1)

                    })
                    .then(function () {
                        console.log("Activity document updated with IP: " + ipAddress);
                    })
                    .catch(function (error) {
                        console.error("Error updating activity document: ", error);
                    });
            } else { // activity doc for IP address does NOT exists (create)

                refUsrDoc.set(activityData)

                    .then(function () {
                        console.log("Activity document written with IP: " + ipAddress);
                    })
                    .catch(function (error) {
                        console.error("Error adding activity document: ", error);
                    });
            }
        })
}
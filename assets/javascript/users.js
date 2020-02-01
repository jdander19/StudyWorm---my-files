console.log("user.js connected");

let localUser = {};

function initLocalUser(email) {
  localUser.email = email;
  localUser.displayName = email.substring(0, email.indexOf("@"));
  localUser.ipAddress = geoplugin_request();
  localUser.city = geoplugin_city();
  localUser.state = geoplugin_regionName();
  localUser.location = [parseFloat(geoplugin_latitude()),
      parseFloat(geoplugin_longitude())
    ],
    localUser.subjects = new Array;
  localUser.goals = new Array;
  localUser.hours = new Array;
  localUser.subjectStartTime = new Array;
  localUser.subjectOpen = new Array;
  localUser.accessCount = 1;
  localUser.tsCreated = 0;
  localUser.tsUpdated = 0;
}
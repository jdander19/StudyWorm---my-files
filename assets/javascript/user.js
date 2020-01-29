console.log("user.js connected");

class User {
  constructor(email) {
    this.email = email;
    this.name // need
    this.password // need
    this.city;
    this.state;
    this.edLevel; // need
    this.ipAddress;
    this.create; // need timestamp
    this.lastActive; // need timestamp
    this.location;
  }
}

function initUser(email) {
  user = new User(email);
  user.ipAddress = geoplugin_request();
  user.city = geoplugin_city();
  user.state = geoplugin_regionName();
  user.location = [geoplugin_latitude(),
    geoplugin_longitude()
  ]
}

initUser('me@billstephan.com');
console.log(user);
var email = "billstephan@yahoo.com";
var password = "MY!Password2";

firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
  console.log(error.code);
  console.log(error.message);
});
var User = require('./models/user-model').User;

// var user = new User({
//     username: 'nozimy2' || ,
//     password: 'nozim2', 
//     firstName: 'Nozim2',
//     lastName: 'Y2'
// });
var user = {
  username: 'login' ,
  password: 'pswww', 
  firstName: 'FirstName',
  lastName: 'LastName',
  date1: new Date(1996, 01, 01),
  phone: '123456'
}

User.createNew(user, function(err, result){
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});

// user.save(function (err, user) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// });

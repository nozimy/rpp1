var crypto = require('crypto');
var async = require('async');
var util = require('util');

var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    phone: String,
    birthDate: {
        type: Date
    },
    hashedPassword: {
        type: String, select: false 
    },
    salt: {
        type: String, select: false 
    }
});

schema.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() { return this._plainPassword; });


schema.methods.checkPassword = function(password) {
    console.log('Сверяем пароли');
    console.log(password);
    console.log(this.encryptPassword(password));
    console.log(this.hashedPassword);
    return this.encryptPassword(password) === this.hashedPassword;
};

schema.statics.authorize = function(username, password, callback) {
    var User = this;

    async.waterfall([
        function(callback) {
            User.findOne({username: username}, function(err, user){
                callback(null, user);
                console.log('Нашли юзера по имени ' + util.inspect(user));
            });
        },
        function(user, callback) {
            console.log('Пользователь найден сверим пароли');
            if (user) {
                if (user.checkPassword(password)) {
                    console.log('Пароль совпал пароль!');
                    callback(null, user);
                } else {
                    console.log('Пароль НЕ совпал!');
                    callback(new AuthError("Пароль неверен"));
                }
            } else {
                console.log('Нет такого пользователя');
                callback(new AuthError("Нет такого пользователя или логин введен неверно"));
                /* var user = new User({username: username, password: password});
                 user.save(function(err) {
                 if (err) return callback(err);
                 callback(null, user);
                 }); */
            }
        }
    ], callback);
};

schema.statics.createNew = function(userSetup, callback) {
    var User = this;

    async.waterfall([
        function(callback) {
            User.findOne({username: userSetup.username}, callback); // Проверим существует ли уже такой пользователь
        },
        function(user, callback) {
            if (user) {
                // Если такой пользователь уже существует
                callback(new AuthError("Такой пользователь уже существует"));
            } else {
                //phone = phone || '';
                // Если такого пользователя еще нет в базе
                var user = new User({
                    username: userSetup.username,
                    password: userSetup.password, //userFields['passwordInput'],
                    firstName: userSetup.firstName || '', //userFields['firstNameInput'],
                    lastName: userSetup.lastName || '', //userFields['secondNameInput'],
                    birthDate: userSetup.birthDate, //userFields['birthDateInput'],
                    phone: userSetup.phone || ''
                });
                user.save(function(err) {
                    if (err) throw err;
                });
            }
        }
    ], callback);
};

exports.User = mongoose.model('User', schema);


function AuthError(message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, AuthError);

    this.message = message;
}
util.inherits(AuthError, Error);

AuthError.prototype.name = 'AuthError';

exports.AuthError = AuthError;
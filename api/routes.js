module.exports = function(app) {

    var mongojs = require('mongojs'),
        sha1 = require('sha1'),
        Q = require("q");

//routes gestion usuario
    var login = require('./routes/user/login');
    var alta = require('./routes/user/alta');

//db
    var db = mongojs('gestor',['usuarios']);


//lo relacionado con la gestion de usuario
//alta del usuario
    app.post('/user', function (req, res) {
        console.log(req.body);
        alta.alta(req.body, res, db, sha1);
    });

//login
    app.post('/user/login', function(req, res, next){
        login.login(req.body, res, next, db, sha1);
    });

};
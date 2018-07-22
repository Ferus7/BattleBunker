exports.login = function (body, res, next, db, sha1) {
    //busco uno en la 'tabla' usuarios
    if(body.email && body.password){
        db.usuarios.findOne({email: body.email.toLowerCase(), password: sha1(body.password)}, function (err, user) {
            if (user != null) {
                    console.log("usuario encontrado");
                    res.status(200);
                    res.json(user);
            } else {
                //si no existe devuelvo el error
                res.status(403);
                res.send('el usuario o la contraseña no son correctos');
            }
        });
    }else{
        res.status(418);
        res.send("Introduce los datos");
    }
};
exports.alta = function(body, res, db, sha1){
    body.email = body.email.toLowerCase();

    console.log(body);

    //busco a ver si ese correo ya esta en la base de datos
    db.usuarios.findOne({email: body.email}, function (err, usuario) {
        if(usuario != null){
            //si existe devuelvo un error
            console.log("ya existe un usuario con ese email");
            res.status(500);
            res.send('ya existe un usuario con ese email');
        }else{
            //miro que la password y el repetir password sean iguales
            if(body.password == body.password2){
                db.usuarios.insert({
                    email: body.email,
                    password: sha1(body.password)
                }, function (errUser, User) {
                    res.status(200);
                    res.json(User);
                });
            }else{
                res.status(418);
                res.send('pass2');
            }
        }
    });
};
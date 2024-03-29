const jwt = require('jsonwebtoken');



let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, valid) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }

        req.usuario = valid.usuario;
        next();

    });
}

let verificaAdmi_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }
}

let verificaTokenImg = (req, res, next) => {

    let token = req.query.token;

    jwt.verify(token, process.env.SEED, (err, valid) => {

        if (err) {
            res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }

        req.usuario = valid.usuario;
        next();

    });

}

module.exports = {
    verificaToken,
    verificaAdmi_Role,
    verificaTokenImg
}
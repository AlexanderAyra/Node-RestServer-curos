const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const app = express();


app.get('/usuario', (req, res) => {

    Usuario.find({})
        // .limit(5)
        // .skip(3)
        .exec((err, usuarioDB) => {

            if (err) {

                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({}, (err, total) => {

                res.json({
                    ok: true,
                    usuario: usuarioDB,
                    conteo: total
                });
            });
        });
});

app.post('/usuario', (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {

        if (err) {

            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {

            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

app.delete('/usuario/:id', (req, res) => {

    let id = req.params.id;
    let cambiarEstado = {
        estado: 'false'
    }

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    //     if (err) {

    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     }

    //     res.json({
    //         ok: true,
    //         usuario: usuarioBorrado
    //     });

    // });

    Usuario.findByIdAndUpdate(id, cambiarEstado, { new: true }, (err, usuarioDB) => {

        if (err) {

            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

module.exports = app;
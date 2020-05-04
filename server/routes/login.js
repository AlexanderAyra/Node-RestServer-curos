const express = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const app = express();

app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuaioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuaioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Email o Contraseña incorrectos'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, usuaioDB.password)) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Email o Contraseña incorrectos'
                }
            });

        }

        let token = jwt.sign({
            usuario: usuaioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            usuario: usuaioDB,
            token
        });

    });

});

module.exports = app;
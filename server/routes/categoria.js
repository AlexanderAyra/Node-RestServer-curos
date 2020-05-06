const express = require('express');
let { verificaToken } = require('../middlewares/autenticacion');
let _ = require('underscore');
let Categoria = require('../models/categoria');
const app = express();

//================================
// Mostrar todas las Categorias
//================================



app.get('/categoria', (req, res) => {

    Categoria.find({})
        .sort('descripcion')
        .populate('usuario')
        .exec((err, categorias) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!categorias) {
                res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categorias
            });

        });

});

//================================
// Mostrar una Categoria por ID
//================================

app.get('/categoria/:id', (req, res) => {

    let idss = req.params.id;

    Categoria.findById(idss, (err, categoria) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoria) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria
        });

    });

});

//================================
// Crea una Categoria
//================================

app.post('/categoria', verificaToken, (req, res) => {

    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoDB) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoDB
        });

    });

});

//================================
// Actualiza una Categoria
//================================

app.put('/categoria/:id', (req, res) => {

    let id = req.params.id;

    let body = _.pick(req.body, ['descripcion']);

    Categoria.findByIdAndUpdate(id, body, { new: true }, (err, actualizado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!actualizado) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            actualizado
        });

    });

});


//================================
// Elimina una categoria
//================================

app.delete('/categoria/:id', (req, res) => {

    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, borrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!borrado) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            borrado
        });

    });

});




module.exports = app;
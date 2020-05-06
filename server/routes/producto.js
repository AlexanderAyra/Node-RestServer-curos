const express = require('express');
const { verificaToken } = require('../middlewares/autenticacion');
let Producto = require('../models/producto');
const _ = require('underscore');
let app = express();

// ============================
// Obtener Productos
// ============================

app.get('/producto', (req, res) => {

    Producto.find({})
        .populate('usuario')
        .populate('categoria')
        .exec((err, productos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productos) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Producto.count({}, (e, cantidad) => {
                res.json({
                    ok: true,
                    productos,
                    Cantidad_Productos: cantidad
                });
            });

        });

});

// ============================
// Obtener un solo Producto
// ============================

app.get('/producto/:id', (req, res) => {

    let id = req.params.id;

    Producto.findById(id, (err, product) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Error al mandar el id del producto'
                }
            });
        }

        if (!product) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            product
        });

    });

});

// ============================
// Buscar Producto
// ============================

app.get('/producto/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate('categoria', 'nombre')
        .exec((err, productoDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoDB
            })

        })

})

// ============================
// Crear Productos
// ============================

app.post('/producto', verificaToken, (req, res) => {

    let body = req.body;

    let producto = new Producto({

        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id

    });

    producto.save((err, prodGuardado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!prodGuardado) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: prodGuardado
        });

    });

});

// ============================
// Actualizar Productos
// ============================

app.put('/producto/:id', (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'precioUni', 'descripcion', 'disponible', 'categoria', 'usuario'])

    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, actualizado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!actualizado) {
            return res.status(400).json({
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

// ============================
// Borrar Productos
// ============================

app.delete('/producto/:id', (req, res) => {

    let id = req.params.id;
    let cambiarEstado = {
        disponible: 'false',
    }

    Producto.findByIdAndUpdate(id, cambiarEstado, { new: true }, (err, CamEstado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!CamEstado) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            CamEstado
        });

    });

});

module.exports = app;
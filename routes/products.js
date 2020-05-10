const express = require('express'),
    router = express.Router(),
    Product = require('../models/product'),
    authenticateJWT = require('../middleware/authenticateJWT');

/* Products CRUD */
router.post('/', authenticateJWT, (req, res, next) => {
    let body = req.body;
    let {name, brand, description, price, imageUrl, type} = body;
    let product = new Product({name, brand, description, price, imageUrl, type});
    product.save((err, newProduct) => {
        if (err) {
            return res.status(400).json(err);
        }
        res.json(newProduct);
    });
});

router.get('/', (req, res, next) => {
    console.log(req);
    Product.find().lean().exec((err, product) => {
        return res.json(product);
    });
});

router.get('/:id', (req, res, next) => {
    Product.findOne({productId: req.params.id}).lean().exec((err, product) => {
        if (err) {
            return res.status(400).json(product);
        }
        return res.json(product);
    });
});

router.put('/:id', authenticateJWT, (req, res, next) => {
    Product.findOneAndUpdate({productId: req.params.id}, {$set: req.body}, {new: true}, (err, product) => {
        if (err) {
            return res.status(400).json(err);
        }
        return res.json(product);
    });
});

router.delete('/:id', authenticateJWT, (req, res, next) => {
    Product.findOneAndRemove({productId: req.params.id}, {}, (err, product) => {
        if (err) {
            return res.status(400).json(err);
        }
        return res.status(204).json({});
    });
});


module.exports = router;

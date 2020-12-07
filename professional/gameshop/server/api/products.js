const express = require('express');
const productsRouter = express.Router();

const sqlite = require('sqlite3');
const db = new sqlite.Database('./sklep.db');

// const monsters = {'1':{ type: 'werewolf' }, '2':{ type: 'hydra' }, '3':{ type: 'chupacabra' }};

productsRouter.param('productId', (req, res, next, productId) => {
    const sql = "SELECT * FROM gry where gry.id_gry = $productId";
    const values = {$productId: productId};

    db.get(sql, values, (err, product) => {
        if(err)
            next(err)
        else if(product){
            req.product = product;
            next();
        } else {
            res.sendStatus(404);
        }
    });
});

productsRouter.get('', (req, res, next) => {
    db.all('SELECT * FROM gry', 
        (err, products) => {
            if(err) 
                next(err)
            else 
                res.status(200).json({products: products});
        });
//    res.send(monsters);
});

productsRouter.get('/:productId', (req, res, next) => {
    res.status(200).json({product: req.product});
    // res.send(monsters[req.params.id]);
});

productsRouter.post('/', (req, res, next) => {
    const   title = req.body.title,
            titleInEnglish = req.body.titleInEnglish || '',
            publishDate = req.body.publishDate || '1900-01-01',  
            description = req.body.description || '',
            age = req.body.age || 0,
            extension = req.body.extension || 0,
            price = req.body.price || 0,
            available = req.body.available || 0;
    const sql = 'INSERT INTO gry (tytul,tytul_angielski, data_wydania, opis, kategoria_wiekowa, czy_dodatek, cena_podstawowa, czy_dostepna) ' +
                'VALUES ($title, $titleInEnglish, $publishDate, $description, $age, $extension, $price, $available)';
    const values = {
        $title: title,
        $titleInEnglish: titleInEnglish,
        $publishDate: publishDate,  
        $description: description,
        $age: age,
        $extension: extension,
        $price: price,
        $available: available
    };

    if(!title || !publishDate || !price)
        res.sendStatus(400);

    db.run(sql, values, function(err) {
        if(err)
            next(err)
        else {
            db.get(`SELECT * FROM gry WHERE id_gry = ${this.lastID}`, (err, product) => {
                res.status(201).json({product: product});
            });
        }
    });
    
    // const receivedExpression = createElement('expressions', req.query);
});

productsRouter.put('/:productId', (req, res, next) => {
    const   title = req.body.title,
            titleInEnglish = req.body.titleInEnglish || '',
            publishDate = req.body.publishDate || '1900-01-01',  
            description = req.body.description || '',
            age = req.body.age || 0,
            extension = req.body.extension || 0,
            price = req.body.price || 1,
            available = req.body.available || 0;
    const sql = 'UPDATE gry SET tytul = $title, tytul_angielski = $titleInEnglish, data_wydania = $publishDate, opis = $description, kategoria_wiekowa = $age, czy_dodatek = $extension, cena_podstawowa = $price, czy_dostepna = $available ' + 
        'WHERE gry.id_gry = $productId';
    const values = {
        $title: title,
        $titleInEnglish: titleInEnglish,
        $publishDate: publishDate,  
        $description: description,
        $age: age,
        $extension: extension,
        $price: price,
        $available: available,
        $productId: req.params.productId
    };

    if(!title || !publishDate || !price)
        res.sendStatus(400);

    db.run(sql, values, (err) => {
        if(err)
            next(err);
        else {
            db.get(`SELECT * FROM gry WHERE gry.id_gry = ${req.params.productId}`, (err, product) => {
                res.status(200).json({product: product});
            });
        }
    });

    // const productQuery = req.query;
    // monsters[req.params.productId] = productQuery;
    // res.send(monsters[req.params.productId]);
});

productsRouter.delete('/:productId', (req, res, next) => {
    const sql = 'DELETE FROM gry WHERE id_gry = $productId';
    const values = { 
        $productId: req.params.productId
    };

    db.run(sql, values, (err) => {
        if(err)
            next(err);
        else {
            res.status(204).send();
        }
    });
});

module.exports = productsRouter;

const express = require('express');
const wishlistsRouter = express.Router();

const monsters = {'1':{ type: 'werewolf' }, '2':{ type: 'hydra' }, '3':{ type: 'chupacabra' }};

wishlistsRouter.get('', (req, res, next) => {
    res.send(monsters);
});

wishlistsRouter.get('/:id', (req, res, next) => {
    res.send(monsters[req.params.id]);
});

wishlistsRouter.put('/:id', (req, res, next) => {
    const wishlistQuery = req.query;
    monsters[req.params.id] = wishlistQuery;
    res.send(monsters[req.params.id]);
});

module.exports = wishlistsRouter;
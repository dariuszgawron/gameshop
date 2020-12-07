const express = require('express');
const ordersRouter = express.Router();

const monsters = {'1':{ type: 'werewolf' }, '2':{ type: 'hydra' }, '3':{ type: 'chupacabra' }};

ordersRouter.get('', (req, res, next) => {
    res.send(monsters);
});

ordersRouter.get('/:id', (req, res, next) => {
    res.send(monsters[req.params.id]);
});

ordersRouter.put('/:id', (req, res, next) => {
    const ordersQuery = req.query;
    monsters[req.params.id] = ordersQuery;
    res.send(monsters[req.params.id]);
});

module.exports = ordersRouter;
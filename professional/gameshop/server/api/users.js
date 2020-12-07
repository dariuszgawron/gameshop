const express = require('express');
const usersRouter = express.Router();

const monsters = {'1':{ type: 'werewolf' }, '2':{ type: 'hydra' }, '3':{ type: 'chupacabra' }};

usersRouter.get('', (req, res, next) => {
    res.send(monsters);
});

usersRouter.get('/:id', (req, res, next) => {
    res.send(monsters[req.params.id]);
});

usersRouter.put('/:id', (req, res, next) => {
    const userQuery = req.query;
    monsters[req.params.id] = userQuery;
    res.send(monsters[req.params.id]);
});

module.exports = usersRouter;
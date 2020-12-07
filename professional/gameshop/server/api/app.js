const express = require("express");
const app = express();
const usersRouter = express.Router();
app.use('/users',usersRouter);

const PORT = process.env.PORT || 4001;
app.use(express.static('public')); // css, js

const monsters = [{ type: 'werewolf' }, { type: 'hydra' }, { type: 'chupacabra' }];

// app.get("/users", (req, res, next) => {
//     // console.log(req);
//     // res.json(["Tony","Lisa","Michael","Ginger","Food"]);
//     // send albo json można wysłać odpowiedź
//     res.json(monsters);
// });

usersRouter.get('', (req, res, next) => {
    res.json(monsters);
});

app.get('/users/:id', (req,res,next) => {
    const monsterItem = monsters[req.params.id];
    if(monsterItem)
        res.json(monsters[req.params.id]);
    else
        res.status(404).send('Monster not found');
})

const monsters1 = { '1': { name: 'cerberus', age: '4'  } };
app.put('/users/:id', (req,res,next) => {
    const monsterUpdate = req.params;
    monsters1[req.params.id]=monsterUpdate;
    res.send(monsters1[req.params.id]);

//     const expressionIndex = getIndexById(req.params.id,monsters1);
//     if (expressionIndex !== -1) {
//         updateElement(req.params.id, req.query, expressions);
//         res.send(expressions[expressionIndex]);
//     } else {
//         res.status(404).send();
//     }

});

app.post('/users', (req, res, next) => {
    const receivedExpression = createElement('expressions', req.query);
  if (receivedExpression) {
    expressions.push(receivedExpression);
    res.status(201).send(receivedExpression);
  } else {
    res.status(400).send();
  }
});

app.delete('/users/:id', (req, res, next) => {
    const exist = getIndexById(req.params.id, expressions);
  if(exist!==-1) {
    const index = getIndexById(req.params.id, expressions);
    expressions.splice(index);
    res.status(204).send(req.params.id);
  } else {
    res.status(404).send();
  }

});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
   });

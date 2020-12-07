const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 4001;
app.use(express.static('public'));

app.use(cors());
app.use(express.json());

const usersRouter = require('./users.js');
const productsRouter = require('./products');
const ordersRouter = require('./orders.js');
const wishlistsRouter = require('./wishlists.js');

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/wishlists', wishlistsRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
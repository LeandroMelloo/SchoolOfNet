// index.js -> lidará com nossas rotas.
module.exports = (app) => {
// app -> terá uma instância do 'express'.
// será definido o caminho da minhas rotas.
app.use('/', require('./routes/home'));
};
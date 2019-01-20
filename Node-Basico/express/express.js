var express = require('express');

var app = express();

// app.get -> localhost:3000 -> retorna um HTML.
app.get('/', function(req, res) {
    res.send('<h1>Hello from express</h1>');
});

// app.get -> localhost:3000/hello -> retorna um JSON.
app.get('/hello', function(req, res) {
    res.json({
        message:'This is my router'
    });
});

// app.get -> localhost:3000/hello:name -> passando um parametro, acesso um objeto de request.
app.get('/hello:name', function(req, res) {
    res.json({
        message:'This is my param' + req.params.name // concatenando uam requisição com parametros name na messagem.
    });
});

app.listen(3000, function() {
    console.log('Servidor rodando na porta 3000');
});
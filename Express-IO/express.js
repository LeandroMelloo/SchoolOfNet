var app = require('express.io')();
app.http().io(); // http() -> servidor http, io() -> servidor WEbSocket.

app.get('/', function(req, res) {
   res.sendfile(__dirname.concat('/index.html')); 
});

app.listen(3000, function() {
    console.log('Servidor rodando na porta 3000')
});
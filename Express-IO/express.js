var app = require('express.io')();
// var fs = require('fs');

/* var httpsOptions = {
    certificate: fs.readFileSync(__dirname.concat('certificate')),
    key        : fs.readFileSync(__dirname.concat('key_certificate'))
}*/

// quando é colocado https, o websocket reconhece que é uma conexão segura.
app.http().io(); // https() -> servidor https, io() -> servidor WEbSocket. //httpsOptions.

/*app.io.route('init', function(req) {
    req.io.emit('index:say_hello', {
        message: 'Hello School of net Express.io'
    });
});*/

app.io.route('init', function(req) {
    console.log(req.data);
    req.io.respond({
        message: 'Hello School of net Express.io' + req.data.name,
        number: req.data.number
    });
});

app.get('/', function(req, res) {
   res.sendfile(__dirname.concat('/index.html')); 
});

app.listen(3000, function() {
    console.log('Servidor rodando na porta 3000')
});
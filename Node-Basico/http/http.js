var http = require('http');
var handle = require('./handle');
var s = require('./name');

console.log(s.name());

const server = http.createServer(handle);

server.listen(3000, function() {
    console.log('Servidor rodando na porta 3000')
})

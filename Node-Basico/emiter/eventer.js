var http = require('http');
var handle = require('./../http/handle');
var events = require('events');
var emiter = new events.EventEmitter();

emiter.on('say', say); 

function say() {
    console.log('Im saying...');
}

emiter.emit('say'); //emitindado a função.

const server = http.createServer(handle);

server.listen(3000, function() {
    console.log('Servidor rodando na porta 3000')
})
var fs = require('fs');

// fs.writeFile -> cria o arquivo data.txt e insere o valor 'Hello world from Node.JS!!!'. 
fs.writeFile('data.txt', 'Hello world from Node.JS!!!', function(erro){
    if(erro) {
        throw erro;
    }
});

// fs.readFile -> lê o arquivo data.txt e imprime no console o data.toString e faz o tratamento de erro.
fs.readFile('data.txt', function(erro, data) {
    if(erro) {
        throw erro;
    }
        console.log(data.toString('utf8'));
});

// fs.readdir -> lista todos os diretorios do projeto.
fs.readdir('./../../Node-Basico', function(erro, files) {
    if(erro) {
        throw erro;
    }
    for (var file in files) {
        console.log(files[file]);
    }
})

// fs.readdirSync -> ler os diretorios de forma assincrona.
fs.readdirSync('./../http').filter(function(file) {
    return (file.endsWith('.js'))// listar todos os arquivos com final .js, através do endsWith.
    })
    .forEach(function(file) {
        console.log(file);
    });
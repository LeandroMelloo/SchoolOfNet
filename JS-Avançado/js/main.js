// Created by Leandro on 11/01/2019 - método principal main.js //

// variavel list
var lista = [
    {"id":"1", "descricao":"feijão", "quantidade":"1", "valor":"1.10"},
    {"id":"2", "descricao":"arroz", "quantidade":"2", "valor":"1.10"},
    {"id":"3", "descricao":"macarrão", "quantidade":"3", "valor":"1.10"}
];

// função getTotal, receberá a variavel list como parâmetro.
function getTotal(lista) {
    var total = 0;
    for (var chave in lista){
        total += lista[chave].valor * lista[chave].quantidade // acumular a variavel "total" o valor de quantidade * valor.
    }
    document.getElementById("totalValue").innerHTML = formatValor(total);
}
getTotal(); // executa a função getTotal.

// função que insere valores a lista na tabela.
function setList(lista) {
    var table = '<thead><tr><td>Id</td><td>Descrição</td><td>Quantidade</td><td>Valor</td><td>Ação</td></tr></thead><tbody>';
    for(var chave in lista){
        table += ' <tr><td>'+ lista[chave].id +'</td><td>'+ formatDesc(lista[chave].descricao) +'</td><td>'+ formatQuantidade(lista[chave].quantidade) +'</td><td>'+ formatValor(lista[chave].valor) +'</td><td><button class="btn btn-default" onclick="setUpdate ('+chave+');">Editar</button>  <button class="btn btn-default" onclick="deleteData ('+chave+');">Deletar</button></td></tr>';
    }
    table += '</tbody>';
    document.getElementById("listTable").innerHTML = table; // atribuindo valores a tag <table>.
    getTotal(lista);
    salvarListaStorage(lista);
}

// função para fazer o tratamento do formato da descrição.
function formatDesc(descricao) {
    var str = descricao.toLowerCase(); // toLowerCase -> já traz formatatdo o texto inserido pelo usuario em minusculo.
    str = str.charAt(0).toUpperCase() + str.slice(1); // CharAt -> trás a primeira posição da string. No caso, Feijão -> trará f. toUpperCase -> colocará a letra f minuscula em F no formato maisculo, slice(1) -> vai trazer todas as letras apartir da posição 1.
    return str;
}

// função para fazer o tratamento do formato da quantidade.
function formatQuantidade(quantidade) {
    return parseInt(quantidade);
}

// função para fazer o tratamento do formato do valor.
function formatValor(valor) {
    var str = parseFloat(valor).toFixed(2) + ""; // convertendo o valor de String para Float, toFixed -> vai pegar duas casas decimais e depois concatena e transforma novamente em String.
    str = str.replace("." , ","); // replace("." , ",") -> vai converter tudo que é "." em ",".
    str = "$ " + str; // $ vai concatenar com o restante str.
    return str;
}

// função para adicionar valores na tabela.
function addData() {
    if(!validacao()) {
        return;
    }
    var formId = document.getElementById("form_id").value;
    var formDescricao = document.getElementById("form_descricao").value;
    var formQuantidade = document.getElementById("form_quantidade").value;
    var formValor = document.getElementById("form_valor").value;

    lista.unshift({"id": formId, "descricao": formDescricao, "quantidade":formQuantidade, "valor": formValor});
    setList(lista); // adiciona os elementos que o usuario digitar na tabela, através da função addData(), dentro da função setList().
}

// função para atualiza e editar valores da tabela.
function setUpdate(id) {
    var obj = lista[id];
    document.getElementById("form_id").value = obj.id;
    document.getElementById("form_descricao").value = obj.descricao;
    document.getElementById("form_quantidade").value = obj.quantidade;
    document.getElementById("form_valor").value = obj.valor;
    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("btnAdd").style.display = "none";
    document.getElementById("inputIdUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="'+id+'">';
    
}

// funcão para limpar o formulario da tabela.
function resetForm(id) {
    var obj = lista[id];
    document.getElementById("form_id").value = "";
    document.getElementById("form_descricao").value = "";
    document.getElementById("form_quantidade").value = "";
    document.getElementById("form_valor").value = "";
    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";
    document.getElementById("inputIdUpdate").innerHTML = "";
    document.getElementById("erro").style.display = "none";
}

// função para atualizar o formulario da tabela.
function updateData() {
    if(!validacao()) {
        return;
    }
    var id = document.getElementById("idUpdate").value;
    var Id = document.getElementById("form_id").value;
    var descricao = document.getElementById("form_descricao").value;
    var quantidade = document.getElementById("form_quantidade").value;
    var valor = document.getElementById("form_valor").value;

    lista[id] = {"id": Id, "descricao": descricao, "quantidade": quantidade, "valor": valor}
    resetForm();// executa a função resetForm.
    setList(lista);// executa a função setList.
}

// função para deletar o item da tabela. Método 'confirm', manda um alerta para o usuario se realmente ele quer deletar o registro.
function deleteData(id) {
    if(confirm('Deseja realmente deletar o item?')) {
        if(id === lista.length - 1) {
            lista.pop(); // pop => limpa o último registro.
        } else if (id === 0) {
            lista.shift(); // shift => limpa o primeiro registro.
        } else {
            var arrAuxIni = lista.slice(0, id);
            var arrAuxEnd = lista.slice(id + 1);
            lista = arrAuxIni.concat(arrAuxEnd);
        }
        setList(lista);
    }
}

// função de validação da tabela.
function validacao() {
    var id = document.getElementById("form_id").value;
    var descricao = document.getElementById("form_descricao").value;
    var quantidade = document.getElementById("form_quantidade").value;
    var valor = document.getElementById("form_valor").value;
    var erro = "";
    document.getElementById("erro").style.display = "none";

    if(id === "") {
        erro += '<p>Digite seu id</p>'
    } else if(id != parseInt(id)) {
        erro += '<p>Formato de validacao incorreta do ID</p>'
    }
    if(descricao === "") {
        erro += '<p>Digite sua descrição</p>'
    }
    if(quantidade === "") {
        erro += '<p>Digite sua quantidade</p>'
    } else if(quantidade != parseInt(quantidade)) {
        erro += '<p>Formato de validacao incorreta da quantidade</p>'
    }
    if(valor === "") {
        erro += '<p>Digite seu valor</p>'
    } else if(valor != parseFloat(valor)) {
        erro += '<p>Formato de validacao incorreta do valor</p>'
    }
    if(erro != "") {
        document.getElementById("erro").style.display = "block";
        document.getElementById("erro").style.backgroundColor = "rgba(85, 85, 85, 0.3)";
        document.getElementById("erro").style.color = "white";
        document.getElementById("erro").style.padding = "10px";
        document.getElementById("erro").style.margin = "10px";
        document.getElementById("erro").style.borderRadius = "13px";
        document.getElementById("erro").innerHTML = "<h3>Erro:</h3>" + erro;
        return 0;
    } else {
        return 1;
    }
}

// função para deletar a lista da tabela.
function deleteLista(){
    if(confirm("Gostaria realmete de delatar a lista?")){
        lista = []; // retorna um array vazio.
        setList(lista); // setando na lista.
    }
}

// função para salvar a lista no local storage.
function salvarListaStorage(lista) {
    var jsonStr = JSON.stringify(lista); // transforma um array em string, pois o local Storage so aceita letras.
    localStorage.setItem("lista",jsonStr);
}

// função de inicialização.
function iniciaListaStorage() {
    var testeLista = localStorage.getItem("lista");
    if(testeLista) {
        lista = JSON.parse(testeLista);
    }
    setList(lista);
}

iniciaListaStorage(); // executa a função iniciaListaStorage.


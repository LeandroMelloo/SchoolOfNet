// Created by Leandro on 11/01/2019 - método de configuração da página html //

// function setConfig.
function setConfig () {
    var texts = {
        "title": "Shopping Control"
    };
    document.title = texts.title // atribuindo "Shopping Control" a tag <title>.
    document.getElementById("navTitle").innerHTML = texts.title; // atribuindo "Shopping Control" a tag <a>.
};

// executando a function setConfig.
setConfig();
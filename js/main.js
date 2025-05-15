'use strict'

import { getContatos, getContatosPorNome, postContato } from "./contato.js"
import { uploadImageToAzure } from "./uploadImageToAzure.js"

function criarCard (contato){
    const container = document.getElementById('container')
    const card = document.createElement('div')
    card.classList.add('card-contato')
    card.innerHTML = `
        <img src="${contato.foto}" alt="">
        <h2>${contato.nome}</h2>
        <p>${contato.celular}</p>
    `
    container.appendChild(card)
}

async function exibirContatos(){
    const contatos = await getContatos()
    const container =document.getElementById('container')
    container.replaceChildren()
    contatos.forEach( criarCard )
}

async function exibirPesquisa(evento){
    if (evento.key == 'Enter'){

        const contatos = await getContatosPorNome(evento.target.value)
        document,getElementById('container').replaceChildren()
        contatos.forEach(criarCard)
    }
}

function preview ({target}) {
    document.getElementById('preview-image')
        .src = URL.createObjectURL(target.files[0])
}

function cadastrarContato (){
    document.querySelector('main').className = 'form-show'
}

function voltarHome (){
    document.querySelector('main').className = 'card-show'
}

async function salvarContato(){

    const uploadParams = {
        file: document.getElementById('foto').files[0],
        storageAccount: 'storege4',
        sasToken: 'sp=racwl&st=2025-05-15T17:26:20Z&se=2025-05-15T19:00:00Z&sv=2024-11-04&sr=c&sig=BWdHPwHbp1X5vWIiGz%2FR5%2BIPMgX9w6geZmbVJe4I%2FQQ%3D',
        containerName: 'fotos',
    };

    const contato = {
        "nome": document.getElementById('nome').value,
        "celular": document.getElementById('celular').value,
        "foto": await uploadImageToAzure(uploadParams),
        "email": document.getElementById('email').value,
        "endereco": document.getElementById('endereco').value,
        "cidade": document.getElementById('cidade').value
    }

    if(await postContato(contato)){
        await exibirContatos()
        voltarHome()
        alert('Cadastro realizado com sucesso!')
    }
}

exibirContatos()

document.getElementById('pesquisa')
        .addEventListener('keydown', exibirPesquisa)

document.getElementById('novo-contato')
        .addEventListener('click', cadastrarContato)

document.getElementById('cancelar')
        .addEventListener('click', voltarHome)

document.getElementById('salvar')
        .addEventListener('click', salvarContato)

document.getElementById('foto')
        .addEventListener('change', preview)
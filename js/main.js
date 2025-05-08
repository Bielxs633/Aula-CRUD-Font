'use strict'

import { getContatos, getContatosNome } from "./contato.js"

function criarCard (contato){
    // console.log(contato)
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
    // console.log(contatos)
    contatos.forEach( criarCard )
}

async function exibirPesquisa(evento){
    if (evento.key == 'Enter'){
        // console.log(evento)
        // console.log(evento.target.value)
        // console.log('Olá Mundo')
        const contatos = await getContatosNome(evento.target.value)
        document,getElementById('container').replaceChildren()
        contatos.forEach(criarCard)
    }
}

function cadastrarContato (){
    document.querySelector('main').className = 'form-show'
}

function voltarHome (){
    document.querySelector('main').className = 'card-show'
}

exibirContatos()
// getContatos()

document.getElementById('pesquisa')
        .addEventListener('keydown', exibirPesquisa)

document.getElementById('novo-contato')
        .addEventListener('click', cadastrarContato)

document.getElementById('cancelar')
        .addEventListener('click', voltarHome)
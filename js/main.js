'use strict'

import { getContatos } from "./contato.js"

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

exibirContatos()
// getContatos()
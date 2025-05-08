'use strict'

import { getContatos, getContatosNome, postContato } from "./contato.js"

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

async function salvarContato () {
    const contato = {
            "nome": document.getElementById('nome').value,
            "celular": document.getElementById('celular').value,
            "foto": document.getElementById('foto').value,
            "email": document.getElementById('email').value,
            "endereco": document.getElementById('endereco').value,
            "cidade": document.getElementById('cidade').value
        }

        if (await postContato(contato)){
            await exibirContatos()
            voltarHome()
            alert ('Cadastro realizado com sucesso!!!')
        }
        
}

exibirContatos()
// getContatos()

document.getElementById('pesquisa')
        .addEventListener('keydown', exibirPesquisa)

document.getElementById('novo-contato')
        .addEventListener('click', cadastrarContato)

document.getElementById('cancelar')
        .addEventListener('click', voltarHome)

document.getElementById('salvar')
        .addEventListener('click', salvarContato)
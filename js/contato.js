'use strict'

export async function postContato(contato) {
    const url = 'https://bakcend-fecaf-render.onrender.com/contatos'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contato)
    }
    const response = await fetch (url, options)

    return response.ok
}

export async function getContatos(){
    const url = 'https://bakcend-fecaf-render.onrender.com/contatos'
    const response = await fetch(url)
    const data = await response.json()
    // console.log(data)
    return data
}

export async function getContatosNome(nome){
    const url = `https://bakcend-fecaf-render.onrender.com/contatos?nome_like=^${nome}`
    const response = await fetch(url)
    const data = await response.json()
    // console.log(data)
    return data
}

export async function getContato(id){
    const url = `https://bakcend-fecaf-render.onrender.com/contatos/${id}`
    const response = await fetch(url)
    const data = await response.json()
    // console.log(data)
    return data

}

export async function putContato(id, contato){
    const url = `https://bakcend-fecaf-render.onrender.com/contatos/${id}`
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contato)
    }
    const response = await fetch(url, options)
    return response.ok
}

export async function deleteContato(id){
    const url = `https://bakcend-fecaf-render.onrender.com/contatos/${id}`
    const options = {
        method: 'DELETE'
    }
    const response = await fetch(url, options)
    return response.ok
}

// const novoContato = {
//         "nome": "Gabriel",
//         "celular": "11 999999999",
//         "foto": "gabriel.png",
//         "email": "gabriel@gmail.com",
//         "endereco": "Av. São Joaquim, 234",
//         "cidade": "Jandira"
// }
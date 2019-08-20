const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const notFound = require('../middleware/not-found');

let db = {};
let sequence = 0;


router.post('/', checkAuth, (request, response) => {
  //corpo da mensagem  
  const newClient = {
    id: ++sequence,   
    name: "Nome do Cliente",
    CPF: "555.555.555-55",
    address: "Rua dos Bobos Número 0",
    dataRegistro: Date(Date.now())
       
  };

  db[newClient.id] = newClient;

  response.status(201).json(newClient);
 
  response.status(201).json({
    message: 'Cliente cadastrado com sucesso',
    newClient
  });
});


router.get('/', (request, response) => {
  const toArray = key => db[key];
  const client = Object.keys(db).map(toArray);
 
  client.length
    ? response.json(client)
    : response.status(204).send();
 });
 /*
router.get('/', (request, response) => {
  response.status(200).json(db);
});*/

router.get('/:clientId', (request, response) => {
  const client = db[request.params.clientId];
  client
    ? response.json(client)
    : notFound(request, response)
 });
 /*
router.get('/:taskId', (request, response) => {
  const id = request.params.taskId;
  response.status(200).json({
    message: `Task with ID = ${id} was fetched`
  });
});*/

router.patch('/:clientId', checkAuth, (request, response) => {
  const client = db[request.params.clientId];
  //const hasValue = request.body.recebedorComprador != null
  if(client) {    
    client.name = request.body.name || client.name;
    client.CPF = request.body.cpf || client.cpf;
    client.address = request.body.address || client.address;
    client.dataRegistro = request.body.dataRegistro || client.dataRegistro;  
    response.json(client);
  } else {
    notFound(request, response);
  }
});
 
/*
router.patch('/:taskId', checkAuth, (request, response) => {
  const id = request.params.taskId;
  response.status(200).json({
    message: `Task with ID = ${id} was updated`
  });
});*/

router.delete('/:clientId', checkAuth, (request, response) => {
  const client = db[request.params.clientId];
  if(client) {
    delete db[client.id];
    response.status(200).json({
      message: 'Deleted'
    });
  } else {
    notFound(request, response);
  }
 });
 
/*
router.delete('/:taskId', checkAuth, (request, response) => {
  const id = request.params.taskId;
  response.status(200).json({
    message: `Task with ID = ${id} was deleted`
  });
});*/

module.exports = router;
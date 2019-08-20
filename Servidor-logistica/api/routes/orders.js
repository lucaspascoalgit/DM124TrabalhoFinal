const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const notFound = require('../middleware/not-found');
const cadastroEntrega = require('../middleware/cadastro-entrega');

//const app = require('../../app');

let db = {};
let sequence = 0;


router.post('/', checkAuth, (request, response) => {
  //corpo da mensagem  
  const newOrder = {
    id: ++sequence,    
    idCliente: request.body.idCliente,
    products: [{id:"1",
               quantidade:10 },
               {id:"2",
               quantidade:10 }],    
    status: "aberto",
    dataHora: Date(Date.now()),
       
  };

  db[newOrder.id] = newOrder;

  response.status(201).json(newOrder);
 
  response.status(201).json({
    message: 'Entrega cadastrada com sucesso',
    newOrder
  });
});


router.get('/', (request, response) => {
  const toArray = key => db[key];
  const orders = Object.keys(db).map(toArray);
 
  orders.length
    ? response.json(orders)
    : response.status(204).send();
 });

 router.get('/entregas', (request, response) => {
     
    cadastroEntrega(666,"Teste666");
    response.status(201).send();
    /*
    const https = require('http')

    const data = JSON.stringify({
        idPedido: 1,
        idCliente: "1234",
        nomeRecebedor: "Nome do recebedor",
        cpf: "cpf recebedor",
        recebedorComprador: false,
        dataHora: 1566238820971,
        localizacao: "Localização GPS"
    });
    
    const options = {
      hostname: 'localhost',
      port: 8080,
      //path: '/api/entregas/semAuth',
      path: '/api/entregas',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'ZG0xMjQ6YWx1bm9pbmF0ZWw='
        //'Content-Length': data.length
      }
    };
    
    const req = https.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`)
      response.status(res.statusCode).send();
      res.on('data', (d) => {
        process.stdout.write(d);
      });
    });
    
    req.on('error', (error) => {
      console.error(error);
    });
    
    req.write(data)
    req.end()
     //fim post outra api
 /*   const toArray = key => db[key];
    const orders = Object.keys(db).map(toArray);
   
    orders.length
      ? response.json(orders)
      : response.status(204).send();*/
   });
 /*
router.get('/', (request, response) => {
  response.status(200).json(db);
});*/

router.get('/:orderId', (request, response) => {
  const order = db[request.params.orderId];
  order
    ? response.json(order)
    : notFound(request, response)
 });
 /*
router.get('/:taskId', (request, response) => {
  const id = request.params.taskId;
  response.status(200).json({
    message: `Task with ID = ${id} was fetched`
  });
});*/

router.patch('/:orderId', checkAuth, (request, response) => {
  const order = db[request.params.orderId];
  const hasValue = request.body.dataHora != null
  if(order) {    
    //order.id = request.body.id || order.id;
    order.idCliente = request.body.idCliente || order.idCliente;
    order.products = request.body.products || order.products;
    order.status = request.body.status || order.status;    
    order.dataHora = hasValue ? Date(Date.now()) : order.dataHora;
    response.json(order);
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

router.delete('/:orderId', checkAuth, (request, response) => {
  const order = db[request.params.orderId];
  if(order) {
    delete db[order.id];
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
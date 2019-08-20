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
    
    //colocar o id do cliente e do pedido dentro de casdastro de entrega 
    //response.status(cadastroEntrega(666,"Teste666")).send();
    response.json(cadastroEntrega(666,"Teste666"));

   });

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

    if (order.status === "fechado"){
      cadastroEntrega(order.id,order.idCliente)
    }
    
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
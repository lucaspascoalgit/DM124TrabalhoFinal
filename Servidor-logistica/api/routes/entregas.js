const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const notFound = require('../middleware/not-found');

let db = {};
let sequence = 0;


router.post('/', checkAuth, (request, response) => {
  //corpo da mensagem  
  const newEntrega = {
    id: ++sequence,
    idPedido: request.body.idPedido,
    idCliente: request.body.idCliente,
    nomeRecebedor: "request.body.nomeRecebedor",
    cpf: "request.body.cpf",
    recebedorComprador: false,
    dataHora: Date(Date.now()),
    localizacao:"Localização GPS - GPS desconectado"    
  };

  db[newEntrega.id] = newEntrega;

  response.status(201).json(newEntrega);
 
  response.status(201).json({
    message: 'Entrega cadastrada com sucesso',
    newEntrega
  });
});

//Sem auth ***********************************************
router.post('/semAuth/', (request, response) => {
  //corpo da mensagem  
  const newEntrega = {
    id: ++sequence,
    idPedido: request.body.idPedido,
    idCliente: request.body.idCliente,
    nomeRecebedor: "request.body.nomeRecebedor",
    cpf: "request.body.cpf",
    recebedorComprador: false,
    dataHora: Date(Date.now()),
    localizacao:"Localização GPS - GPS desconectado"    
  };

  db[newEntrega.id] = newEntrega;

  response.status(201).json(newEntrega);
 
  response.status(201).json({
    message: 'Entrega cadastrada com sucesso',
    newEntrega
  });
});
//Fim sem auth *******************************************
router.get('/', (request, response) => {
  const toArray = key => db[key];
  const entregas = Object.keys(db).map(toArray);
 
  entregas.length
    ? response.json(entregas)
    : response.status(204).send();
 });


router.get('/:entregaId', (request, response) => {
  const entrega = db[request.params.entregaId];
  entrega
    ? response.json(entrega)
    : notFound(request, response)
 });


router.patch('/:entregaId', checkAuth, (request, response) => {
  const entrega = db[request.params.entregaId];
  const hasValue = request.body.recebedorComprador != null
  if(entrega) {
    entrega.id = request.body.id || entrega.id;
    entrega.idPedido = request.body.idPedido || entrega.idPedido;
    entrega.idCliente = request.body.idCliente || entrega.idCliente;
    entrega.nomeRecebedor = request.body.nomeRecebedor || entrega.nomeRecebedor;
    entrega.cpf = request.body.cpf || entrega.cpf;
    entrega.recebedorComprador = hasValue ? request.body.recebedorComprador : entrega.recebedorComprador;
    entrega.dataHora = request.body.dataHora || entrega.dataHora;
    entrega.localizacao = request.body.localizacao || entrega.localizacao;
    response.json(entrega);
  } else {
    notFound(request, response);
  }
});
 

router.delete('/:entregaId', checkAuth, (request, response) => {
  const entrega = db[request.params.entregaId];
  if(entrega) {
    delete db[entrega.id];
    response.status(200).json({
      message: 'Deleted'
    });
  } else {
    notFound(request, response);
  }
 });
 

module.exports = router;
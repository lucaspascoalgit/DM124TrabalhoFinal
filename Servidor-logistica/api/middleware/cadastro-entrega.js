const cadastroEntrega = (idPedido1, idCliente1, next) => {
    const https = require('http')

    const data = JSON.stringify({
        idPedido: 666,
        idCliente: "Teste666"        
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
      //response.status(res.statusCode).send();
      res.on('data', (d) => {
        process.stdout.write(d);
      });
    });
    
    req.on('error', (error) => {
      console.error(error);
    });
    
    req.write(data)
    req.end()

   
    //next();
}
   
   module.exports = cadastroEntrega;
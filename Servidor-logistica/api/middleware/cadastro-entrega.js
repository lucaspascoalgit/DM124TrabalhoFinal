const cadastroEntrega = (idPedido1, idCliente1, next) => {
    const https = require('http')

    let statusCode;

    const data = JSON.stringify({
        idPedido: idPedido1,
        idCliente: idCliente1        
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
      statusCode = res.statusCode;
      console.log(`Status code passado: ${statusCode}`);

      res.on('data', (d) => {
        process.stdout.write(d);        
      });
    });
    
    req.on('error', (error) => {
      console.error(error);
      return (error);
    });
    
    req.write(data)
    req.end();
    
    console.log(`Status code return: ${statusCode}`)
    return (statusCode);
   
    //next();
}
   
   module.exports = cadastroEntrega;
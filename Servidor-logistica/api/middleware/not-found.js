const notFound = (request, response, next) => {
    console.log(request.method,request.url);
    response.status(404).json({        
      message: `Route to ${request.method} ${request.url} not found`
    });
    next();
   }
   
   module.exports = notFound;
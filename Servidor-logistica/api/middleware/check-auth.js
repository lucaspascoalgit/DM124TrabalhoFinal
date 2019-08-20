const checkAuth = (request, response, next) => {
    const token = request.headers.authorization;
    if(/ZG0xMjQ6YWx1bm9pbmF0ZWw=/.test(token)) {
      next();
    } else {
      response.status(401).json({
        error: 'Not authorized'
      });
    }
  }
  
  module.exports = checkAuth;
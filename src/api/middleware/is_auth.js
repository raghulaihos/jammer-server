const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.get('Authorizaiton').split(' ')[1];
    let decoded_token;
    try{
        decoded_token = jwt.verify(token, 'YouCannotHackThisServer')
    }catch(err){
        err.statusCode = 500;
        throw err;
    }
    if(!decoded_token){
        const error = new Error('Not authenticated!');
        error.statusCode = 401;
        throw error;
    }
    req.user_id = decoded_token.user_id;
    next();
};
const artService = require('../services/artService')

module.exports = ()=> (req, res, next)=>{
    req.storage = {
        ...artService
    };
    next()
}
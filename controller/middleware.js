const collection = require('../modals/data')
const bcrypt = require('bcryptjs');
const collection1 = require('../modals/tasks')
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-com';



// Middleware for deCoding  the token of post, put, delete
module.exports.middleWare= (req, resp, next)=>{
    let dCode = Jwt.decode(req.body.token)
    console.log("middleware is calling")
    resp.temp = dCode;
    console.log(resp.temp)
    if(resp.temp){
    return next()
    }
}

// Middleware for dCoding the token of get requests
module.exports.getMiddleWare= (req, resp, next)=>{
    let dCode = Jwt.decode(req.query.token)
    // console.log("hello")
    resp.temp = dCode;
    if(req.query.token){
    return next()
    }
}
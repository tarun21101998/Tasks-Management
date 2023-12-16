const collection = require('../modals/data')
const bcrypt = require('bcryptjs');
const collection1 = require('../modals/tasks')
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-com';


// fetching the data of user
module.exports.userDetails= async (req, resp) => {
    try {
        const dCode = resp.temp
        const result = await collection.find({})
        return resp.status(200).send(dCode)
    } catch (error) {
return resp.status(500).send("error")
    }
 }



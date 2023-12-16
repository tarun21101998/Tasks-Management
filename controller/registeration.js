const collection = require('../modals/data')
const bcrypt = require('bcryptjs');
const collection1 = require('../modals/tasks')
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-com';



// login the user
module.exports.loginData = async (req, resp, next) => {
    try {
        if (req.body.password && req.body.email) {
            const { email, password } = req.body
            // finding the user inside dataBase
            let user = await collection.findOne({ email: req.body.email });
            if(!user){
                return resp.status(401).json({responce: false})
            }
            
            if (user && req.body.password === user.password) {
                // creating the jwt token and sending  as response inside the jwt token some  data is sharing 
                Jwt.sign({_id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, isType: user.isType}, jwtKey, { expiresIn: "2h" }, (err, token) => {
                    if (err) {
                        return resp.status(500).json({ error: false });
                    }
                    resp.cookie("auth", token)
                    resp.status(200).json({firstName: user.firstName, lastName: user.lastName, id: user._id, auth: token })
                })
            } else {
                return resp.status(401).json({ result: 'no user found' });
            }
        } else {
            return resp.status(401).json({ result: false });
        }
    }
    catch (err) {
        console.log('Error in signing up:', err);
        return resp.status(500).redirect('back');
    }

}



// signingUp a user
module.exports.signUp = async (req, resp) => {
    try {
        // checking duplicate email id
            let duplicate = await collection.findOne({ email: req.body.email });
            if (duplicate) {
                return resp.status(409).json({responce: false });
            }
            let user = new collection(req.body);
            let result = await collection.create({firstName: user.firstName, lastName: user.lastName, email: user.email, password: user.password, isActive: true, isType: user.isType});
            result = result.toObject();
            delete result.password
            Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    let responce = false;
                    return resp.status(409).json({ responce })
                }
                let responce = true
                return resp.status(200).json({ responce, auth: token })
            })
    }
    catch (err) {
        return resp.redirect('back',);
    }
}
const collection = require('../modals/data')
const bcrypt = require('bcryptjs');
const collection1 = require('../modals/tasks')
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-com';


// creating a new task
module.exports.newTasks= async (req, resp) => {
    try {
        const email1 = resp.temp
            let result = await collection1.create({email: email1.email, tasks: req.body.newTasks});
            result = result.toObject();
            delete result.password  
            return resp.status(200).json("successful")
    }

    catch (err) {
        // console.log('Error in signing up:', err);
        return resp.redirect('back',);
    }
}


// fetching the Tasks from dataBase according the type of user
module.exports.getTasks= async (req, resp) => {
    try {
            let user = await collection1.find({email: resp.temp.email});
            return resp.status(200).json({user: user})
    }
    catch (err) {
        return resp.redirect('back',);
    }
}

// Editing the tasks
module.exports.editTasks= async(req, resp)=>{
    try {
        let user = await collection1.findOne({_id: req.body.tasksId._id})
        await collection1.updateOne({_id: req.body.tasksId._id}, {$set: {tasks: req.body.editTasks}})
        resp.status(200).send("successfully updated")
    } catch (error) {
        resp.send("error is showing")
    }
}

// Deleting the tasks
module.exports.deleteTasks= async (req, resp)=>{
    try {
        let user =await collection1.deleteOne({_id: req.body.value});
        return resp.send("deleted")
    } catch (error) {
    }
}


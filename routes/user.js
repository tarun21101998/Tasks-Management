const express = require('express')
const router = express.Router();
const user = require('../controller/user')
const registeration= require('../controller/registeration')
const tasks = require('../controller/tasks.js')
const middleware = require('../controller/middleware.js')




// Data saving to Data Base
router.post('/users', registeration.signUp)
// login API is handling
router.post('/login', registeration.loginData)

// Data is fetching from DataBase
router.get('/getUserDetails', middleware.getMiddleWare,  user.userDetails)
// Creating the tasks and saving  data to dataBase
router.post('/tasks', middleware.middleWare,  tasks.newTasks)

// getting tasks  from dataBase and sending the result  frontEnd
router.get('/userTasks', middleware.getMiddleWare,  tasks.getTasks)

// edit the tasks
router.put('/editTasks', middleware.middleWare,  tasks.editTasks)

// deleting the tasks
router.delete('/deleteTasks', middleware.middleWare,  tasks.deleteTasks)

module.exports = router;
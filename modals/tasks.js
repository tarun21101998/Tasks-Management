const mongoose = require('mongoose')

const tasksSchema = new mongoose.Schema({

    email: {
        type: String,
        require: true,
    },
    tasks: {
        type: String,
        require: true
    }
},
{timestamps : true}
)

const Tasks= mongoose.model('Tasks', tasksSchema)
module.exports = Tasks;
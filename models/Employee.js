const mongodb = require('mongodb');
const mongoose =  require('mongoose')

const empSchema = new mongoose.Schema({
    first_name : {type: String, requried: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    position: {type: String, required: true},
    salary: {type: Number, required: true},
    date_of_joining: {type: Date, required: true},
    department: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}

})

const Employee = mongoose.model('Employee', empSchema)
module.exports = Employee;

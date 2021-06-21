const {Schema, model} = require('mongoose');

const user = new Schema({
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type:String,
        required: true
    } 
});

export default user;
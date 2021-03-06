import pkg from 'mongoose';
const {Schema, model} = pkg;

const debt = new Schema({
    idDebt: {
        type: String,
        required: true
    },
    idCreditor:{
        type: String,
        required: true
    },
    Sum:{
        type:Number,
        required: true
    },
    nameDebt:{
        type: String,
        required: true
    },
    nameCreditor:{
        type: String,
        required: true
    }
});

export default model("Debt", debt);
import {Schema, model} from 'mongoose';

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

export default debt;
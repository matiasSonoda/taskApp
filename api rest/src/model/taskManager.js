import {Schema, model } from "mongoose";

const taskSchema = new Schema({

    title: {

        type:String,
        required: true

    },
    description:{

        type:String,
        required:false
    },

    startDate: {

        type: Date ,
        default: new Date

    },
    expiryDate: {

        type: Date,
        required:true

    },

    state: {
        type: Boolean,
        required: false
    }
});

const taskModel = model('task', taskSchema);

export default taskModel;

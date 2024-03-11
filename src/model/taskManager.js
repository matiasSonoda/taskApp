import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({

    title: {

        type:String,
        required: true

    },
    description:{

        type:String,
        required:false
    },

    startDate: {

        type: Date,
        default: Date.now

    },
    expiryDate: {

        type:String,
        require:true

    },

    state: {
        type: Boolean,
        required: true
    }
});

export const taskModel = mongoose.model('taskModel', taskSchema);
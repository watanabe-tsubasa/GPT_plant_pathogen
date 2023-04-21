import mongoose from "mongoose";

const schemaData = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    messageLog: {
        type:Array,
        required: true
    }
});

const Conversation = mongoose.model('Conversation', schemaData);

export { Conversation }
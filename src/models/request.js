
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const requestSchema = new Schema({
    usersList: {
        type: Schema.Types.Mixed,
        required: true
    },
    messageID: {
        type: Schema.Types.ObjectId,
        required: true
    },
    channel: {
        type: String,
        required: true,
        enum: {
            values: ['SMS', 'PUSH'],
            message: '{VALUE} is not supported'
        }
    },
    expireAt: {
        type: Date,
        required: true
    },
    sendAt: {
        type: Date,
        required: true
    },
    retry: {
        type: Number,
        required: true
    },
    status: {
        type: String
    }

}, { timestamps: true });

const request = mongoose.model("request", requestSchema);

module.exports = request;


const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const notificationStatusSchema = new Schema({
    userIdentifier: {
        type: String,
        required: true
    },
    requestId: {
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
    sendAt: {
        type: Date
        
    },
    retriesNumber: {
        type: Number
    },
    status: {
        code: {
            type: String,
            required: true
        },
        details: {
            type: Schema.Types.Mixed
        }
    }

}, { timestamps: true , collection: 'notificationStatus' });

const notificationStatus = mongoose.model("notificationStatus", notificationStatusSchema);

module.exports = notificationStatus;

const mongoose = require('mongoose');
// Schema.Types.Mixed
const Schema = mongoose.Schema;
const messageTempleteSchema = new Schema({
    content: {
        type: Schema.Types.Mixed,
        required: true
    }
}, { timestamps: true });

const messageTemplete = mongoose.model("messageTemplete", messageTempleteSchema);

module.exports = messageTemplete;

const mongoose = require('mongoose');
const msgSchema = new mongoose.Schema({
    message: {
        type: Object
    },
    sender_id: {
        type: Object,
        required: true
    },
    receiver_id: {
        type: Object,
        required: true
    }, 
    file_upload: {
        type:Object
    },
    unread: {
        type:Object,
        default: '0'
    }
},{ timestamps: true })

module.exports = mongoose.model('message', msgSchema);
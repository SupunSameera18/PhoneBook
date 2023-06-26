const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    telephone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        required: true,
        default: new Date()
    }
})

module.exports = new model('User', userSchema);
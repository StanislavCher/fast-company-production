const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: {
        type: String,
        required: true
        //default:
    },
    color: {
        type: String,
        required: true
        //default:
    }
}, {
    timestamps: true
})

module.exports = model('Quality', schema)
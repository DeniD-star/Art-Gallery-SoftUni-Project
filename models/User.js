const {Schema, model} = require('mongoose');

const schema = new Schema({
    username: {type: String, required: true},
    hashedPassword: {type: String, required: true},
    address:{type: String, required: true},
    myPublications: [{type: Schema.Types.ObjectId, ref: 'Publication', default: []}]
})

module.exports = model('User', schema);
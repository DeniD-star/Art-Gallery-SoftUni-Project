const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: { type: String, minLength: [6, 'Title must be at least 6 characters long!'] },
    paintingTec: { type: String, required: true, maxLength: [15, 'Paint Technique must be not over 15 characters long!']  },
    picture: { type: String, required: true, match: [/^https?/, 'Image must be a valid URL!'] },
    certificate: { type: String, required: true, enum: ['Yes', 'No']},
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    usersShared: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }]

})

module.exports = model('Publication', schema);
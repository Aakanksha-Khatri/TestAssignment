const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HashtagSchema = new Schema({
    name: { type: String, unique: true, required: true }
});

module.exports = mongoose.model('Hashtag', HashtagSchema);

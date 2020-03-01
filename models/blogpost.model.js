const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogpostSchema = new Schema({
    email: {type: String, required: true},
    title: {type: String, required: true},
    date: {type: String, required: true},
    post: {type: String, required: true},
}, {
    timestamps: true,
});

const Blogpost = mongoose.model('Blogpost', blogpostSchema);

module.exports = Blogpost;
var mongoose = require('mongoose');

var NoteSchema = mongoose.Schema({
    id: String,
    title: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);

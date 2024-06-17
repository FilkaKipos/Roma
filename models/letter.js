const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const letterSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} не является корректным email адресом!`
        }
    },
    letterContent: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Letter = mongoose.model('Letter', letterSchema);

module.exports = Letter;

const { Schema, model } = require('mongoose');

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('Exercise', schema);

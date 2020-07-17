const { Schema, model } = require('mongoose');

const schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Exercise',
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('User', schema);

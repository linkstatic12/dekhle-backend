'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IndexesSchema = new Schema({
  googleID: {
    type: String,
    required: true,
  },
  index: {
    type: String,
    required: true,
  },
  files:[{
    originalName : String,
    savedName : String
     }]
});

module.exports = mongoose.model('Indexes', IndexesSchema);

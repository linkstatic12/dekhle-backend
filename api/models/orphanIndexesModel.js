'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrphanIndexesSchema = new Schema({

  index: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('OrphanIndexes', OrphanIndexesSchema);

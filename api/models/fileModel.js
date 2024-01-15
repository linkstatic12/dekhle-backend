'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
  googleID: {
    type: String,
    required: true,
  },
 fileSavedName:{
    type:String,
    required:false
 },
 mimetype:{
    type:String,
    required:false
 },
 fileOriginalName:{
    type:String,
    required:false
 }
});

module.exports = mongoose.model('Files', FileSchema);

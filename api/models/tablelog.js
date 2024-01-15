'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tablelogSchema = new Schema({
  Company: {
    type: String,
    required: true,
  },
  symbols: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  FILE_PATH:{
    type: String,
    required: true,
  },
  Page:
  {type: Number,
 required:true},
 country:{
    type:String,
    required:true
 },
 text:{
    type:String,
    require:true,
 },
 isDataFrameExtracted:{
    type:Boolean,
    require:true
 },
 isAnnual:{
    type:Boolean,
    require:true
 },
 isQuarter:{
    type:Boolean,
    require:true
 },
 width:{
    type:Number,
    require:true
 },
 height:{
    type:Number,
    require:true
 },
 Date:{
    type:Date,
    
 },
 Statement:{
    type:String,
    require:true
 },
 isConsolidatedFound:{
    type:Boolean
 },
 isDateFound:{
    type:Boolean
 },
 isStatementFound:{
    type:Boolean
 }
});

module.exports = mongoose.model('tablelog', tablelogSchema);

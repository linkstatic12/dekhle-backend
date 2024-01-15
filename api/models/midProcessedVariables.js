'use strict';
const { isInteger } = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MidProcessedVariablesSchema = new Schema({
  company: {
    type: String
  },
  page:{
   type: Number
  },
  pdf:{
    type: String
  },
  alias:{
    type: String
  },
  variable:{
    type:String
  },
  value:{
    type: String
  },
  status:{
    type:String
  },
  statement:{
    type: String
  },
  Statementdate:{
   type: Date
  },
  ConsolidatedUnconsolidated:{
    type: String
  },
  symbol:{
    type: String
  },
  Period:{
    type: String,
  },
  date:{
    type: Date
  },
  text:{
    type: Array
  },
  valuebox:{
    type: Array
  },
  variablebox:{type: Array}
 
});

module.exports = mongoose.model('midProcessedVariables', MidProcessedVariablesSchema);

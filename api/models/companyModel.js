'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompaniesSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Symbol: {
    type: String,
    required: true,
  },
  Sector: {
    type: String,
    required: true,
  },
  isETF:{
    type: Boolean
  },
  isDebt:{
    type: Boolean
  },
  isGEM:{
    type: Boolean
  },
  CompanyProfile:{
    type: String,
  },
  Address:{
    type:String
  },
  Website_URL:{
    type:String
  },
  Website:{
    type:String
  },
  Registrar:{
    type:String
  },
  Auditor:{
    type:String
  },
  MarketCap:{
    type: Number
  },
  Shares:{
    type: Number
  },
  FreeFloat:{
    type: Number
  },
  FreeFloatPercent:{
    type: String
  },
  CEO:{
    type: String
  },
  Chairperson:{
    type: String
  },
  CompanySecretary:{
    type:String
  },
  Status:{
    type: String
  }

});

module.exports = mongoose.model('companies', CompaniesSchema);

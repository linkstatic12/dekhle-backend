'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  { 
    
    googleId: {
    type: String,
    required: true,
  },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    
    createdOnDate: {
      type: String,
    },
    userActive: {
      type: Boolean,
      default: true,
    },
    acceptedTerms: {
      type: Boolean,
    },
    userStatus: {
      type: String,
      default: 'accepted',
    },
    uniqueId: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);

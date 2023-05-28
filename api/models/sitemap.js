'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sitemapSchema = new Schema({
  mainSite: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  URL: {
type: String,
required: true

  },
});

module.exports = mongoose.model('Sitemap', sitemapSchema);

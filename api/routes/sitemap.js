'use strict';
module.exports = (app) => {
  const adminController = require('../controllers/sitemapController');
  app.route('/api/v1/admin/create_new_url').post(adminController.create_new_url);
  app.route('/api/v1/admin/spiderSanaSafinaz').post(adminController.runSpiderSanaSafinaz);
 
    
};

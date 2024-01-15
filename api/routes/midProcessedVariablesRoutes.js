'use strict';
module.exports = (app) => {
  const midProcessedVariablesController = require('../controllers/midProcessedVariablesController');

  app.route('/api/v1/symbol/:uniqueId').get(midProcessedVariablesController.getCompanyValues);
  app.route('/api/v1/symbol/:uniqueId/:year').get(midProcessedVariablesController.getAnnualQuarterly);
  app.route('/api/v1/symbols').get(midProcessedVariablesController.getAllSymbols);
  app.route('/api/v1/widthheight/:filePath/:page').get(midProcessedVariablesController.getWidthHeight);
};

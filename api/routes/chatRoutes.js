'use strict';
module.exports = (app) => {
    const extractdata = require('../controllers/extractTable');
    const chatController = require('../controllers/chatController');
    app.route('/api/v1/chat/question').get(chatController.answer_question);
    app.route('/api/v1/chat/create_indexes').get(chatController.create_indexes);
    app.route('/api/v1/extract/table').get(extractdata.extractData);
}


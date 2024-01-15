'use strict';
module.exports = (app) => {
 
  const authController = require('../controllers/authController');
  const passport = require('passport')
  app.route('/google').get(passport.authenticate('google', { scope: ['profile','email'] }))

  app.route('/google/callback').get(passport.authenticate('google', { failureRedirect: '/',session:false }),
  (req, res) => {
   
   res.redirect("http://localhost:3000/assistant?id="+req.user.googleId);
  
  }
);
  app.route('/api/v1/auth/get_index_state').get(authController.get_index_state);
  app.route('/api/v1/auth/verify-google-id').get(authController.verify_google_id_settings);
  app.route('/api/v1/auth/login-user').post(authController.login_user);
  app
    .route('/api/v1/auth/create-new-user')
    .post(authController.create_new_user);
  app
    .route('/api/v1/auth/verification/verify-account/:uniqueId/:secretCode')
    .get(authController.validate_user_email_and_account);
  app
    .route('/api/v1/auth/password-reset/get-code')
    .post(authController.get_reset_password_code);
  app
    .route('/api/v1/auth/password-reset/verify-code')
    .post(authController.verify_new_user_password);
  app
    .route('/api/v1/auth/delete-account')
    .post(authController.delete_user_account);
  app
    .route('/api/v1/auth/check-token-valid-external/:token')
    .get(authController.check_token_valid_external);
};

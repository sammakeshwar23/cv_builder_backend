const express = require('express');
const router = express.Router();
const passport = require('passport');
const dotenv = require('dotenv');
dotenv.config(); 

const authController = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../validators/authValidator');

router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

const jwt = require('jsonwebtoken');

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: process.env.LOGIN_FAILURE_REDIRECT }),
  (req, res) => {
    const user = req.user;

    const token = jwt.sign(
      { id: user.id, email: user.email }, 
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    const redirectUrl = `${process.env.CLIENT_LOGIN_REDIRECT}?token=${token}`;
    res.redirect(redirectUrl);
  }
);


router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: process.env.LOGIN_FAILURE_REDIRECT }),
  (req, res) => {
    res.redirect(process.env.CLIENT_DASHBOARD_URL);
  }
);

module.exports = router;

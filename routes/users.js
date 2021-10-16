var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  res.send('respond with a resource');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  } else {
      console.error("@routes/index.js Authenticated faild")
      res.redirect('/users/login');
  }
}

module.exports = router;

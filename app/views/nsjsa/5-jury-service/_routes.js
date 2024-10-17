var express = require('express');
var router = express.Router();

// Redirect /jury-service to first question in sequence
router.get('/', function (req, res) {
  res.redirect('/v3_0-citizen/5-jury-service/have-been');
});

router.post('/have-been', function (req, res) {
  var juryConditional = req.body.juryService;
  if (juryConditional === 'Yes') {
    res.redirect('/v3_0-citizen/5-jury-service/period');
  } else {
    res.redirect('/v3_0-citizen/6-current-employment');
  }
});

router.post('/period', function (req, res) {
  res.redirect('/v3_0-citizen/6-current-employment');
});

module.exports = router;

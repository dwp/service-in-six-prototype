const express = require('express');
const router = express.Router();

const BASE_PATH = 'v3_0-citizen/3-details';
const ABS_BASE_PATH = `/${BASE_PATH}`;
const NEXT_PATH = '/v3_0-citizen/4-other-benefits';

router.post('/add-different-postal-address', function (req, res) {
  const answer = req.body.detailsAddDifferentPostalAddress;

  if (answer === 'No') {
    res.redirect(`${ABS_BASE_PATH}/contact-phone`);
  } else {
    res.redirect(`${ABS_BASE_PATH}/address-postal-address`);
  }
});

// Validate DOB against year
router.post('/address', function (req, res) {
  var dobYear = parseInt(req.session.data['dobYear']);
  var currentYear = new Date().getFullYear();

  if (currentYear - dobYear < 16) {
    res.redirect('/v3_0-citizen/3-details/dob?under16');
  } else if (currentYear - dobYear > 64) {
    res.redirect('/v3_0-citizen/3-details/dob?over64');
  } else if (currentYear - dobYear === 16) {
    res.redirect('/v3_0-citizen/3-details/under18');
  } else if (currentYear - dobYear === 17) {
    res.redirect('/v3_0-citizen/3-details/under18');
  } else {
    res.redirect('/v3_0-citizen/3-details/address');
  }
});

router.post('/contact-phone', function (req, res) {
  res.redirect(`${ABS_BASE_PATH}/contact-do-you-have-an-email`);
});

router.post('/contact-do-you-have-an-email', function (req, res) {
  const answer = req.body.contactDoYouHaveAnEmail;

  if (typeof answer !== 'undefined') {
    if (answer === 'Yes') {
      res.redirect(`${ABS_BASE_PATH}/contact-email`);
    } else {
      res.redirect(`${ABS_BASE_PATH}/bank-account`);
    }
  } else {
    res.redirect(`${ABS_BASE_PATH}/contact-do-you-have-an-email`);
  }
});

router.post('/contact-email', function (req, res) {
  res.redirect(`${ABS_BASE_PATH}/bank-account`);
});

router.post('/bank-account', function (req, res) {
  res.redirect(NEXT_PATH);
});

// Show language preferences when a Welsh postcode is entered 
router.post('/check-postcode', function (req, res) {
  var answer = req.session.data['address-postcode'];
  if (answer) {
    answer = answer.toUpperCase();
    if (answer.startsWith("LL") || answer.startsWith("SY") || answer.startsWith("SA") || answer.startsWith("CH") || answer.startsWith("LD") || answer.startsWith("NP") || answer.startsWith("CF")) {
      res.redirect(`${ABS_BASE_PATH}/welsh`);
    } else {
      res.redirect(`${ABS_BASE_PATH}/address-is-it-postal`);
    }
  } else {
    res.redirect(`${ABS_BASE_PATH}/address-is-it-postal`);
  }
});

module.exports = router;


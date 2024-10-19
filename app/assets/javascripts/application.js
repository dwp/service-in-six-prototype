/* global $ */

//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//


$(document).ready(function () {
})

// Accessible Modal
$(document).ready(function () {
  var findModal = function (elem) {

    var tabbable = elem.find('select, input, textarea, button, a').filter(':visible');

    var firstTabbable = tabbable.first();
    var lastTabbable = tabbable.last();
    // set focus on first tabbable element
    // NOTE:  If this doesn't exist, then the user is able to tab through all of the page
    //        page elements that sit behind the modal dialog...
    //        Work around being that the 'Continue' button is on focus, with tabbing
    //        through not being permissiable
    firstTabbable.focus();

    // send last tabbable back to first
    lastTabbable.on('keydown', function (e) {
      if ((e.which === 9 && !e.shiftKey)) {
        e.preventDefault();
        firstTabbable.focus();
      }
    });

    // send last shift tabbable back to last
    firstTabbable.on('keydown', function (e) {
      if ((e.which === 9 && e.shiftKey)) {
        e.preventDefault();
        lastTabbable.focus();
      }
    });

    // allow esc to close Modal
    elem.on('keyup', function (e) {
      if (e.keyCode === 27) {
        elem.hide();
        $('.govuk-modal-overlay').hide();
        $('html').removeClass("noscroll");
      };
    });
  };

  // show modal and overlay and lock scroll
  // $('.show-modal').click(function(e){
  //   e.preventDefault();
  //
  //   $('.govuk-modal').show();
  //   $('.govuk-modal-overlay').show();
  //   $('html').addClass("noscroll");
  //   findModal($('.govuk-modal'));
  // });

  if (document.querySelector(".govuk-modal")) {
    setTimeout(function () {
      $('.govuk-modal').show();
      $('.govuk-modal-overlay').show();
      $('html').addClass("noscroll");
      findModal($('.govuk-modal'));
    }, 5000); // timed delay in nano-seconds (set to 5 seconds)
  }

  //hide modal and overlay
  $('.close-modal').click(function (e) {
    e.preventDefault();

    $('.govuk-modal').hide();
    $('.govuk-modal-overlay').hide();
    $('html').removeClass("noscroll");
  });

});
// Set month names
var monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];

var monthNamesShort = [
  "Jan", "Feb", "Mar",
  "Apr", "May", "Jun", "Jul",
  "Aug", "Sep", "Oct",
  "Nov", "Dec"
];

// Show current date
date = new Date();
y = date.getFullYear();
m = date.getMonth();
d = date.getDate();

if (document.querySelector(".date")) {
  document.querySelector(".date").innerHTML = d + " " + monthNames[m] + " " + y;
}

if (document.querySelector(".short-date")) {
  document.querySelector(".short-date").innerHTML = d + " " + monthNamesShort[m] + " " + y;
}

// Show backdate date
backdateDate = new Date();
var numberOfDaysToAdd = -60;
backdateDate.setDate(backdateDate.getDate() + numberOfDaysToAdd);
ny = backdateDate.getFullYear();
nm = backdateDate.getMonth();
nd = backdateDate.getDate();

if (document.querySelector(".backdate-date")) {
  document.querySelector(".backdate-date").innerHTML = nd + " " + nm + " " + ny;
}

// convert month numbers to names
var months = document.querySelector(".months");

if (document.querySelectorAll(".months")) {
  function numberToMonths() {
    months.innerHTML = months.innerHTML.replace('01', 'January');
    months.innerHTML = months.innerHTML.replace('02', 'February');
    months.innerHTML = months.innerHTML.replace('03', 'March');
    months.innerHTML = months.innerHTML.replace('04', 'April');
    months.innerHTML = months.innerHTML.replace('05', 'May');
    months.innerHTML = months.innerHTML.replace('06', 'June');
    months.innerHTML = months.innerHTML.replace('07', 'July');
    months.innerHTML = months.innerHTML.replace('08', 'August');
    months.innerHTML = months.innerHTML.replace('09', 'September');
    months.innerHTML = months.innerHTML.replace('10', 'October');
    months.innerHTML = months.innerHTML.replace('11', 'November');
    months.innerHTML = months.innerHTML.replace('12', 'December');
  }
  numberToMonths();
}


/* global $ */

//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//


$(document).ready(function () {
})

// Autocomplete
// var autocomplete = document.querySelector('[data-source]')
// if (autocomplete) {
//   accessibleAutocomplete.enhanceSelectElement({
//     // showNoOptionsFound: false;
//     defaultValue: '',
//     selectElement: autocomplete
//   })
// }

// COOKIE BANNER START

function initializeAnalytics() {
  var acceptAllCookies = localStorage.getItem('acceptAllCookies')
  if (acceptAllCookies == 'true') {
    window.dataLayer = window.dataLayer || []
    function gtag() {
      dataLayer.push(arguments)
    }
    gtag('js', new Date())
    gtag('config', 'UA-XXXXXXXX-XX')
  }
}

initializeAnalytics()

function deleteAllCookies() {
  var cookies = document.cookie.split(';')

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i]
    var eqPos = cookie.indexOf('=')
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
  }
}

function processCookiesToggle() {
  var acceptAllCookies = window.localStorage.getItem('acceptAllCookies')
  if (acceptAllCookies == 'true') {
    $('.toggle-cookies .accept-cookies').hide()
    $('.toggle-cookies .functional-cookies').show()
  } else {
    $('.toggle-cookies .accept-cookies').show()
    $('.toggle-cookies .functional-cookies').hide()
  }
}

function saveCookieChoice(allow) {
  window.localStorage.setItem('acceptAllCookies', allow)
  window.localStorage.setItem('seenCookieBanner', true)
  var $cookieBanner = $('.casa-cookie-banner')
  if (!allow) {
    deleteAllCookies()
    $cookieBanner.addClass('casa-cookie-banner-show-reject')
  } else {
    $cookieBanner.addClass('casa-cookie-banner-show-accept')
  }
  processCookiesToggle()
  initializeAnalytics()
}

function processCookieBanner() {
  var seenCookieBanner = window.localStorage.getItem('seenCookieBanner')
  if (seenCookieBanner == null) {
    window.localStorage.setItem('seenCookieBanner', 'false')
  }
  var $cookieBanner = $('.casa-cookie-banner')
  if (!(seenCookieBanner == 'true')) {
    $('body').prepend($cookieBanner)
    $cookieBanner.css('display', 'block')
  } else {
    $cookieBanner.remove()
  }
  processCookiesToggle()
}

function hideCookieBanner() {
  var $cookieBanner = $('.casa-cookie-banner')
  $cookieBanner.remove()
}

processCookieBanner()

// COOKIE BANNER END

// Set month names
var monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];

// Another crude hack from Dan to display month nunbers (don't know how to do this properly)	
var monthNumbers = [
  "1", "2", "3",
  "4", "5", "6", "7",
  "8", "9", "10",
  "11", "12"
];

// Show current date
date = new Date();
y = date.getFullYear();
m = date.getMonth();
d = date.getDate();

if (document.querySelector(".date")) {
  document.querySelector(".date").innerHTML = d + " " + monthNames[m] + " " + y;
}

// Show future date
newDate = new Date();
var numberOfDaysToAdd = 14;
newDate.setDate(newDate.getDate() + numberOfDaysToAdd);
ny = newDate.getFullYear();
nm = newDate.getMonth();
nd = newDate.getDate();

if (document.querySelector(".new-date")) {
  document.querySelector(".new-date").innerHTML = nd + "&nbsp" + monthNames[nm] + "&nbsp" + ny;
}


// Show date 3 months ago. Sorry, this is wack – can't work out how to do it properly, so just crudely minusing 91 days (Dan)
date3MonthsAgo = new Date();
var numberOfDaysToAdd = -91;
date3MonthsAgo.setDate(date3MonthsAgo.getDate() + numberOfDaysToAdd);
py = date3MonthsAgo.getFullYear();
pm = date3MonthsAgo.getMonth();
pd = date3MonthsAgo.getDate();

if (document.querySelector(".date-3-months-ago")) {
  document.querySelector(".date-3-months-ago").innerHTML = pd + " " + monthNumbers[pm] + " " + py;
}

// suggest claim date

var suggestedClaimDate = document.querySelector(".suggested-claim-date");
if (suggestedClaimDate) {
  var claimDate = new Date(
    parseInt(suggestedClaimDate.getAttribute('data-year'), 10),
    parseInt(suggestedClaimDate.getAttribute('data-month'), 10) - 1,
    parseInt(suggestedClaimDate.getAttribute('data-day'), 10)
  );
  var numberOfDaysToAdd = 1;
  claimDate.setDate(claimDate.getDate() + numberOfDaysToAdd);
  ny = claimDate.getFullYear();
  nm = claimDate.getMonth();
  nd = claimDate.getDate();
  suggestedClaimDate.innerHTML = nd + "&nbsp" + monthNames[nm] + "&nbsp" + ny;
}
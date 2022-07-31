"use strict";

var input = document.querySelector('.input');
var form = document.querySelector('#form');
var outPut = document.querySelector('.output');
var suraData = document.querySelector('.data');
var formBtn = document.querySelector('.form-btn');

function getData() {
  var inputVal, URI;
  return regeneratorRuntime.async(function getData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          inputVal = input.value.toLowerCase();
          URI = "https://api.covid19api.com/total/country/".concat(inputVal);
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch(URI).then(function (response) {
            return response.json();
          }).then(function (data) {
            var countries = data[459]; //  console.log(obj);

            outPut.innerHTML += "\n            \n<div class=\"container\">\n<table style=\"width:100%\">\n  <tr>\n    <th>Country</th>\n    <th colspan=\"2\">".concat(countries.Country, " <span class=\"w-30 text-dark\">").concat(countries.Date.replace("T00:00:00Z", ""), "</span></th>\n  </tr>\n  <tr>\n    <td>Deaths</td>\n    <td class=\"text-danger\">").concat(countries.Deaths, "</td>\n    </tr>\n\n    <tr>    \n    <td>Cases</td>\n    <td class=\"text-info\">").concat(countries.Confirmed, "</td>\n  </tr>\n\n    <tr>    \n    <td>Recovered</td>\n    <td class=\"text-success\">").concat(countries.Recovered, "</td>\n  </tr>\n</table>\n</div>\n            "); // console.log(countries);
          }));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

getData();
form.addEventListener('submit', function (e) {
  e.preventDefault(); //  getData();

  window.location.reload();
}); //formBtn.addEventListener('click', getData)    

var furniture = ['Table', 'Chairs', 'Couch'];
furniture.forEach(function (word) {
  console.log(word.charAt(0));
});
"use strict";

var calculatorButtons = [{
  name: '7',
  symbol: 7,
  formula: '7',
  type: 'number'
}, {
  name: '8',
  symbol: 8,
  formula: '8',
  type: 'number'
}, {
  name: '9',
  symbol: 9,
  formula: '9',
  type: 'number'
}, {
  name: 'delete',
  symbol: 'DEL',
  formula: false,
  type: 'delete'
}, {
  name: '4',
  symbol: 4,
  formula: '4',
  type: 'number'
}, {
  name: '5',
  symbol: 5,
  formula: '5',
  type: 'number'
}, {
  name: '6',
  symbol: 6,
  formula: '6',
  type: 'number'
},, {
  name: 'addition',
  symbol: '+',
  formula: '+',
  type: 'operator'
},, {
  name: '1',
  symbol: 1,
  formula: '1',
  type: 'number'
}, {
  name: '2',
  symbol: 2,
  formula: '2',
  type: 'number'
}, {
  name: '3',
  symbol: 3,
  formula: '3',
  type: 'number'
},, {
  name: 'subtraction',
  symbol: '-',
  formula: '-',
  type: 'operator'
}, {
  name: '.',
  symbol: '.',
  formula: false,
  type: 'key'
},, {
  name: '0',
  symbol: 0,
  formula: '0',
  type: 'number'
},, {
  name: 'divison',
  symbol: '÷',
  formula: '/',
  type: 'operator'
},, {
  name: 'multiplication',
  symbol: 'x',
  formula: '*',
  type: 'operator'
}, {
  name: 'reset',
  symbol: 'reset',
  formula: '%',
  type: 'operator'
}, {
  name: 'calculate',
  symbol: '=',
  formula: '=',
  type: 'calculate'
}];
var data = {
  operation: [],
  result: []
};
var resultJoind = 0;
var grid = document.querySelector('.grid');
var result = document.querySelector('.result');
var operation = document.querySelector('.operation');
var btnsArr = Array.from(grid);
calculatorButtons.forEach(function (button, index) {
  grid.innerHTML += "<button id=\"".concat(button.name, "\">").concat(button.symbol, "</button>");
});
grid.addEventListener('click', function (e) {
  var targetBtn = e.target;
  calculatorButtons.forEach(function (button) {
    if (button.name == targetBtn.id) {
      calculator(button);

      if (data.result.length >= 12) {
        btnsArr.forEach(function (btn) {
          btn.disabled = true;
          console.log(btn);
        });
      }
    }
  });
});

function calculator(btn) {
  if (btn.type === 'number') {
    data.operation.push(btn.symbol);
    data.result.push(btn.symbol);
  } else if (btn.type === 'operator') {
    data.operation.push(btn.formula);
    data.result.push(btn.formula);
  } else if (btn.type === 'key') {
    data.result.push(btn.name);
  } else if (btn.type === 'delete') {
    data.result.pop();
  }

  if (btn.name == "reset") {
    data.operation = [];
    data.result = [];
    result.innerHTML = '';
  }

  if (btn.type === 'calculate') {
    resultJoind = eval(data.result.join(''));
    data.result = [];
    result.innerText = resultJoind;
  }

  if (data.result.length >= 16) {
    showError();
  }

  operation.innerText = data.result.join('');
}

function showError() {
  data.result = [''];
  result.innerText = 'too much elements stop writing :)';
  setTimeout(function () {
    result.innerText = '';
  }, 2000);
}
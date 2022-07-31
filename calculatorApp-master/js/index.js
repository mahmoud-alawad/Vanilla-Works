let calculatorButtons = [
    {
        name: '7',
        symbol: 7,
        formula: '7',
        type: 'number'
    }
    ,
    {
        name: '8',
        symbol: 8,
        formula: '8',
        type: 'number'
    }
    ,
    {
        name: '9',
        symbol: 9,
        formula: '9',
        type: 'number'
    },
    {
        name: 'delete',
        symbol: 'DEL',
        formula: false,
        type: 'delete'
    },
    {
        name: '4',
        symbol: 4,
        formula: '4',
        type: 'number'
    }
    ,
    {
        name: '5',
        symbol: 5,
        formula: '5',
        type: 'number'
    }
    ,
    {
        name: '6',
        symbol: 6,
        formula: '6',
        type: 'number'
    }
    ,
    ,
    {
        name: 'addition',
        symbol: '+',
        formula: '+',
        type: 'operator'
    },
    ,
    {
        name: '1',
        symbol: 1,
        formula: '1',
        type: 'number'
    }
    ,
    {
        name: '2',
        symbol: 2,
        formula: '2',
        type: 'number'
    }
    ,
    {
        name: '3',
        symbol: 3,
        formula: '3',
        type: 'number'
    },
    ,
    {
        name: 'subtraction',
        symbol: '-',
        formula: '-',
        type: 'operator'
    },
    {
        name: '.',
        symbol: '.',
        formula: false,
        type: 'key'
    },
    ,
    {
        name: '0',
        symbol: 0,
        formula: '0',
        type: 'number'
    },
    ,
    {
        name: 'divison',
        symbol: '÷',
        formula: '/',
        type: 'operator'
    },
    ,
    {
        name: 'multiplication',
        symbol: 'x',
        formula: '*',
        type: 'operator'
    }
    ,
    {
        name: 'reset',
        symbol: 'reset',
        formula: '%',
        type: 'operator'
    }
    
    ,
    {
        name: 'calculate',
        symbol: '=',
        formula: '=',
        type: 'calculate'
    }
    
    
];
let data = {
    operation: [],
    result : [],
}
let resultJoind = 0;
let numberStorage = [];

const grid = document.querySelector('.grid');
const result = document.querySelector('.result');
const operation = document.querySelector('.operation');
const btnsArr = Array.from(grid);


 if (localStorage.getItem('number')) {
     const numbersOnScreeen = localStorage.getItem('number')
         
     result.innerText =numbersOnScreeen;
        }

//create the buttons
calculatorButtons.forEach( function (button, index) {
    grid.innerHTML += `<button id="${button.name}">${button.symbol}</button>`;
}) 


//each button functionality
grid.addEventListener('click', (e) => {
    result.innerText = ''
    const targetBtn = e.target;
    
    calculatorButtons.forEach(button => {
        if(button.name == targetBtn.id){
            calculator(button);
        }
    })
})


//ui display 
function calculator(btn) {
    
    if (btn.type === 'number') {

        data.operation.push(btn.symbol);
        data.result.push(btn.symbol)
        
    } else if (btn.type === 'operator') {
        
        data.operation.push(btn.formula);
                data.result.push(btn.formula)


    } else if (btn.type === 'key') {
        data.result.push(btn.name)
    }else if (btn.type === 'delete'){
        data.result.pop();
        
    }
    if( btn.name == "reset" ){
            data.operation = [];
        data.result = [];
        result.innerHTML = '';
    }
    if (btn.type === 'calculate') {
        resultJoind = eval(data.result.join(''));
        localStorage.setItem('number', resultJoind);
        data.result = [];
        result.innerText = resultJoind;
    }
    if (data.result.length >= 15) {
        showError();
    }

    //save the numbers in localStorage
   
    operation.innerText = data.result.join('') 
}

function showError() {
    data.result = [''];
    result.innerText = 'too much elements stop writing :)';
            result.style.color = 'red'

    setTimeout(() => {
        result.innerText = ''
    }, 2000);
}

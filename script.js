const CALCULATOR = {
    firstOperand: ``,
    operator: ``,
    secondOperand: ``,
    result: ``,
    add: function(a,b) {
        return a + b;
    },
    subtract: function(a,b) {
        return a - b;
    },
    multiply: function(a,b) {
        return a * b;
    },
    divide: function(a,b) {
        return a / b;
    },
};

const RESULTDISPLAY = document.querySelector(`.result.display`);
const ENCODERDISPLAY = document.querySelector(`.encoder.display`);



const NUMBERBUTTONS = document.querySelectorAll(`.number.btn`);
NUMBERBUTTONS.forEach(function(numberbutton) {
    numberbutton.addEventListener(`click`, function () {
        ENCODERDISPLAY.textContent += numberbutton.textContent;
        pointChecker();
    });
});



const OPERATORBUTTONS = document.querySelectorAll(`.operator.btn`);
OPERATORBUTTONS.forEach(function(operatorbutton) {
    operatorbutton.addEventListener(`click`, function () {

        if (CALCULATOR.firstOperand == ``) {

            CALCULATOR.firstOperand = ENCODERDISPLAY.textContent;

            CALCULATOR.operator = operatorbutton.textContent;

            RESULTDISPLAY.textContent = `${CALCULATOR.firstOperand} ${CALCULATOR.operator}`;

            ENCODERDISPLAY.textContent = ``;
        }

        else {
            CALCULATOR.secondOperand = ENCODERDISPLAY.textContent;

            CALCULATOR.result = roundResult(operate(CALCULATOR.operator,CALCULATOR.firstOperand,CALCULATOR.secondOperand));

            CALCULATOR.operator = operatorbutton.textContent;

            CALCULATOR.firstOperand = CALCULATOR.result;

            ENCODERDISPLAY.textContent = ``;    

            CALCULATOR.secondOperand = ``;

            RESULTDISPLAY.textContent = `${CALCULATOR.firstOperand} ${CALCULATOR.operator} ${CALCULATOR.secondOperand}`;
        }
        
    });
});


function pointChecker () {
    let encodes = ENCODERDISPLAY.textContent.split(``);
    let processedEncodes = encodes.filter(function (encode) {
        return encode.includes(`.`);
    });
    if (processedEncodes.length >= 2) {
        alert(`You can only use 1 decimal point`);
        deleteNumber();
    }
}


const EQUALBUTTON = document.querySelector(`.equal.btn`);
EQUALBUTTON.addEventListener(`click`, function () {

    if (CALCULATOR.operator === null) return
    if (CALCULATOR.operator === '÷' && ENCODERDISPLAY.textContent === '0') {
        alert("You can't divide by 0!")
        return
    }
    
    
    CALCULATOR.secondOperand = ENCODERDISPLAY.textContent;

    CALCULATOR.result = roundResult(operate(CALCULATOR.operator,CALCULATOR.firstOperand,CALCULATOR.secondOperand));

    RESULTDISPLAY.textContent = `${CALCULATOR.result}`;

    ENCODERDISPLAY.textContent = ``;

    CALCULATOR.firstOperand = CALCULATOR.result;

    CALCULATOR.secondOperand = ``;
});


const DELETEBUTTON = document.querySelector(`.delete.btn`);
DELETEBUTTON.addEventListener(`click`, deleteNumber);


const CLEARBUTTON = document.querySelector(`.clear.btn`);
CLEARBUTTON.addEventListener(`click`, clearData);




// Clear data on the variables
function clearData () {
    CALCULATOR.firstOperand = ``;
    CALCULATOR.operator = ``;
    CALCULATOR.secondOperand = ``;
    CALCULATOR.result = ``;
    ENCODERDISPLAY.textContent = ``;
    RESULTDISPLAY.textContent = ``;
}

// Remove number on the Encoder Display
function deleteNumber () {
    ENCODERDISPLAY.textContent = ENCODERDISPLAY.textContent.toString().slice(0, -1);
}

// Round the Result
function roundResult(number) {
    return Math.round(number * 1000) / 1000
}

// Operate the function either Add, Subtract, Multiply or Divide
function operate(operator, a, b) {
    a = Number(a);

    b= Number(b);
    
    switch(operator) {
        case `+`:
            return CALCULATOR.add(a,b);
        case `-`:
            return CALCULATOR.subtract(a,b);
        case `x`:
            return CALCULATOR.multiply(a,b);
        case `÷`:
            if (b == 0) {
                alert(`Cannot divide by 0`);
                location.reload();
            } else {
                return CALCULATOR.divide(a,b);
            }
    }
};
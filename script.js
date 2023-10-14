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


window.addEventListener(`keydown`, function(e) {

    if (e.key >= 0 && e.key <= 9) {
        ENCODERDISPLAY.textContent += e.key;
        pointChecker();
    }

    if (e.key === '.') {
        ENCODERDISPLAY.textContent += e.key;
        pointChecker();
    }

    if (e.key === 'Backspace') deleteNumber()

    if (e.key === 'Escape') clearData()

    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        if (CALCULATOR.firstOperand == ``) {

            CALCULATOR.firstOperand = ENCODERDISPLAY.textContent;

            CALCULATOR.operator = e.key;

            RESULTDISPLAY.textContent = `${CALCULATOR.firstOperand} ${CALCULATOR.operator}`;

            ENCODERDISPLAY.textContent = ``;
        }

        else {
            calculate();

            CALCULATOR.operator = e.key;

            CALCULATOR.firstOperand = CALCULATOR.result;

            ENCODERDISPLAY.textContent = ``;    

            CALCULATOR.secondOperand = ``;

            RESULTDISPLAY.textContent = `${CALCULATOR.firstOperand} ${CALCULATOR.operator} ${CALCULATOR.secondOperand}`;
        }
    }

});


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
            calculate();

            CALCULATOR.operator = operatorbutton.textContent;

            CALCULATOR.firstOperand = CALCULATOR.result;

            ENCODERDISPLAY.textContent = ``;    

            CALCULATOR.secondOperand = ``;

            RESULTDISPLAY.textContent = `${CALCULATOR.firstOperand} ${CALCULATOR.operator} ${CALCULATOR.secondOperand}`;
        }
        
    });
});


const EQUALBUTTON = document.querySelector(`.equal.btn`);
EQUALBUTTON.addEventListener(`click`, function () {

    if (CALCULATOR.operator === null) return;

    if (CALCULATOR.operator === '÷' && ENCODERDISPLAY.textContent === '0') {
        alert("You can't divide by 0.");
        return;
    }
    
    calculate();

    RESULTDISPLAY.textContent = `${CALCULATOR.result}`;

    ENCODERDISPLAY.textContent = ``;

    CALCULATOR.firstOperand = CALCULATOR.result;

    CALCULATOR.secondOperand = ``;

});

// Declare Delete Button and add function once this button got clicked
const DELETEBUTTON = document.querySelector(`.delete.btn`);
DELETEBUTTON.addEventListener(`click`, deleteNumber);

// Declare Clear Button and add function once this button got clicked
const CLEARBUTTON = document.querySelector(`.clear.btn`);
CLEARBUTTON.addEventListener(`click`, clearData);


// This will alert as soon as the user type in more than 2 decimal point
function pointChecker () {
    let encodes = ENCODERDISPLAY.textContent.split(``);
    let processedEncodes = encodes.filter(function (encode) {
        return encode.includes(`.`);
    });
    if (processedEncodes.length >= 2) {
        alert(`You can only use 1 decimal point`);
        deleteNumber();
    }
};


// Function to get the Second Operand and start calculating the result
function calculate() {
    CALCULATOR.secondOperand = ENCODERDISPLAY.textContent;

    CALCULATOR.result = roundResult(operate(CALCULATOR.operator,CALCULATOR.firstOperand,CALCULATOR.secondOperand));
}


// Clear data on the variables
function clearData () {
    CALCULATOR.firstOperand = ``;
    CALCULATOR.operator = ``;
    CALCULATOR.secondOperand = ``;
    CALCULATOR.result = ``;
    ENCODERDISPLAY.textContent = ``;
    RESULTDISPLAY.textContent = ``;
};


// Remove number on the Encoder Display
function deleteNumber () {
    ENCODERDISPLAY.textContent = ENCODERDISPLAY.textContent.toString().slice(0, -1);
};


// Round the Result
function roundResult(number) {
    return Math.round(number * 1000) / 1000
};


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
                alert("You can't divide by 0.");
                location.reload();
            } else {
                return CALCULATOR.divide(a,b);
            }
    }

};
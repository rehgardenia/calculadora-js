const previousOperationText = document.querySelector(".previous-operation");
const currentOperationText = document.querySelector(".current-operation");
const buttons = document.querySelectorAll(".buttons-container button");


class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }
    //adicionar um digito
    addDigit(digit) {

        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }
        this.currentOperation = digit;
        this.updateScreen();
    }
    //operacoes
    processOperation(operation) {
        if (this.currentOperationText.innerText == "" && operation !== "C") {
            if (this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }
        let operationValue;
        let previous = +this.previousOperationText.innerText.split(" ")[0];
        let current = +this.currentOperationText.innerText;


        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
               this.processDelOperator();
                break;  
            case "CE":
                this.processClearOperator();
                break;
            case "C":
                this.processClearAllOperator();
                break;
            case "=":
                this.processEqualOperator();
                break;              
            default:
                return;
        }
    }
    //atualiza os valores no painel
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {
        console.log(operationValue, operation, current, previous);
        if (operationValue == null) {
            this.currentOperationText.innerText += this.currentOperation;
        }
        else {
            if (previous === 0) {
                operationValue = current;
            }

            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }

    }
    changeOperation(operation){
        const mathOperation  = ["+","-","*","/"];
        if(!mathOperation.includes(operation)){
            return;
        }
        else{
            this.previousOperationText.innerText =this.previousOperationText.innerText.slice(0,-1) + operation;
        }
    }
    processDelOperator(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0,-1);
    }
    processClearOperator(){
        this.currentOperationText.innerText = "";
    }
    processClearAllOperator(){
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }
    processEqualOperator(){
        const operation = this.previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation);
    }

}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value == ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    })
});
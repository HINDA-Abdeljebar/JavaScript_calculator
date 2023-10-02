(function() {
    let screen = document.querySelector('.screen');
    let buttons = document.querySelectorAll('.btn');
    let clear = document.querySelector('.btn-clear');
    let equal = document.querySelector('.btn-equal');

    buttons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            const value = e.target.dataset.num;
            screen.value += value;
        });
    });

    equal.addEventListener('click', function(e) {
        if (screen.value === '') {
            screen.value = 'Please enter';
        } else {
            try {
                let result = evaluateExpression(screen.value);
                screen.value = result;
            } catch (error) {
                screen.value = 'Error';
            }
        }
    });
    
    function evaluateExpression(expression) {
        // Tokenize the expression into numbers and operators
        const tokens = expression.match(/(\d+\.\d+|\d+|[-+*/])/g);
        
        // Convert infix notation to reverse polish notation (postfix)
        const postfix = infixToPostfix(tokens);
        
        // Evaluate the postfix expression
        const result = evaluatePostfix(postfix);
        
        return result;
    }
    
    function infixToPostfix(tokens) {
        const output = [];
        const operators = [];
        
        const precedence = {
            '+': 1,
            '-': 1,
            '*': 2,
            '/': 2
        };
        
        tokens.forEach(token => {
            if (!isNaN(token)) {
                output.push(token);
            } else if (token in precedence) {
                while (operators.length > 0 && precedence[operators[operators.length - 1]] >= precedence[token]) {
                    output.push(operators.pop());
                }
                operators.push(token);
            }
        });
        
        while (operators.length > 0) {
            output.push(operators.pop());
        }
        
        return output;
    }
    
    function evaluatePostfix(postfix) {
        const stack = [];
        
        postfix.forEach(token => {
            if (!isNaN(token)) {
                stack.push(parseFloat(token));
            } else {
                const num2 = stack.pop();
                const num1 = stack.pop();
                switch (token) {
                    case '+':
                        stack.push(num1 + num2);
                        break;
                    case '-':
                        stack.push(num1 - num2);
                        break;
                    case '*':
                        stack.push(num1 * num2);
                        break;
                    case '/':
                        stack.push(num1 / num2);
                        break;
                }
            }
        });
        
        return stack[0];
    }
    
    
    
    clear.addEventListener('click', function(e) {
        screen.value = '';
    });
})();

function validateInput() {
    const input = document.getElementById('userInput').value.trim();
    const dfaResult = document.getElementById('dfaResult');
    const nfaResult = document.getElementById('nfaResult');

    dfaResult.textContent = '';
    nfaResult.textContent = '';

    if (input === "") {
        dfaResult.style.opacity = 0;
        nfaResult.style.opacity = 0;
        return;
    }

    let isDfaValid = false;
    let isNfaValid = false;

    if (dfaValidate(input)) {
        isDfaValid = true;
        if (/^\d+$/.test(input)) {
            dfaResult.textContent = `DFA: Valid Number for input string '${input}'`;
        } else if (/^[a-zA-Z]$/.test(input)) {
            dfaResult.textContent = `DFA: Valid Letter for input string '${input}'`;
        } else if (/^[a-zA-Z]+$/.test(input)) {
            dfaResult.textContent = `DFA: Valid Word for input string '${input}'`;
        } else {
            dfaResult.textContent = `DFA: Invalid for input string '${input}'`;
        }
    } else {
        dfaResult.textContent = `DFA: Invalid for input string '${input}'`;
    }

    if (nfaValidate(input)) {
        isNfaValid = true;
        if (/^\d+$/.test(input)) {
            nfaResult.textContent = `NFA: Valid Number for input string '${input}'`;
        } else if (/^[a-zA-Z]$/.test(input)) {
            nfaResult.textContent = `NFA: Valid Letter for input string '${input}'`;
        } else if (/^[a-zA-Z]+$/.test(input)) {
            nfaResult.textContent = `NFA: Valid Word for input string '${input}'`;
        } else {
            nfaResult.textContent = `NFA: Invalid for input string '${input}'`;
        }
    } else {
        nfaResult.textContent = `NFA: Invalid for input string '${input}'`;
    }

    animateResults(isDfaValid, isNfaValid);
}

function dfaValidate(input) {
    let currentState = "start";
    for (let char of input) {
        if (currentState === "start") {
            if (/\d/.test(char)) {
                currentState = "validNumber";
            } else if (/[a-zA-Z]/.test(char)) {
                currentState = "validWord";
            } else {
                return false;
            }
        } else if (currentState === "validNumber" && !/\d/.test(char)) {
            return false;
        } else if (currentState === "validWord" && !/[a-zA-Z]/.test(char)) {
            return false;
        }
    }
    return true;
}

function nfaValidate(input) {
    let currentStates = ["start"];
    for (let char of input) {
        let nextStates = [];
        for (let state of currentStates) {
            if (state === "start") {
                if (/\d/.test(char)) {
                    nextStates.push("validNumber");
                } else if (/[a-zA-Z]/.test(char)) {
                    nextStates.push("validWord");
                } else {
                    return false;
                }
            } else if (state === "validNumber" && /\d/.test(char)) {
                nextStates.push("validNumber");
            } else if (state === "validWord" && /[a-zA-Z]/.test(char)) {
                nextStates.push("validWord");
            }
        }
        currentStates = nextStates;
    }
    return currentStates.length > 0;
}

function animateResults(isDfaValid, isNfaValid) {
    const dfaResult = document.getElementById('dfaResult');
    const nfaResult = document.getElementById('nfaResult');

    dfaResult.style.opacity = 0;
    nfaResult.style.opacity = 0;

    if (isDfaValid) {
        dfaResult.classList.add('valid');
        dfaResult.classList.remove('invalid');
    } else {
        dfaResult.classList.add('invalid');
        dfaResult.classList.remove('valid');
    }

    if (isNfaValid) {
        nfaResult.classList.add('valid');
        nfaResult.classList.remove('invalid');
    } else {
        nfaResult.classList.add('invalid');
        nfaResult.classList.remove('valid');
    }

    setTimeout(() => {
        dfaResult.style.opacity = 1;
        nfaResult.style.opacity = 1;
    }, 300);
}

document.getElementById('clearButton').addEventListener('click', () => {
    document.getElementById('userInput').value = '';

    const dfaResult = document.getElementById('dfaResult');
    const nfaResult = document.getElementById('nfaResult');

    dfaResult.style.opacity = 0;
    dfaResult.textContent = '';
    dfaResult.classList.remove('valid', 'invalid');
    
    nfaResult.style.opacity = 0;
    nfaResult.textContent = '';
    nfaResult.classList.remove('valid', 'invalid');

    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
        button.style.transform = 'scale(1)';
    });

    document.getElementById('userInput').focus();
});

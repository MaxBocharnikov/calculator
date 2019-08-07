let tumbler = document.querySelector('.calc__button--skip');
const numbers = document.querySelectorAll('.calc__button--numbers');
const actions = document.querySelectorAll('.calc__button--action');
const calcText = document.querySelector('.calc__text');
let x = 0;
let actionType = null;
let y = 0;
let answer = null;


function setText(text) {
    calcText.textContent = text.toString().replace('.', ',');
}

function setActiveColor(event){
    event.target.classList.add('calc__button--action--active');
}

function removeActiveColor() {
    let activeAction = document.querySelector('.calc__button--action--active');
    if (activeAction) {
        activeAction.classList.remove('calc__button--action--active');
    }
}


numbers.forEach((number) => {
    number.addEventListener('click', (event) => {
        removeActiveColor();
        if (answer && !actionType) {
            x = 0;
            answer = null;
        }
        const numberVal = event.target.textContent;
        tumbler.textContent = 'C';
        if (!actionType) {
            if (x == 0) {
                x = '';
            }
            x += numberVal;
            setText(x);
        } else {
            if (y == 0) {
                y = '';
            }
            y += numberVal;
            setText(y);
        }
    });
});

actions.forEach((action) => {
    action.addEventListener('click', (event) => {
        removeActiveColor();
        let eventValue = event.target.attributes['data-action'].value;
        tumbler.textContent = 'C';
        switch (eventValue) {
            case 'equal':
                if (!y) {
                    return;
                }
                switch (actionType) {
                    case 'divide':
                        answer = +x / +y;
                        break;

                    case 'multiply':
                        answer = +x * +y;
                        break;

                    case 'minus':
                        answer = +x - +y;
                        break;

                    case 'plus':
                        answer = +x + +y;
                        break;

                    case 'percent':
                        answer = +x / 100 * +y;
                        break;
                }
                x = answer;
                actionType = null;
                y = 0;
                setText(answer);
                break;

            case 'sign':
                if (!y) {
                    x = +x * -1;
                    setText(x);
                } else {
                    y = +y * -1;
                    setText(y);
                }
                break;

            case 'comma':
                if (!y) {
                    x = x + '.';
                    setText(x);
                } else {
                    y = y + '.';
                    setText(y);
                }
                break;

            default:
                actionType = eventValue;
                setActiveColor(event);
                break;
        }
    });
});

tumbler.addEventListener('click', (event) => {
    removeActiveColor();
    x = 0;
    actionType = null;
    y = 0;

    event.target.textContent = 'AC';
    calcText.textContent = '0';
});




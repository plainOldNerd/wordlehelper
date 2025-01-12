/* words area */
const colors = ['green', 'yellow', 'black'];

const wordTouchHandler = tse => {
    tse.preventDefault();
    if( tse.target.style.backgroundColor === '') {
        tse.target.style.backgroundColor = 'green';
    } else {
        const color = tse.target.style.backgroundColor;
        tse.target.style.backgroundColor = colors[(colors.indexOf( color ) + 1) % 3]
    }
};

/* we'll override this in another file */
let enterKeyHandler = () => {};

/* keyboard */
const keyboard = [['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['xx', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Ent']];
let iSetup = 0, j = 0;
const keyboardTouchHandler = tse => {
    tse.preventDefault();
    const button = tse.target.id;
    switch(button) {
        case 'Ent': {
            enterKeyHandler();
            break;
        }
        case 'xx': {
            j = --j;
            // % operator doesn't work for negative numbers!!
            if( j == -1 && iSetup > 0 ) {
                j = 4;
                --iSetup;
            }

            let nextWordDiv = document.getElementById( 
                iSetup.toString() + j.toString()
            );
            nextWordDiv.innerHTML = '';
            break;
        }
        default:
            if( iSetup < 5 && j < 5) {
                let nextWordDiv = document.getElementById(
                    iSetup.toString() + j.toString()
                );
                nextWordDiv.innerHTML = button;

                j = ++j % 5;
                if( j == 0 ) ++iSetup;
            }
    }

};

/* add things where they need to be */
window.onload = () => {
    /* words area */
    let keysInputDiv = document.getElementById('keysInput');
    for(let iSetup = 0; iSetup < 5; ++iSetup) {
        for(let j = 0; j < 5; ++j) {
            let newDiv = document.createElement('div');
            newDiv.className = 'wordletters';
            newDiv.id = iSetup.toString() + j.toString();

            newDiv.addEventListener( 'click', wordTouchHandler );
            newDiv.addEventListener( 'touchstart', wordTouchHandler );

            keysInputDiv.appendChild(newDiv);
        }
        keysInputDiv.appendChild(document.createElement('br'));
    }

    /* keyboard */
    let keyboardDiv = document.getElementById('keyboard');
    for(let iSetup = 0; iSetup < 3; ++iSetup) {
        for(let j = 0; j < keyboard[iSetup].length; ++j) {
            let newDiv = document.createElement('div');
            newDiv.className = 'keyboardletters';
            newDiv.id = keyboard[iSetup][j];
            newDiv.innerHTML = keyboard[iSetup][j];

            newDiv.addEventListener( 'click', keyboardTouchHandler );
            newDiv.addEventListener( 'touchstart', keyboardTouchHandler );

            keyboardDiv.appendChild(newDiv);
        }
        keyboardDiv.appendChild(document.createElement('br'));
    }

    try {
        fetch('closeServer');
    }
    catch(e) {}
}

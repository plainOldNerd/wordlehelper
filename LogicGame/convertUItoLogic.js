enterKeyHandler = () => {
    let wordsInputDiv = document.getElementById('wordsInput'),
        wordsOutputDiv = document.getElementById('wordsOutput');
    wordsInputDiv.style.display = 'none';
    wordsOutputDiv.style.display = '';
    let wordsOutputList = document.getElementById('wordsOutputList');
    wordsOutputList.innerHTML = '';

    /*
        this function returns true if a letter appears (in the correct solution)
        exactly once, and false if zero, or two or more, times!
     */
    const lettersNotRepeatedFunction = (i2, j, letter, color) => {
        for(let j2 = 0; j2 < 5; ++j2) {
            if( j2 !== j ) {
                const compareLetterDiv = document.getElementById(
                    i2.toString() + j2.toString()
                );
                const compareLetter = compareLetterDiv.innerHTML,
                    compareColor = compareLetterDiv.style.backgroundColor;
                if( compareLetter === letter &&
                    (
                        compareColor === colors[2] && color !== colors[2] ||
                        compareColor !== colors[2] && color === colors[2]
                    )
                ) {
                    return true;
                }
            }
        }
        return false;
    };

    for(let i2 = iSetup - 1; i2 >= 0; --i2) {
        for(let j2 = 0; j2 < 5; ++j2) {
            const nextLetterDiv = document.getElementById(
                i2.toString() + j2.toString()
            );
            const color = nextLetterDiv.style.backgroundColor,
                letter = nextLetterDiv.innerHTML;

            switch( color ) {
                case colors[0]: {
                    if( lettersNotRepeatedFunction(i2, j2, letter, colors[0]) &&
                        !lettersNotRepeated.includes(letter)
                    ) {
                        lettersNotRepeated.push(letter);
                    }
                    correctWord[j2] = letter;
                    break;
                }
                case colors[1]: {
                    if( lettersNotRepeatedFunction(i2, j2, letter, colors[1]) &&
                        !lettersNotRepeated.includes(letter)
                    ) {
                        lettersNotRepeated.push(letter);
                    }
                    if(typeof correctWord[j2] === 'string' && 
                        correctWord[j2].length === 0
                    ) {
                        correctWord[j2] = [];
                    }
                    if( typeof correctWord[j2] === 'object' &&
                        !correctWord[j2].includes(letter)
                    )
                        correctWord[j2].push(letter);
                    break;
                }
                case colors[2]: {
                    if( lettersNotRepeatedFunction(i2, j2, letter, colors[2]) ) {
                        if(!lettersNotRepeated.includes(letter)) 
                            lettersNotRepeated.push(letter);
                    } else {
                        if(!lettersMissing.includes(letter))
                            lettersMissing.push(letter); 
                    }
                }
                default:
            }
        }
    }

    logic();

    possibleWords.forEach( word => {
        let newDiv = document.createElement('div');
        newDiv.innerHTML = word;
        wordsOutputList.appendChild( newDiv );
    });

    console.info(correctWord, lettersMissing, lettersNotRepeated);
};

const backButtonHandler = () => {
    let wordsInputDiv = document.getElementById('wordsInput'),
        wordsOutputDiv = document.getElementById('wordsOutput');
    wordsInputDiv.style.display = '';
    wordsOutputDiv.style.display = 'none';
};
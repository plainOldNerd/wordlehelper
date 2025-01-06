// let possibleWords = require('./wordlist');

let correctWord = ['', '', '', '', ''];
//let correctWord = ['', ['e'], ['c'], '', ['y']];
let lettersMissing = []; //['a', 'u', 'd', 'i', 'o', 't', 'h'];
// for letters that are known to appear once, not more, and not zero times
let lettersNotRepeated = [];

const logic = () => {
    let iWordle = 0;
    iLoop:
    while( iWordle < possibleWords.length) {
        const nextWord = possibleWords[iWordle];

        /* if a letter which should be missing is found */
        for( let j = 0; j < lettersMissing.length; ++j) {
            const letter = lettersMissing[j];
            if( nextWord.indexOf( letter ) !== -1 ) {
                possibleWords.splice(iWordle, 1);
                j = lettersMissing.length + 1;
                continue iLoop;
            }
        };

        for( j = 0; j < 5; ++j ) {
            const element = correctWord[j];
            // if we know what letter should be in place j //
            if( typeof element === 'string' ) {
                if( correctWord[j].length === 1 && nextWord[j] !== correctWord[j] ) {
                    possibleWords.splice(iWordle, 1);
                    continue iLoop;
                }
            // we have a list of letters which are correct, but NOT in place j //
            } else {
                for(let k = 0; k < element.length; ++k) {
                    if(
                        // a letter which we know to exist doesn't!
                        nextWord.indexOf( element[k] ) === -1 ||
                        // nextWord contains the letter, but in place j
                        nextWord.indexOf( element[k] ) === j ||
                        // nextWord contains the letter in a place that we already know in 
                        // correctWord!
                        typeof correctWord[ nextWord.indexOf( element[k] ) ] === 'string' &&
                        correctWord[ nextWord.indexOf( element[k] ) ].length === 1 ||
                        // place j in correctWord is a list which also contains element[k]
                        typeof correctWord[ nextWord.indexOf( element[k] ) ] === 'object' &&
                        correctWord[ nextWord.indexOf( element[k] ) ].indexOf( element[k]) !== -1
                    ) {
                        possibleWords.splice(iWordle, 1);
                        continue iLoop;
                    }
                }
            }
        };

        for( j = 0; j < lettersNotRepeated.length; ++j) {
            const letter = lettersNotRepeated[j];

            let index = nextWord.indexOf(letter);
            // letter should appear exactly once, not zero times
            if( index === -1 ) {
                possibleWords.splice(iWordle, 1);
                continue iLoop;
            }
            index = nextWord.indexOf(letter, index+1);
            // letter should not appear a second time
            if( index !== -1 ) {
                possibleWords.splice(iWordle, 1);
                continue iLoop;
            }
        }

        ++iWordle;
    }
}

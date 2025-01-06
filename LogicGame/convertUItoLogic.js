enterKeyHandler = () => {
    let wordsInputDiv = document.getElementById('wordsInput'),
        wordsOutputDiv = document.getElementById('wordsOutput');
    wordsInputDiv.style.display = 'none';
    wordsOutputDiv.style.display = '';
    let wordsOutputList = document.getElementById('wordsOutputList');
    wordsOutputList.innerHTML = '';

    logic();

    possibleWords.forEach( word => {
        let newDiv = document.createElement('div');
        newDiv.innerHTML = word;
        wordsOutputList.appendChild( newDiv );
    });
};

const backButtonHandler = () => {
    let wordsInputDiv = document.getElementById('wordsInput'),
        wordsOutputDiv = document.getElementById('wordsOutput');
    wordsInputDiv.style.display = '';
    wordsOutputDiv.style.display = 'none';
};
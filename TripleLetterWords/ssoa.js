possibleWords.forEach( word => {
    let letters = [], letterCount = [];
    for(let i = 0; i < 5; ++i) {
        if(!letters.includes(word[i])) {
            letters.push(word[i]);
            letterCount.push(1);
        } else {
            const index = letters.indexOf(word[i]);
            letterCount[index] += 1;
        }
    }
    const index = letterCount.indexOf(3);
    if(index !== -1) {
        console.log(word);
    }
});
const suits = [
    'hearts', 'spades', 'diamonds', 'clubs'
],
values = [
    '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'
];

let sortedDeck = [],
shuffledDeck = [];

const main = () => {
    clearTable();
    setCounter(1);
    createDeck();
    shuffleDeck();
    updateButton();
}

const clearTable = () => {
    document.getElementById('play-area').innerHTML = '';
}

const createDeck = () => {
    sortedDeck = [];

    for (let suit of suits) {
        for (let value of values) {
            sortedDeck.push({'suit': suit, 'value': value });
        }
    }
}

const shuffleDeck = () => {
    shuffledDeck = [];

    do {
        let randomIndex = Math.floor(Math.random() * sortedDeck.length);
        let randomCard = sortedDeck.splice(randomIndex, 1)[0];
        shuffledDeck.push(randomCard);
    } while (sortedDeck.length > 0)
}

const updateButton = () => {
    document.getElementById('deal-button').disabled = shuffledDeck.length === 0;
}

const dealCard = () => {
    let numberOfCards = getNumberOfCards();

    for (let i = 0; i < numberOfCards; i++) {
        if (shuffledDeck.length > 0) {
            let nextCard = shuffledDeck.pop();
            printCard(nextCard);
        }
    }

    updateCounter();
    updateButton();
}

const getNumberOfCards = () => {
    let numberInput = Number.parseInt(document.getElementById('card-count').value);
    
    return numberInput < 1 ? 1
        : numberInput > shuffledDeck.length ? shuffledDeck.length
        : numberInput;
}

const updateCounter = () => {
    let numberInput = Number.parseInt(document.getElementById('card-count').value);

    if (numberInput > shuffledDeck.length) {
        setCounter(shuffledDeck.length);
    }
    else if (numberInput < 0) {
        setCounter(0);
    }
}

const setCounter = (count) => {
    document.getElementById('card-count').value = count;
}

const printCard = (card) => {
    let cardClass = card.suit === 'hearts' || card.suit === 'diamonds' ? 'red-text' : '';

    document.getElementById('play-area').innerHTML += 
        `<li class='card'>
            <p class='${cardClass}'>${card.value}</p>
            <img src='img/${card.suit}.svg' />
        </li>`;
}

if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}
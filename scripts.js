'use strict';

const app = {
    suits: ['hearts', 'spades', 'diamonds', 'clubs'],
    values: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    sortedDeck: [],
    shuffledDeck: []
}

const main = () => {
    clearTable();
    setCounter(1);
    createDeck();
    shuffleDeck();
    updateButton();
}

const clearTable = () => {
    document.querySelector('#play-area').innerHTML = '';
}

const createDeck = () => {
    app.sortedDeck = [];
    app.suits.map((suit) => {
        app.values.map((value) => {
            app.sortedDeck.push({'suit': suit, 'value': value });
        });
    });
}

const shuffleDeck = () => {
    app.shuffledDeck = [];
    do {
        const randomIndex = Math.floor(Math.random() * app.sortedDeck.length);
        const randomCard = app.sortedDeck.splice(randomIndex, 1)[0];
        app.shuffledDeck.push(randomCard);
    } while (app.sortedDeck.length > 0)
}

const updateButton = () => {
    document.querySelector('#deal-button').disabled = app.shuffledDeck.length === 0;
}

const dealCard = () => {
    const numberOfCards = getNumberOfCards();
    for (let i = 0; i < numberOfCards; i++) {
        if (app.shuffledDeck.length > 0) {
            let nextCard = app.shuffledDeck.pop();
            printCard(nextCard);
        }
    }
    updateCounter();
    updateButton();
}

const getNumberOfCards = () => {
    const numberInput = Number.parseInt(document.querySelector('#card-count').value);
    return numberInput < 1 ? 1
        : numberInput > app.shuffledDeck.length ? app.shuffledDeck.length
        : numberInput;
}

const updateCounter = () => {
    const numberInput = Number.parseInt(document.querySelector('#card-count').value);
    if (numberInput > app.shuffledDeck.length) {
        setCounter(app.shuffledDeck.length);
    }
    else if (numberInput < 0) {
        setCounter(0);
    }
}

const setCounter = (count) => {
    document.querySelector('#card-count').value = count;
}

const printCard = (card) => {
    const cardClass = card.suit === 'hearts' || card.suit === 'diamonds' ? 'red-text' : '';
    document.querySelector('#play-area').innerHTML += 
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
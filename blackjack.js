let deck = [];
let playerHand = [];
let dealerHand = [];

const playerCards = document.getElementById("player-cards");
const dealerCards = document.getElementById("dealer-cards");
const playerScore = document.getElementById("player-score");
const dealerScore = document.getElementById("dealer-score");
const message = document.getElementById("message");

document.getElementById("btn-start").addEventListener("click", startGame);
document.getElementById("btn-hit").addEventListener("click", hit);
document.getElementById("btn-stand").addEventListener("click", stand);

function createDeck() {
    const suits = ["♠", "♥", "♦", "♣"];
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "V"];

    deck = [];

    for (let suit of suits) {
        for (let value of values) {
            deck.push({ value, suit });
        }
    }

    deck.sort(() => Math.random() - 0.5);
}

function getCardValue(card) {
    if (card.value === "A") return 11;
    if (["J", "Q", "V"].includes(card.value)) return 10;
    return parseInt(card.value);
}

function calculateScore(hand) {
    let score = 0;
    let aces = 0;

    hand.forEach(card => {
        score += getCardValue(card);
        if (card.value === "A") aces++;
    });

    while (score > 21 && aces > 0) {
        score -= 10;
        aces--;
    }

    return score;
}

function renderCards() {
    playerCards.innerHTML = "";
    dealerCards.innerHTML = "";

    playerHand.forEach(card => createCard(playerCards, card));
    dealerHand.forEach(card => createCard(dealerCards, card));

    playerScore.textContent = "Score: " + calculateScore(playerHand);
    dealerScore.textContent = "Score: " + calculateScore(dealerHand);
}

function createCard(container, card) {
    let div = document.createElement("div");
    div.className = "card";
    div.textContent = card.value + card.suit;
    container.appendChild(div);
}

function startGame() {
    createDeck();
    playerHand = [deck.pop(), deck.pop()];
    dealerHand = [deck.pop(), deck.pop()];
    message.textContent = "";
    renderCards();
}

function hit() {
    playerHand.push(deck.pop());
    renderCards();

    if (calculateScore(playerHand) > 21) {
        message.textContent = "You Busted!";
    }
}

function stand() {
    while (calculateScore(dealerHand) < 17) {
        dealerHand.push(deck.pop());
    }

    renderCards();

    let p = calculateScore(playerHand);
    let d = calculateScore(dealerHand);

    if (d > 21) message.textContent = "Dealer Busts! You win!";
    else if (p > d) message.textContent = "You Win!";
    else if (p < d) message.textContent = "You Lose!";
    else message.textContent = "Draw!";
}

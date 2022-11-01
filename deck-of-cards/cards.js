"use strict";
const $drawCardBtn = $("#draw-card-btn");
const $drawnCardsPile = $("#drawn-card");



async function getDeckOfCards() {
  const deck = await axios({ url: "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1" });
  return deck.data.deck_id;
}

async function drawCard(deckId) {
  console.log(deckId);
  const card1 = await axios({ url: `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1` });
  // const card2 = await axios({ url: `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1` });
  // console.log(card,"Card")
  console.log(card1.data.cards[0].value, card1.data.cards[0].suit);
  return card1.data.cards[0].image
}

async function handleDrawCard(deckId) {

  console.log("clicked")
  const image = await drawCard(deckId);
  showCard(image);
}

function showCard(image) {
  $drawnCardsPile.empty();
  $drawnCardsPile.append(`<img src=${image}>`);
}

async function startGame() {
  const deckId = await getDeckOfCards();
  $drawCardBtn.on("click",handleDrawCard.bind(null,deckId));
}

startGame()
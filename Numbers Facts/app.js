'use strict';

const $factsSection = $("#multNumFacts");
const $favoriteNumForm = $('#favoriteNumForm');
const $favoriteNum = $('#favoriteNum');
const $favNumFactsSection = $("#FavNumFacts");

/** This function makes a request to NumbersAPI for 4 random facts on numbers
 * and updates the DOM.
 */

async function getNumFacts() {
  const fact1p = axios({ url: 'http://numbersapi.com/random/trivia?json' });
  const fact2p = axios({ url: 'http://numbersapi.com/random/trivia?json' });
  const fact3p = axios({ url: 'http://numbersapi.com/random/trivia?json' });
  const fact4p = axios({ url: 'http://numbersapi.com/random/trivia?json' });

  let results = await Promise.allSettled([fact1p, fact2p, fact3p, fact4p]);
  showNumFacts(results, $factsSection);
}

/** takes a list  */
function showNumFacts(results, section) {

  for (const factp of results) {
    section.append(`<p>${factp.value.data.text}</p>`);
  }
}

getNumFacts();

$favoriteNumForm.on('submit', getFavNumFacts);

/** getFavNumFacts takes a favorite number input from the user and requests
 * 4 facts on the favorite number from the Numbers API. It passes the results
 * to showFavNumFacts to update the DOM.
 */

async function getFavNumFacts(evt) {
  evt.preventDefault();

  const favNum = $favoriteNum.val();

  const fact1p = axios({ url: `http://numbersapi.com/${favNum}/trivia?json` });
  const fact2p = axios({ url: `http://numbersapi.com/${favNum}/trivia?json` });
  const fact3p = axios({ url: `http://numbersapi.com/${favNum}/trivia?json` });
  const fact4p = axios({ url: `http://numbersapi.com/${favNum}/trivia?json` });

  let results = await Promise.allSettled([fact1p, fact2p, fact3p, fact4p]);

  showFavNumFacts(results);
}

/** Takes an array of results and updates the DOM to display the facts. */

function showFavNumFacts(results) {
  $favNumFactsSection.empty();

  showNumFacts(results, $favNumFactsSection);

  $favoriteNum.val("");
}


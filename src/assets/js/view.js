import { wait } from './helper.js';

import 'regenerator-runtime/runtime';

let cardContainer, timerDom, gameLayer, startBtn, resetBtn;
// let cardLayer;
const container = document.querySelector('.container');

let twoSelectedCards = [];
let allCards;
const defaultErrMsg =
  'Please check your internet connection or try again letter';

export const renderErr = function (msg = defaultErrMsg) {
  container.innerHTML = '';
  container.insertAdjacentHTML(
    'afterbegin',
    `<div class="user"><p style="font-size:1.8rem; word-spacing:.7rem">${msg}</p></div>`
  );
};

export const renderLoader = function () {
  const markup = `<div class="loader user"><img class="loader__img" src="https://cdn.dribbble.com/users/216925/screenshots/2044807/bolt.gif"></div>`;
  container.innerHTML = '';
  container.insertAdjacentHTML('afterbegin', markup);
};

export const renderGame = function (data) {
  console.log(data);
  const time = data.length ? Math.min(...data.map(el => el.time)) : undefined;
  const min = time ? `${Math.trunc(time / 60)}`.padStart(2, 0) : '';
  const sec = time ? `${time % 60}`.padStart(2, 0) : 'NOT DEFINED';

  const markup = `
  <div class="details">
        <div class="details__card">
          <div class="details__icons-box">
            <i class="far fa-clock details__icons"></i>
          </div>
          <span class="details__text" id="timer">00:00 min</span>
        </div>
        <div class="details__card">
          <div class="details__icons-box">
            <i class="fas fa-trophy details__icons"></i>
          </div>
          <span class="details__text">${min}:${sec} min</span>
        </div>
      
        </div>
        <div class="game">
        <div class="game__box">
          <div class="game__layer layer"></div>
        </div>
  </div>
      `;

  container.innerHTML = '';
  container.insertAdjacentHTML('afterbegin', markup);

  cardContainer = document.querySelector('.game__box');
  gameLayer = cardContainer.querySelector('.game__layer');
  timerDom = document.querySelector('#timer');
};

const changeBorderColor = function (color) {
  timerDom
    .closest('.details__card')
    .querySelector('.details__icons-box').style.borderColor = color;

  timerDom.style.borderColor = color;
};

export const showCards = function (card) {
  card.classList.add('cards--active');
};

const hideCard = function () {
  twoSelectedCards.forEach(el => el.classList.remove('cards--active'));
  twoSelectedCards = [];
};

const activateGameLayer = function () {
  gameLayer.classList.add('layer--active');
};

// const activateCardLayer = function () {
//   cardLayer.classList.add('layer--active');
// };

export const startTimer = function (timer) {
  timer();
};

export const insertCard = function (data) {
  const markup = `
  <div class="cards" data-id="${data.id}">
    <div class="cards__items cards__front"><img src="${data.img}"></div>
    <div class="cards__items cards__back"></div>
    <div class="cards__layer"></div>
  </div>
  `;
  cardContainer.insertAdjacentHTML('afterbegin', markup);
  allCards = cardContainer.querySelectorAll('.cards');
};

export const addHandlerCard = function (winGame) {
  cardContainer.addEventListener('click', async function (e) {
    // if (e.target.closest('.cards')) winGame();

    // Capturing clicked card
    const clickCard = e.target.closest('.cards');
    if (!clickCard || clickCard?.classList.contains('cards--active')) return;

    // cardLayer = clickCard.querySelector('.cards__layer');
    // check if user selected same cards
    const selection =
      twoSelectedCards.every(el => el.dataset.id === clickCard.dataset.id) &&
      !clickCard.classList.contains('cards--active');

    // Showing card
    showCards(clickCard);
    // activateCardLayer();

    twoSelectedCards.push(clickCard);

    if (twoSelectedCards.length !== 2) return;

    // Adding layer to prevent user to choose another card
    activateGameLayer();

    // if yes -> remove the layer to allow user to select another cards
    if (selection) {
      gameLayer.classList.remove('layer--active');
      twoSelectedCards = [];
    }

    // if no -> remove the layer after 2 seconds and hide the incorrect selected cards
    if (!selection) {
      await wait(2);
      gameLayer.classList.remove('layer--active');
      // cardLayer.classList.remove('layer--active');
      hideCard();
    }

    allCards = Array.from(cardContainer.querySelectorAll('.cards'));
    if (allCards.every(el => el.classList.contains('cards--active'))) {
      await wait(1);
      winGame();
    }
  });
};

let min, sec;
export const showTimer = function (time) {
  min = `${Math.trunc(time / 60)}`.padStart(2, '0');
  sec = `${time % 60}`.padStart(2, '0');
  timerDom.textContent = `${min}:${sec} min`;

  // if (time < 30) changeBorderColor('goldenrod');
  // if (time < 10) changeBorderColor('orangered');

  // if (!time) {
  //   changeBorderColor('red');
  //   allCards.forEach(el => {
  //     if (el.classList.contains('cards')) {
  //       activateGameLayer();
  //       showCards(el);
  //     }
  //   });
  // }
};

export const addHandlerStartGame = function (handler, getUser) {
  startBtn.addEventListener('click', function () {
    let userName = prompt('Your name');
    if (!userName) userName = 'Unknown';

    getUser(userName);
    container.innerHTML = '';
    handler();
  });
};

export const renderHtml = function (data) {
  const markup = `<div class="user">
  <h3 class="user__title">Highscore</h3>
  <table class="user__table" cellspacing="30px">
    <tr>
      <th>User name</th>
      <th>Timetaken</th>
    </tr>
    ${
      data.length
        ? data
            .map(
              el => `
    <tr>
      <td>${el.userName}</td>
      <td>${el.time} sec</td>
    </tr>
  `
            )
            .join('')
        : ` <tr>
      <th>Not found</th>
      <th>Not found</th>
    </tr>`
    }
  </table>
  <ul class="user__tips-list">
    <li class="user__tips-list-item">
      This game is build by <a href="">rohit kumar</a> for paracticing
      javascript skill
    </li>
    <li class="user__tips-list-item">
      The score depends on the time you had taken to solve the game
    </li>
    <li class="user__tips-list-item">
      The timer will start as you select start b  utton
    </li>
  </ul>
  <div class="user__btns">
    <button class="user__start" id="reset-btn">Reset Scores</button>
    <button class="user__start" id="start-btn">Start</button>
  </div>
  </div>`;

  container.innerHTML = '';
  container.insertAdjacentHTML('afterbegin', markup);
  startBtn = document.querySelector('#start-btn');
  resetBtn = document.querySelector('#reset-btn');
};

export const addHandlerReset = function (handler) {
  resetBtn.addEventListener('click', handler);
};

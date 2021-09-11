import { wait } from './helper.js';

import 'regenerator-runtime/runtime';

let twoSelectedCards = [];
let allCards;

const container = document.querySelector('.container');
const cardContainer = document.querySelector('.game__box');
const layer = cardContainer.querySelector('.cards__layer');
const timerDom = document.querySelector('#timer');

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

const activeLayer = function () {
  layer.classList.add('cards__layer--active');
};

export const startTimer = function (timer) {
  timer();
};

export const insertCard = function (data) {
  const markup = `
  <div class="cards" data-id="${data.id}">
    <div class="cards__items cards__front"><img src="${data.img}"></div>
    <div class="cards__items cards__back"></div>
  </div>
  `;
  cardContainer.insertAdjacentHTML('afterbegin', markup);
  allCards = cardContainer.querySelectorAll('.cards');
};

export const addHandlerCard = function () {
  cardContainer.addEventListener('click', async function (e) {
    // Capturing clicked card
    const clickCard = e.target.closest('.cards');
    if (!clickCard) return;

    // Showing card
    showCards(clickCard);
    twoSelectedCards.push(clickCard);

    if (twoSelectedCards.length !== 2) return;

    // Adding layer to prevent user to choose another card
    activeLayer();

    // check if user selected same cards
    const selection = twoSelectedCards.every(
      el => el.dataset.id === clickCard.dataset.id
    );

    // if yes -> remove the layer to allow user to select another cards
    if (selection) {
      layer.classList.remove('cards__layer--active');
      twoSelectedCards = [];
    }

    // if no -> remove the layer after 2 seconds and hide the incorrect selected cards
    if (!selection) {
      await wait(2);
      layer.classList.remove('cards__layer--active');
      hideCard();
    }
  });
};

let min, sec;
export const showTimer = function (time) {
  min = `${Math.trunc(time / 60)}`.padStart(2, '0');
  sec = `${time % 60}`.padStart(2, '0');
  timerDom.textContent = `${min}:${sec}`;

  if (time < 30) changeBorderColor('goldenrod');
  if (time < 10) changeBorderColor('orangered');

  if (!time) {
    changeBorderColor('red');
    allCards.forEach(el => {
      if (el.classList.contains('cards')) showCards(el);
    });
  }
};

export const renderGame = function () {
  const markup = `
  <div class="details">
        <div class="details__card">
          <div class="details__icons-box">
            <i class="far fa-clock details__icons"></i>
          </div>
          <span class="details__text" id="timer">00:00</span>
        </div>
        <div class="details__card">
          <div class="details__icons-box">
            <i class="fas fa-trophy details__icons"></i>
          </div>
          <span class="details__text">00:00</span>
        </div>
        <div class="details__btns">
          <button class="details__start" id="start">Start</button>
          <button class="details__end" id="end">End</button>
        </div>
        </div>
        <div class="game">
        <div class="game__box">
          <div class="cards__layer"></div>
        </div>
  </div>
      `;

      container.insertAdjacentElement
};

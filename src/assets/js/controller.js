import * as model from './model.js';
import * as view from './view.js';
import { wait } from './helper.js';

import 'regenerator-runtime/runtime';
import 'core-js/stable';

const controleArrangement = async function () {
  // Rendering game html
  view.renderGame();

  // Getting Imgs
  await model.getImgs([4, 4]);

  // Inserting cards
  model.state.game.imgsData.forEach(data => view.insertCard(data));

  view.addHandlerCard(controleWinner);

  view.startTimer(controleTimer);
};

const controleTimer = function () {
  // Starting main timer
  model.timer();

  // Starting another timer for updating time in dom each sec
  const interval = setInterval(() => {
    view.showTimer(model.state.play.time);
  }, 1000);
};

const controleUserName = function (user) {
  model.state.result.userName = user;
};

const controleWinner = function () {
  model.state.result.time = model.state.play.time;
  model.saveGame();

  view.renderHtml(model.state.usersData);
};

const controleLoadGame = function () {
  model.loadGame();
  view.renderHtml(model.state.usersData);
};

const init = function () {
  controleLoadGame();
  view.addHandlerStartGame(controleArrangement, controleUserName);
};
init();

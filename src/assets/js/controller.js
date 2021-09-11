import * as model from './model.js';
import * as view from './view.js';

import 'regenerator-runtime/runtime';
import 'core-js/stable';

const controleArrangement = async function () {
  // Getting Imgs
  await model.getImgs([4, 4]);
  // Inserting cards
  model.state.game.imgsData.forEach(data => view.insertCard(data));
};

const controleTimer = function () {
  // Starting main timer
  model.timer();

  // Starting another timer for updating time in dom each sec
  const interval = setInterval(() => {
    view.showTimer(model.state.play.time);
    if (!model.state.play.time) {
      clearInterval(interval);
    }
  }, 1000);
};

const init = function () {
  controleArrangement();
  view.addHandlerCard();
  view.startTimer(controleTimer);
};
init();

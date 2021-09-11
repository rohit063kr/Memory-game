import { API_INFO } from './config.js';
import { randomInt } from './helper.js';

import 'regenerator-runtime/runtime';

// Game state
export const state = {
  game: {
    imgsData: [],
  },
  play: {
    time: '',
  },
};

let imgs;
export const getImgs = async function (gridArr) {
  const requireImgsLength = Math.ceil(
    gridArr.reduce((acc, cur) => acc * cur, 1) / 2
  );
  // Getting response
  const res = await fetch(
    `${API_INFO.URL}?key=${API_INFO.KEY}&image_type=${API_INFO.TYPE}&per_page=${requireImgsLength}`
  );
  // Extracting data
  const data = await res.json();

  // Filling imgs & paths into temp
  imgs = data.hits
    .map(el => [
      { img: el.largeImageURL, id: el.id },
      { img: el.largeImageURL, id: el.id },
    ])
    .flat();

  // Filling random imgs & paths into game state
  for (let i = 0; i < requireImgsLength * 2; i++)
    state.game.imgsData.push(imgs.splice(randomInt(0, imgs.length), 1));

  state.game.imgsData = state.game.imgsData.flat();
};

export const timer = function () {
  let time = 2;
  const interval = setInterval(() => {
    state.play.time = time;
    if (!time) clearInterval(interval);

    time--;
  }, 1000);
};

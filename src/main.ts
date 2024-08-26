let startTime = Date.now();
let last = startTime;
let joystick = {
  ArrowDown: false,
  ArrowUp: false,
  ArrowLeft: false,
  ArrowRight: false,
};

const star = {
  x: 0,
  y: 0,
  element: document.querySelector('.star')!,
  scaleX: 1,
};

const ghost = {
  x: 50,
  y: 50,
  element: document.querySelector('.ghost')!,
  xSpeed: 0,
  ySpeed: 0,
};

const sprites = [ghost, star];

const update = (dt: number) => {
  const speed = 0.015;
  star.x = (star.x + speed * dt) % 640;
  star.y = (star.y + Math.sin(star.x * 0.6) / 2 + speed * dt) % 640;
  star.scaleX = Math.sin(star.x * 0.231);

  let gSpeed = 0.25;

  if (joystick.ArrowRight) {
    ghost.x = ghost.x + gSpeed * dt;
  }
  if (joystick.ArrowLeft) {
    ghost.x = ghost.x - gSpeed * dt;
  }
  if (joystick.ArrowDown) {
    ghost.y = ghost.y + gSpeed * dt;
  }
  if (joystick.ArrowUp) {
    ghost.y = ghost.y - gSpeed * dt;
  }
};

const render = () => {
  sprites.forEach((sprite) => {
    sprite.element.style.setProperty('--x', sprite.x + 'px');
    sprite.element.style.setProperty('--y', sprite.y + 'px');

    if ('scaleX' in sprite) {
      sprite.element.style.setProperty('--scaleX', sprite.scaleX);
    }
  });
};

const step = () => {
  let now = Date.now();
  let dt = Math.min(1000, now - last);
  update(dt);
  render();
  last = now;
  window.requestAnimationFrame(step);
};

let body = document.body;

const init = () => {
  console.log('I N I T');

  body.addEventListener('keydown', (event) => {
    console.log('XE', event.key);
    if (
      event.key === 'ArrowDown' ||
      event.key === 'ArrowUp' ||
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight'
    ) {
      joystick[event.key] = true;
      console.log(joystick);
    }
  });

  body.addEventListener('keyup', (event) => {
    if (
      event.key === 'ArrowDown' ||
      event.key === 'ArrowUp' ||
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight'
    ) {
      joystick[event.key] = false;
    }
  });

  step();
};

init();
console.log('EOF');

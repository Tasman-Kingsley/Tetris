const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);

const matrix = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0],
];

function createMatrix(w, h) {
  const matrixCreate = [];
  while (h--) {
    matrixCreate.push(new Array(w).fill(0));
  }
  return matrixCreate;
}

function drawMatrix(matrixDraw, offset) {
  matrixDraw.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = 'red';
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}

function merge(arena, player) {
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        arena[y + player.pos.y][x + player.pos.x] = value;
      }
    });
  });
}

const arena = createMatrix(12, 20);
console.log(arena); console.table(arena);

const player = {
  pos: { x: 5, y: 5 },
  matrix,
};

function draw() {
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);

  drawMatrix(player.matrix, player.pos);
}

let dropCounter = 0;
const dropInterval = 1000;

let lastTime = 0;

function playerDrop() {
  player.pos.y += 1;
  dropCounter = 0;
}

function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;

  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    playerDrop();
  }

  draw();
  requestAnimationFrame(update);
}

update();

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 37) {
    player.pos.x -= 1;
  } else if (event.keyCode === 39) {
    player.pos.x += 1;
  } else if (event.keyCode === 40) {
    playerDrop();
  }
});

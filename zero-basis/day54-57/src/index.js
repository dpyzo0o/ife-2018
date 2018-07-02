import './css/main.css';
import Factory from './modules/Factory';

// container: pixel, field: meter
const field = Factory.getInstance(Factory.FOOTBALLFIELD, {
  containerWidth: 800,
  containerHeight: 600
});

field.render();

const player1 = Factory.getInstance(Factory.PLAYER, {
  x: 10,
  y: 10,
  vNum: 90
}).init();
const player2 = Factory.getInstance(Factory.PLAYER, {
  x: 10,
  y: 20,
  vNum: 80
}).init();

player1.runTo(100, 10);
player2.runTo(100, 20);

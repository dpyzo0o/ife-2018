import './css/main.css';
import Factory from './modules/Factory';

// container: pixel, field: meter
const field = Factory.getInstance(Factory.FOOTBALLFIELD, {
  containerWidth: 800,
  containerHeight: 600
});

field.render();

const player1 = Factory.getInstance(Factory.PLAYER).init();

player1.runTo(10, 10);

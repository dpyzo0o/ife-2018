import './css/main.css';
import Factory from './modules/Factory';

// container: pixel, field: meter
const field = Factory.getInstance(Factory.FootballField, {
  containerWidth: 800,
  containerHeight: 600,
  fieldWidth: 68,
  fieldLength: 105
});

field.init();

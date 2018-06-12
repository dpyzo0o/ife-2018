// Abstract class
export default class Staff {
  constructor(config) {
    if (new.target === Staff) {
      throw new Error('You cannot instantiate an abstract class!');
    }
    // generate a unique id
    this.id = Math.random().toString(36).substr(2, 16);
    this.name = config.name;
    this.salary = config.salary;
  }

  work() {
    throw new Error('You cannot call an abstract method!');
  }
}

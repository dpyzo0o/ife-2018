export default class Restaurant {
  constructor(config) {
    this.cash = config.cash;
    this.seats = config.seats;
    this.staff = config.staff;
    this.customerQueue = config.customerQueue;
  }

  hire(staff) {
    this.staff.push(staff);
    this.cash -= staff.salary;
  }

  fire(staff) {
    this.staff.splice(this.staff.indexOf(staff), 1);
    this.cash += staff.salary;
  }

  nextCustomer() {
    return this.customerQueue.shift();
  }

  initView() {
    for (let staff of this.staff) {
      switch (staff.constructor.name) {
        case 'Cook':
          let cookImg = new Image();
          cookImg.src = staff.img;
          document.querySelector('.kitchen').appendChild(cookImg);
          break;
        case 'Waiter':
          let waiterImg = new Image();
          waiterImg.src = staff.img;
          waiterImg.setAttribute('id', staff.id);
          document.querySelector('.dining-area').appendChild(waiterImg);
          break;
      }
    }
    for (let customer of this.customerQueue) {
      let customerImg = new Image();
      customerImg.src = customer.img;
      customerImg.setAttribute('id', customer.id);
      document.querySelector('.waiting-area').appendChild(customerImg);
    }
  }
}

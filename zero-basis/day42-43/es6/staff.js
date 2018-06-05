class Staff {
  constructor(name, salary) {
    this.id = Math.random().toString(36).substr(2, 16);
    this.name = name;
    this.salary = salary;
  }

  doJob() {
    console.log('Staff work done.');
  }
}

function Staff(name, salary) {
  // generate a unique id
  this.id = Math.random().toString(36).substr(2, 16);
  this.name = name;
  this.salary = salary;
}

Staff.prototype.work = function() {
  console.log('Staff work done.');
};

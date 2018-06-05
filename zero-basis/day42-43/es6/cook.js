class Cook extends Staff {
  constructor(name, salary) {
    super(name, salary);
  }

  doJob() {
    console.log('Dish is cooked.');
  }
}

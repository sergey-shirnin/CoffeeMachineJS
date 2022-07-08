const input = require('sync-input');

class Machine {
  constructor(water, coffeeBeans, milk, disposableCups, money) {
    this.water = water;
    this.coffeeBeans = coffeeBeans;
    this.milk = milk;
    this.disposableCups = disposableCups;
    this.money = money;
    this.currentVariety = [...new Array(recipes.length).keys()].map(i => `${i} - ${recipes[i].id}`).slice(1).join(', ')
  }

  getStatus() {
    console.log('\nThe coffee machine has:\n');
    console.log(`${this.water} ml of water`);
    console.log(`${this.milk} ml of milk`);
    console.log(`${this.coffeeBeans} g of coffee beans`);
    console.log(`${this.disposableCups} disposable cups`);
    console.log(`$${this.money} of money\n`);
  }

  updateResources(what) {
    const mode = what.price === 0 ? -1 : 1;
    this.water -= what.water * mode;
    this.milk -= what.milk* mode;
    this.coffeeBeans -= what.coffeeBeans * mode;
    this.disposableCups -= what.disposableCups * mode;
    this.money += what.price * mode;
  }
  
  preBuyResourcesSummary(coffeeSelection) {
    return Object.keys(coffeeMachine)
      .filter(k => coffeeMachine[k] < coffeeSelection[k])
      .reduce((arr, k) => ({ ...arr, [k]: coffeeSelection[k] - coffeeMachine[k]}), {});
    }
  
  buyCoffee() {
    console.log(`\nWhat do you want to buy? ${this.currentVariety}, back - to main menu:`)
    const menuChoice = input();
    if (menuChoice === 'back') return;
    const toAddResourcesSummary = this.preBuyResourcesSummary(recipes[menuChoice]);
    const lowResourcesNames = Object.keys(toAddResourcesSummary).join(', ');
    if (lowResourcesNames) { 
      console.log(`Sorry, not enough ${lowResourcesNames}!\n`)
      } else { 
      console.log('I have enough resources, making you a coffee!\n');
      this.updateResources(recipes[menuChoice]) }
  }

  fillMachine() {
    let refillData = new Array();
    for (let msg of [
      'Write how many ml of water you want to add:',
      'Write how many ml of milk you want to add:',
      'Write how many grams of coffee beans you want to add:',
      'Write how many disposable coffee cups you want to add:',
      ]) { 
        console.log(msg);
        refillData.push(input());
    };
    this.updateResources(new Product(...refillData))
  }

  withdrawMoney() {
    console.log(`I gave you $${this.money}\n`);
    this.money = 0;
  }
  
  main(mainMenuChoice='') {
    while (mainMenuChoice != 'exit') {
      mainMenuChoice = input(`Write action (buy, fill, take, remaining, exit):`);
      if (mainMenuChoice == 'buy') {
        this.buyCoffee();
      } else if (mainMenuChoice == 'fill') {
        this.fillMachine();
      } else if (mainMenuChoice == 'take') {
        this.withdrawMoney();
      } else if (mainMenuChoice == 'remaining') {
        this.getStatus();
    }
  }
}
}

class Product {
  constructor(water, coffeeBeans, milk, disposableCups, price=0, id) {
    this.water = water;
    this.coffeeBeans = coffeeBeans;
    this.milk = milk;
    this.disposableCups = disposableCups
    this.price = price;
    this.id = id;
  }
}
    
let recipes = ['Water, Coffee, Milk, Cups',
  new Product(250, 16, 0, 1, price=4, id='espresso'),
  new Product(350, 20, 75, 1, price=7, id='latte'),
  new Product(200, 12, 100, 1, price=6, id='cappuchino')
  ]
let coffeeMachine = new Machine(400, 120, 540, 9, 550);

coffeeMachine.main();

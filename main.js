const input = require('sync-input');

startUp = true

upperRegex = /(?=[A-Z])/
spaceRegex = /\s+/g
oneSpace = ' '
spacedCoffee = `${oneSpace}coffee${oneSpace}`

function mainMenu() {
  console.log('\nWrite action (buy, fill, take):')
  return input();
}

let getStatus = () => {
  if (!startUp) { console.log() }
  console.log(`The coffee machine has:`);
  Object.entries(machineResources).forEach(([k, v]) => {
    let unitOfMeasure = 
      (k == 'disposableCups') ? oneSpace
      : (k == 'money') ? 'of'
      : (k == 'coffeeBeans') ? 'gr of' 
      : 'ml of';
    let statusMsg = `${v} ${unitOfMeasure} ${k.split(upperRegex).join(oneSpace).toLowerCase()}`;
    console.log(statusMsg.replace(spaceRegex, oneSpace));
  });
  startUp = false;
}


let buyCoffee = () => {
  console.log('What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino:')
  let ind = Number(input()) - 1;
  Object.entries(coffeeSelection[ind]).forEach(([ingredient, amount]) => {
  machineResources[ingredient] -= amount;
});
  getStatus();
}

let fillMachine = () => {
  for (k of Object.keys(machineResources)) {
    if (k == 'money') break;
    let unitOfMeasure = 
      (k == 'disposableCups') ? oneSpace
      : (k == 'money') ? 'of'
      : (k == 'coffeeBeans') ? 'grams of' 
      : 'ml of';
    let displayResource = 
      (k == 'disposableCups') ? k.split(upperRegex).join(spacedCoffee)
      : k.split(upperRegex).join(oneSpace)
    let fillMsg = `Write how many ${unitOfMeasure} ${displayResource.toLowerCase()} you want to add:`.replace(spaceRegex, oneSpace)
    console.log(fillMsg);
    machineResources[k] += Number(input());
  };
  getStatus();                                         
}

let withdrawMoney = () => {
  console.log(`I gave you $${machineResources.money}`);
  machineResources.money = 0;
  getStatus();
}

const main = () => {
  getStatus()
  let mainMenuChoice = mainMenu();
  if (mainMenuChoice == 'buy') {
    buyCoffee();
  } else if (mainMenuChoice == 'fill') {
    fillMachine();
  } else if (mainMenuChoice == 'take') {
    withdrawMoney();
  } else { console.log('unknown error')};
}

// editable scope

let machineResources = {
  water : 400,
  milk : 540,
  coffeeBeans : 120,
  disposableCups : 9,
  money : 550
}

const coffeeSelection = [
  // espresso
  {
    water : 250,
    coffeeBeans : 16,
    disposableCups : 1,
    money : -4
  },
  // latte
  {
    water : 350,
    milk : 75,
    coffeeBeans : 20,
    disposableCups : 1,
    money : -7
  },
  // cappuccino
  {
    water : 200,
    milk : 100,
    coffeeBeans : 12,
    disposableCups : 1,
    money : -6
  },
]

//*exec/
main()
                                                      

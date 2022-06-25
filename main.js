const input = require('sync-input');

let machineResources = {
  water : 0,
  milk : 0,
  coffeeBeans : 0
}

const regCoffeeRecipe = {
  water : 200,
  milk : 50,
  coffeeBeans : 15
}

Object.keys(machineResources).forEach(k => {
  let unitOfMeasure = (k == 'coffeeBeans') ? 'gr' : 'ml'
  console.log(`Write how many ${unitOfMeasure} of ${k} the coffee machine has:`)
  let entry = Number(input())
  machineResources[k] = entry;
});

console.log('Write how many cups of coffee you will need:')
let userNumOfCups = Number(input());

let cupsPerResources = []
Object.keys(machineResources).forEach(k => {
  cupsPerResources.push(~~(machineResources[k] / regCoffeeRecipe[k]))
});

const machineNumOfCups = Math.min.apply(Math, cupsPerResources);

let brewMsg = (machineNumOfCups < userNumOfCups) ? `No, I can make only ${machineNumOfCups} cups of coffee`
  : (machineNumOfCups > userNumOfCups) ? `Yes, I can make that amount of coffee (and even ${machineNumOfCups - userNumOfCups} more than that)`
  : "Yes, I can make that amount of coffee "

console.log(brewMsg)

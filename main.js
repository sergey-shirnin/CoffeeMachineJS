const input = require('sync-input');

const regCoffeeRecipe = {
  water : 200,
  milk : 50,
  coffeeBeans : 15
}

let userNumOfCups = input('Write how many cups of coffee you will need:\n')

console.log(`For ${userNumOfCups} cups of coffee you will need:\n`)
for (const [ingredient, quantity] of Object.entries(regCoffeeRecipe)) {
  let unitOfMeasure = (ingredient == 'coffeeBeans') ? 'gr' : 'ml'
  console.log(`${userNumOfCups * quantity} ${unitOfMeasure} of ${ingredient}`)
}

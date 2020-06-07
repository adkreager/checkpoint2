const fetch = require('node-fetch');
let fs = require("fs");

//1. Create a command line application that processes a file list of pokemon names (each name seperated by a new line) and logs each Pokemon's types (for some there are many) according to the pokeapi.co API.
//2. This is an assessment of both your understanding of the course material so far and your ability to independently problem solve and use the internet/other resources to implement anything you don't understand.
//Example file input (input.txt)

//charizard
//pikachu
//Example console output:

//Charizard: flying, fire
//Pikachu: electric

function pokeList(input) {
  // get data from the input file
  fs.readFile(input, (err, data) => {
      // if no data is found, error message
      if (err) {
          console.err('ERROR');
          return;
      }
      // else, create a promise
      // converts the input data into a string, and splits that string into an array
      Promise.all(data.toString().split("\n")
          // maps the data from the array to create an array of objects pulled from the API
          .map(pokemon => {
              return fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon)
                  .then(res => {
                      // if the pokemon is found, converts the pokemon to json
                      if (res.ok) {
                          return res.json()
                      // if not found, the data for that pokemon is this error string
                      } else {
                          throw new Error('No data found for ' + pokemon)
                      }
                  })
                  // maps the array again, creating the output string for each array element
                  // POKEMON: TYPES(connected by commas)
                  .then(pokeData => {
                      return pokemon + ': ' + pokeData.types.map(pokeType => pokeType.type.name).join(", ")
                  })
                  // if the above function doesn't work, the type will be displayed as an error message
                  .catch(error => {
                      return pokemon + ': ' + error.message;
                  })
          }))

          .then(results => {
              results.forEach((item) => {
                  console.log(item);
              })
          })
          .catch(error => {
              console.log(error)
          })
  })
}

pokeList('input.txt');

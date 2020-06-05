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

function logPokemonAndTypes(input) {
 // get list of pokemon names from input text file
  let pokemonList = [];
  let data = fs.readFileSync(input)
  let nameArray = data.toString().split('\n');

 // cycling through the name array, fetch the data for the respective names and push to list of pokemon
  for(let i = 0; i < nameArray.length; i++) {
    fetch('https://pokeapi.co/api/v2/pokemon/' + nameArray[i])
    .then(response => response.json())
    .then(json => pokemonList.push(json))
  };
 // log data to console
 console.log(nameArray);
 console.log(pokemonList);
}

logPokemonAndTypes('input.txt');

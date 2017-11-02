var express = require('express');
var request = require('request');
var Pokedex = require('pokedex-promise-v2');
var pokemon = require("./pokemon.json");
var poke_info = new Pokedex();
var router = express.Router();

router.get('/', function(req, res, next) {
  poke_info.getPokemonByName('bulbasaur')
  .then(function(response) {
    res.render('index', { title: 'Pokedex', pokemon: pokemon, current: response});
  })
  .catch(function(error) {
    console.log('There was an ERROR: ', error);
  });
});

router.get('/pokedex', function(req, res, next) {
  if (req.query.search == "mew")
  {
    poke_info.getPokemonByName("mew")
    .then(function(response) {
      res.status(200).json(response);
    })
    .catch(function(error) {
      console.log('There was an ERROR: ', error);
      res.status(500).json({error: error});
    });
  }

  else if (req.query.search == "pidgeot")
  {
    poke_info.getPokemonByName("pidgeot")
    .then(function(response) {
      res.status(200).json(response);
    })
    .catch(function(error) {
      console.log('There was an ERROR: ', error);
      res.status(500).json({error: error});
    });
  }

  else if (req.query.search == "kabuto")
  {
    poke_info.getPokemonByName("kabuto")
    .then(function(response) {
      res.status(200).json(response);
    })
    .catch(function(error) {
      console.log('There was an ERROR: ', error);
      res.status(500).json({error: error});
    });
  }

  else
  {
    var regex = new RegExp("^" + req.query.search.charAt(0).toUpperCase() + req.query.search.slice(1));
    for(var i=0; i < pokemon.length; i++)
    {

      var result = pokemon[i].name.search(regex);
      if(result != -1)
      {
        poke_info.getPokemonByName(pokemon[i].name.toLowerCase())
        .then(function(response) {
          res.status(200).json(response);
        })
        .catch(function(error) {
          console.log('There was an ERROR: ', error);
          res.status(500).json({error: error});
        });
      }
    }
  }
});

module.exports = router;

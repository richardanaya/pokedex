var store = new Kamea();

var pokemon = store.domain("pokemon",{
  current: -1,
  loading: true,
  pokemon_references: []
})

pokemon.action("load_pokemon_page",function(state,action,commit){
  var request = new XMLHttpRequest();
  request.open('GET', "http://pokeapi.co/api/v2/pokemon/", true);
  request.onload = function() {
    if (request.status == 200) {
      commit(function(state){
        var json = JSON.parse(request.responseText);
        state.set("pokemon_references",json);
        state.set("loading",false);
      })
    }
  };
  request.send();
})

pokemon.action("select_pokemon",function(state,action,commit){
  state.set("loading",true);
  var idx = action.data.index;
  var pokemon_ref = state.pokemon_references[idx];
  var request = new XMLHttpRequest();
  request.open('GET', "pokemon_ref.url", true);
  request.onload = function() {
    if (request.status == 200) {
      commit(function(state){
        var json = JSON.parse(request.responseText);
        state.set("loading",false);
        state.set("current",idx);
        state.pokemon_references.set(idx,json);
      })
    }
  };
  request.send();
})

pokemon.action("go_to_pokedex",function(state,action,commit){
  state.set("current",-1);
})

var store = new Kamea();

var pokemon = store.domain("pokemon",{
  current: -1,
  loading: true,
  pokemon_references: []
})

pokemon.action("load_pokemon_page",function(state,action,commit){
  fetch("http://pokeapi.co/api/v2/pokemon/")
  .then(function(result){
    return result.json();
  }).then(function(data){
    commit(function(state){
      state.set("pokemon_references",data.results);
      state.set("loading",false);
    })
  })
})

pokemon.action("select_pokemon",function(state,action,commit){
  state.set("loading",true);
  var idx = action.data.index;
  var pokemon_ref = state.pokemon_references[idx];
  fetch(pokemon_ref.url)
  .then(function(result){
    return result.json();
  }).then(function(data){
    commit(function(state){
      state.set("loading",false);
      state.set("current",idx);
      state.pokemon_references.set(idx,data);
    })
  })
})

pokemon.action("go_to_pokedex",function(state,action,commit){
  state.set("current",-1);
})

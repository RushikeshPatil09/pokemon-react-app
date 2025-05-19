import { useEffect, useState } from "react";
import { PokemonCards } from "./pokemonCards";

export const Pokemon = () => {
const API = "https://pokeapi.co/api/v2/pokemon?limit=30";
     const[pokemon,setPokemon ] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error,setError] = useState(null);
     const [search,setSearch] = useState("");

     const fetchPokemon  = async () => {
        try {

        const res =  await fetch(API)
        const data =  await res.json();
        

        const pokemondetails = data.results.map( async (curPokemon) => {
         const res = await  fetch(curPokemon.url);
         const data = await res.json();
         return data;
        }) 

        const detailedResponse =  await Promise.all(pokemondetails);
        setPokemon(detailedResponse);
        setLoading(false);
         console.log(detailedResponse);   
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(error);
        }
     }

        useEffect(() => {
            fetchPokemon();
            
        },[]);


        // Search functionallity

        const searchData = pokemon.filter((curPokemon) => 
        curPokemon.name.toLowerCase().includes(search.toLowerCase())
        );


        if(loading){
            return  (
                <div>
                <h1>Loading...</h1>
                </div>
            )  
        }
  if(error){
    return (
        <div>
            <h1>{error.message}</h1>
        </div>
    )
  }
    return (
       <section className="container">

        <header>
            <h1>Lets Catch Pokemon</h1>
        </header>
        <div className="pokemon-search">
            <input type="text" placeholder="Search Pokemon" value={search} onChange={(e) => setSearch(e.target.value)}/>
        </div>
        <div>
             <ul className="cards">
            {/* {pokemon.map((curPokemon) => { */}
            {
            searchData.map((curPokemon) => {
              return (
                <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
              );
            })
            }
          </ul>
        </div>

       </section>
      
    )
}
import React, {useEffect, useState} from 'react'
import '../Style/Home.css';
import Recipe from './Recipe';
import { Grid, Button, Input  } from '@mantine/core';

const Home =  () => {


    const APP_ID = "fa9b138c";
    const APP_KEY = "d4053ec9740c015d592ce1b07092617a";
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("french");
    useEffect(() => {
        getRecipes();
    }, [query])
    const getRecipes = async () => {
        const response = await fetch
        (`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
        const data = await response.json();
        setRecipes(data.hits);
         console.log(data);

    };

    const updateSearch = e => {
        setSearch(e.target.value);
    };
    const getSearch = e => {
        e.preventDefault();
        setQuery(search);
        setSearch("");
    }

    return (
        <div className="App">
            <form className="search-form" onSubmit={getSearch}>

                <Input
                    type="text"
                    value={search}
                    onChange={updateSearch}
                    placeholder="Un plat, une envie, une recette ..."
                    style={{width: "40%"}}
                />
                <Button type="submit" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Rechercher</Button>
            </form>
            <div className="recipes">
                <Grid>
                    {recipes.map(recipe => (
                        <Grid.Col span={4}>
                            <Recipe
                                key={recipe.recipe.label}
                                title={recipe.recipe.label}
                                calories={recipe.recipe.calories}
                                image={recipe.recipe.image}
                                ingredients={recipe.recipe.ingredients}
                                id={recipe.recipe.uri}
                            />
                        </Grid.Col>
                    ))}
                </Grid>
            </div>
        </div>
    );
}

export default Home;

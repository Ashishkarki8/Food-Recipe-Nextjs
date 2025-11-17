"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import classes from "./page.module.css";
import Link from "next/link";
import debounce from "lodash.debounce";

const MealsPage = () => {
  const [data, setData] = useState({
    inputField: "",
    isLoading: false,
    recipeData: null,
    error: null,
  });

  const [filters, setFilters] = useState({
    cuisine: "",
    diet: "",
    sortBy: "popular"
  });

  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(savedFavorites);
  }, []);

  // Save favorites to localStorage
  const toggleFavorite = (recipe) => {
    const isFavorite = favorites.some(fav => fav.id === recipe.id);
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter(fav => fav.id !== recipe.id);
    } else {
      newFavorites = [...favorites, recipe];
    }
    
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const isFavorite = (recipeId) => {
    return favorites.some(fav => fav.id === recipeId);
  };

  useEffect(() => {
    const fetchRecipes = debounce(async () => {
      if (data.inputField.length >= 3) {
        setData((prevData) => ({ ...prevData, isLoading: true, error: null }));

        try {
          // Build query parameters properly - NO NESTING!
          const params = new URLSearchParams({
            from: '0',
            size: '12',
            q: data.inputField,
          });

          // Add optional filters
          if (filters.cuisine) {
            params.append('tags', filters.cuisine);
          }
          
          if (filters.diet) {
            params.append('tags', filters.diet);
          }

          // Build the URL - pass params DIRECTLY
          const url = `/api/search?${params.toString()}`;
          
          console.log("🔍 Fetching:", url);

          let response = await fetch(url);

          if (!response.ok) {
            throw new Error("Failed to fetch recipes");
          }

          const result = await response.json();
          
          console.log("✅ Results:", result);
          
          setData((prevData) => ({
            ...prevData,
            recipeData: result,
            isLoading: false,
            error: null,
          }));
        } catch (error) {
          console.error("❌ Error:", error);
          setData((prevData) => ({
            ...prevData,
            isLoading: false,
            error: error.message,
          }));
        }
      }
    }, 500);

    fetchRecipes();

    return () => {
      fetchRecipes.cancel();
    };
  }, [data.inputField, filters]);

  const handleInputChange = (e) => {
    setData({ ...data, inputField: e.target.value });
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created <span className={classes.highlight}>by you</span>
        </h1>
        <p>Choose your favourite recipe and cook it yourself</p>

        <div className={classes.searchContainer}>
          <label htmlFor="dishName">
            Search Dish Name:
            <input 
              type="text" 
              id="dishName"
              value={data.inputField} 
              onChange={handleInputChange} 
              placeholder="e.g. pizza, pasta, salad..."
            />
          </label>

          <div className={classes.filters}>
            <select 
              value={filters.cuisine} 
              onChange={(e) => handleFilterChange("cuisine", e.target.value)}
              className={classes.filterSelect}
            >
              <option value="">All Cuisines</option>
              <option value="italian">Italian</option>
              <option value="mexican">Mexican</option>
              <option value="asian">Asian</option>
              <option value="american">American</option>
              <option value="indian">Indian</option>
            </select>

            <select 
              value={filters.diet} 
              onChange={(e) => handleFilterChange("diet", e.target.value)}
              className={classes.filterSelect}
            >
              <option value="">All Diets</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="gluten-free">Gluten Free</option>
              <option value="low-carb">Low Carb</option>
            </select>

            <select 
              value={filters.sortBy} 
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className={classes.filterSelect}
            >
              <option value="popular">Most Popular</option>
              <option value="recent">Most Recent</option>
            </select>
          </div>

          <Link href="/meals/favorites" className={classes.favoritesLink}>
            ❤️ View Favorites ({favorites.length})
          </Link>
        </div>
      </header>

      <div className={classes.main}>
        <div className={classes.meals}>
          {data.isLoading && (
            <>
              {[...Array(6)].map((_, i) => (
                <div key={i} className={classes.skeleton}>
                  <div className={classes.skeletonImage}></div>
                  <div className={classes.skeletonText}></div>
                  <div className={classes.skeletonText}></div>
                </div>
              ))}
            </>
          )}
          
          {data.error && (
            <div className={classes.error}>
              <p>⚠️ Error: {data.error}</p>
              <p>Please try again later.</p>
            </div>
          )}
          
          {!data.isLoading && !data.recipeData && !data.error && (
            <div className={classes.emptyState}>
              <p>🔍 Search for recipes to get started!</p>
              <p>Try searching for "pizza", "pasta", or "salad"</p>
            </div>
          )}

          {!data.isLoading && data.recipeData && data.error === null ? (
            data.recipeData.count === 0 ? (
              <div className={classes.emptyState}>
                <p>😕 No recipes found</p>
                <p>Try different search terms or filters</p>
              </div>
            ) : (
              data.recipeData.results.map((recipe, index) => (
                <article key={index} className={classes.meal}>
                  <button 
                    className={`${classes.favoriteBtn} ${isFavorite(recipe.id) ? classes.favorited : ''}`}
                    onClick={() => toggleFavorite(recipe)}
                    title={isFavorite(recipe.id) ? "Remove from favorites" : "Add to favorites"}
                  >
                    {isFavorite(recipe.id) ? "❤️" : "🤍"}
                  </button>
                  
                  <header>
                    <div className={classes.image}>
                      <Image
                        src={recipe.thumbnail_url}
                        alt={recipe.name || "Recipe image"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className={classes.headerText}>
                      <h2>{recipe?.name}</h2>
                      <p className={classes.author}>
                        {recipe.credits?.map((creditor) => creditor.name).join(", ")}
                      </p>
                      {recipe.total_time_minutes && (
                        <p className={classes.cookTime}>
                          ⏱️ {recipe.total_time_minutes} min
                        </p>
                      )}
                    </div>
                  </header>
                  <div className={classes.content}>
                    <div className={classes.actions}>
                      <Link href={`/meals/${recipe.id}`}>View Recipe</Link>
                    </div>
                  </div>
                </article>
              ))
            )
          ) : null}
        </div>
      </div>
    </>
  );
};

export default MealsPage;
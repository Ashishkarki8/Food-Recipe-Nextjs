"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import classes from "./favorites.module.css";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(savedFavorites);
  }, []);

  const removeFavorite = (recipeId) => {
    const newFavorites = favorites.filter(fav => fav.id !== recipeId);
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const clearAll = () => {
    if (confirm("Are you sure you want to remove all favorites?")) {
      setFavorites([]);
      localStorage.setItem("favorites", JSON.stringify([]));
    }
  };

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <h1>
          ❤️ My Favorite <span className={classes.highlight}>Recipes</span>
        </h1>
        <p>Your saved recipes collection</p>
        
        <div className={classes.headerActions}>
          <Link href="/meals" className={classes.backLink}>
            ← Back to Search
          </Link>
          
          {favorites.length > 0 && (
            <button onClick={clearAll} className={classes.clearBtn}>
              🗑️ Clear All
            </button>
          )}
        </div>
      </header>

      <main className={classes.main}>
        {favorites.length === 0 ? (
          <div className={classes.emptyState}>
            <div className={classes.emptyIcon}>💔</div>
            <h2>No Favorites Yet</h2>
            <p>Start adding recipes to your favorites by clicking the heart icon!</p>
            <Link href="/meals" className={classes.searchLink}>
              🔍 Search Recipes
            </Link>
          </div>
        ) : (
          <>
            <div className={classes.stats}>
              <p>You have <strong>{favorites.length}</strong> favorite recipe{favorites.length !== 1 ? 's' : ''}</p>
            </div>
            
            <div className={classes.meals}>
              {favorites.map((recipe) => (
                <article key={recipe.id} className={classes.meal}>
                  <button 
                    className={classes.removeBtn}
                    onClick={() => removeFavorite(recipe.id)}
                    title="Remove from favorites"
                  >
                    ❌
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
                      <h2>{recipe.name}</h2>
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
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default FavoritesPage;
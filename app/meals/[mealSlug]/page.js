import Image from "next/image";
import { notFound } from "next/navigation";
import classes from "./page.module.css";
import CookingMode from "./CookingMode";
import ShoppingList from "./ShoppingList";

// Function to fetch meal data from the API
async function getMeal(mealId) {
  const response = await fetch(
    `https://tasty.p.rapidapi.com/recipes/get-more-info?id=${mealId}`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'tasty.p.rapidapi.com',
      },
    }
  );

  if (!response.ok) {
    return null;
  }

  const meal = await response.json();
  return meal;
}

const MealDetailsPage = async ({ params }) => {
  const meal = await getMeal(params.mealSlug);

  if (!meal) {
    notFound();
  }

  // Extract ingredients from sections
  const allIngredients = meal.sections?.flatMap(section => 
    section.components?.map(component => ({
      text: component.raw_text,
      checked: false
    })) || []
  ) || [];

  // Calculate rating percentage
  const ratingScore = meal.user_ratings?.score 
    ? (meal.user_ratings.score * 100).toFixed(1) 
    : null;
  
  const totalRatings = meal.user_ratings?.count_positive + meal.user_ratings?.count_negative;

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image 
            src={meal.thumbnail_url} 
            alt={meal.name} 
            fill 
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.name}</h1>
          <p className={classes.creator}>
            By {meal.credits?.[0]?.name ? (
              <a href={`mailto:${meal.credits[0]?.email}`}>
                {meal.credits[0].name}
              </a>
            ) : (
              "Unknown Chef"
            )}
          </p>
          
          {meal.description && (
            <p className={classes.summary}>{meal.description}</p>
          )}

          {/* Recipe Meta Information Grid */}
          <div className={classes.recipeMetaGrid}>
            {meal.prep_time_minutes && (
              <div className={classes.metaItem}>
                <span className={classes.metaLabel}>⏱️ Prep Time</span>
                <span className={classes.metaValue}>{meal.prep_time_minutes} min</span>
              </div>
            )}
            
            {meal.cook_time_minutes && (
              <div className={classes.metaItem}>
                <span className={classes.metaLabel}>🔥 Cook Time</span>
                <span className={classes.metaValue}>{meal.cook_time_minutes} min</span>
              </div>
            )}
            
            {meal.total_time_minutes && (
              <div className={classes.metaItem}>
                <span className={classes.metaLabel}>⏰ Total Time</span>
                <span className={classes.metaValue}>{meal.total_time_minutes} min</span>
              </div>
            )}
            
            {meal.num_servings && (
              <div className={classes.metaItem}>
                <span className={classes.metaLabel}>🍽️ Servings</span>
                <span className={classes.metaValue}>{meal.num_servings}</span>
              </div>
            )}

            {meal.yields && (
              <div className={classes.metaItem}>
                <span className={classes.metaLabel}>📊 Yields</span>
                <span className={classes.metaValue}>{meal.yields}</span>
              </div>
            )}

            {meal.total_time_tier?.display_tier && (
              <div className={classes.metaItem}>
                <span className={classes.metaLabel}>⌛ Time Tier</span>
                <span className={classes.metaValue}>{meal.total_time_tier.display_tier}</span>
              </div>
            )}
          </div>

          {/* User Ratings */}
          {ratingScore && (
            <div className={classes.ratingsSection}>
              <span className={classes.ratingScore}>
                ⭐ {ratingScore}%
              </span>
              <span className={classes.ratingCount}>
                ({totalRatings?.toLocaleString()} ratings)
              </span>
            </div>
          )}

          {/* Tags */}
          {meal.tags && meal.tags.length > 0 && (
            <div className={classes.tagsSection}>
              {meal.tags.slice(0, 6).map((tag, index) => (
                <span key={index} className={classes.tag}>
                  {tag.display_name}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <main className={classes.main}>
        <div className={classes.contentGrid}>
          {/* Left Column - Ingredients */}
          <aside className={classes.sidebar}>
            <section className={classes.ingredientsSection}>
              <h2>Ingredients</h2>
              {meal.sections?.map((section, sectionIndex) => (
                <div key={sectionIndex} className={classes.ingredientGroup}>
                  {section.name && section.name !== "Main" && (
                    <h3>{section.name}</h3>
                  )}
                  <ul>
                    {section.components?.map((component, componentIndex) => (
                      <li key={componentIndex}>{component.raw_text}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {/* Shopping List Component */}
            <ShoppingList ingredients={allIngredients} recipeName={meal.name} />
          </aside>

          {/* Right Column - Instructions */}
          <section className={classes.instructionsSection}>
            <h2>Instructions</h2>
            
            {meal.instructions && meal.instructions.length > 0 ? (
              <>
                <ol className={classes.instructions}>
                  {meal.instructions.map((instruction, index) => (
                    <li key={index}>
                      <span className={classes.stepNumber}>Step {index + 1}</span>
                      <p>{instruction.display_text}</p>
                      {instruction.start_time && instruction.end_time && (
                        <span className={classes.stepTime}>
                          ⏱️ {Math.round((instruction.end_time - instruction.start_time) / 1000 / 60)} min
                        </span>
                      )}
                    </li>
                  ))}
                </ol>

                {/* Cooking Mode Component */}
                <CookingMode instructions={meal.instructions} />
              </>
            ) : (
              <p>No instructions available for this recipe.</p>
            )}
          </section>
        </div>

        {/* Video Section */}
        {meal.original_video_url && (
          <section className={classes.videoSection}>
            <h2>📹 Recipe Video</h2>
            <video 
              controls 
              style={{ width: '100%', maxWidth: '800px', borderRadius: '8px' }}
              poster={meal.thumbnail_url}
            >
              <source src={meal.original_video_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </section>
        )}

        {/* Nutrition Info (if available) */}
        {meal.nutrition && (
          <section className={classes.nutritionSection}>
            <h2>Nutrition Information</h2>
            <div className={classes.nutritionGrid}>
              {meal.nutrition.calories && (
                <div className={classes.nutritionItem}>
                  <span className={classes.nutritionLabel}>Calories</span>
                  <span className={classes.nutritionValue}>{meal.nutrition.calories}</span>
                </div>
              )}
              {meal.nutrition.protein && (
                <div className={classes.nutritionItem}>
                  <span className={classes.nutritionLabel}>Protein</span>
                  <span className={classes.nutritionValue}>{meal.nutrition.protein}g</span>
                </div>
              )}
              {meal.nutrition.carbohydrates && (
                <div className={classes.nutritionItem}>
                  <span className={classes.nutritionLabel}>Carbs</span>
                  <span className={classes.nutritionValue}>{meal.nutrition.carbohydrates}g</span>
                </div>
              )}
              {meal.nutrition.fat && (
                <div className={classes.nutritionItem}>
                  <span className={classes.nutritionLabel}>Fat</span>
                  <span className={classes.nutritionValue}>{meal.nutrition.fat}g</span>
                </div>
              )}
              {meal.nutrition.fiber && (
                <div className={classes.nutritionItem}>
                  <span className={classes.nutritionLabel}>Fiber</span>
                  <span className={classes.nutritionValue}>{meal.nutrition.fiber}g</span>
                </div>
              )}
              {meal.nutrition.sugar && (
                <div className={classes.nutritionItem}>
                  <span className={classes.nutritionLabel}>Sugar</span>
                  <span className={classes.nutritionValue}>{meal.nutrition.sugar}g</span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Topics/Categories */}
        {meal.topics && meal.topics.length > 0 && (
          <section className={classes.nutritionSection}>
            <h2>Recipe Categories</h2>
            <div className={classes.tagsSection}>
              {meal.topics.map((topic, index) => (
                <span key={index} className={classes.tag}>
                  {topic.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default MealDetailsPage;
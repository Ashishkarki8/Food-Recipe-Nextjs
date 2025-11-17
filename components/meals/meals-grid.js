import MealItem from "./meal-item";
import classes from "./meals-grid.module.css";
const MealsGrid= ({meals}) => {
  
  return (
    <ul className={classes.meals}>
        {meals.map((meal,i)=><li key={meal.id}><MealItem {...meal}></MealItem></li>)}
    </ul>
  )
}

export default MealsGrid
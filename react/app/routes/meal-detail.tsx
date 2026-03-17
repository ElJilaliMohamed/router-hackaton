import { Link } from "react-router";
import type { Route } from "./+types/meal-detail";

export const clientLoader = async ({ params }: Route.ClientLoaderArgs) => {
  const { mealId } = params;
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  const data = await response.json();
  return { meal: data.meals[0] };
};

const MealDetail = ({ loaderData }: Route.ComponentProps) => {
  const { meal } = loaderData;

  const ingredients: { ingredient: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ ingredient, measure: measure?.trim() || "" });
    }
  }

  return (
    <section className="detail-page">
      <Link to={`/meals/category/${meal.strCategory}`} className="detail-back">
        &larr; Back to {meal.strCategory}
      </Link>

      <div className="detail-header">
        <img className="detail-img" src={meal.strMealThumb} alt={meal.strMeal} />
        <div className="detail-info">
          <h1 className="detail-title">{meal.strMeal}</h1>
          <p className="detail-meta">{meal.strCategory} &middot; {meal.strArea}</p>
        </div>
      </div>

      <div className="detail-content">
        <div className="detail-ingredients">
          <h2 className="detail-subtitle">Ingredients</h2>
          <ul className="detail-ingredient-list">
            {ingredients.map((item, index) => (
              <li className="detail-ingredient-item" key={index}>
                <span className="detail-measure">{item.measure}</span> {item.ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div className="detail-instructions">
          <h2 className="detail-subtitle">Instructions</h2>
          <p className="detail-instructions-text">{meal.strInstructions}</p>
        </div>
      </div>
    </section>
  );
};

export default MealDetail;

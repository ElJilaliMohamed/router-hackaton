import type { Route } from "./+types/meal-detail";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { mealId } = params;
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  const data = await response.json();
  return { meal: data.meals[0] };
}

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
    <section>
      <h1>{meal.strMeal}</h1>
      <p>
        {meal.strCategory} - {meal.strArea}
      </p>

      <img src={meal.strMealThumb} alt={meal.strMeal} />

      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((item, index) => (
          <li key={index}>
            {item.measure} {item.ingredient}
          </li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <p>{meal.strInstructions}</p>
    </section>
  );
};

export default MealDetail;

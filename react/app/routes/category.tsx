import { Link } from "react-router";
import type { Route } from "./+types/category";

export const clientLoader = async ({ params }: Route.ClientLoaderArgs) => {
  const { categoryName } = params;
  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
  ).then((r) => r.json());
  return { meals: data.meals, categoryName };
};

const Category = ({ loaderData }: Route.ComponentProps) => {
  const { meals, categoryName } = loaderData;

  return (
    <section className="category-page">
      <h1 className="category-title">{categoryName}</h1>
      <div className="meal-list">
        {meals.map((meal: { idMeal: string; strMeal: string; strMealThumb: string }) => (
          <section className="meal" key={meal.idMeal}>
            <Link to={`/meals/${meal.idMeal}`} className="meal-card-link">
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <p className="meal-name">{meal.strMeal}</p>
            </Link>
          </section>
        ))}
      </div>
    </section>
  );
};

export default Category;

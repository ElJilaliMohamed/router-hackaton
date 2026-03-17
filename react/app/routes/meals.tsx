import { Link, Outlet } from 'react-router';

export const clientLoader = async () => {
  const data = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php').then((r) => r.json());
  return { mealsData: data.categories };
};

const Meals = ({ loaderData }) => {
  const { mealsData } = loaderData;

  return (
    <section>
      <ul>
        {mealsData.map((entry) => (
          <li>{entry.strCategory}</li>
        ))}
      </ul>
    </section>
  );
};
export default Meals;

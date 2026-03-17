import { Link } from 'react-router';

export const clientLoader = async () => {
  const data = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php').then((r) => r.json());
  return { mealsData: data.categories };
};

const Meals = ({ loaderData }) => {
  const { mealsData } = loaderData;

  return (
    <section>
      <div className='meal-list'>
        {mealsData.map((entry) => (
          <section className='meal'>
              <Link to="/">
                {entry.strCategory} 
                <img src={entry.strCategoryThumb} alt={entry.idCategory} />
              </Link>
          </section>
        ))}
      </div>
    </section>
  );
};
export default Meals;

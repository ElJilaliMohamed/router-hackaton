import { type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("meals", "routes/meals.tsx"),
  route("meals/category/:categoryName", "routes/category.tsx"),
  route("meals/:mealId", "routes/meal-detail.tsx"),
] satisfies RouteConfig;

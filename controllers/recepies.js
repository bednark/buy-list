import axios from 'axios';
import "dotenv/config";

export const getRecepies = async (req, res) => {
  const { query } = req.body;
  
  if (!query)
    return res.status(400).json({ error: "Query is required" });
  
  const requestUri = `${process.env.MEALDB_BASE_URL}/api/json/v1/1/search.php?s=${query}`;

  await axios.get(requestUri).then((response) => {
    const { meals } = response.data;

    if (!meals) {
      return res.status(404).json({ error: "No meals found" });
    }

    const formattedMeals = meals.map((meal) => ({
      name: meal.strMeal,
      image: meal.strMealThumb,
      ingredients: [
        meal.strIngredient1,
        meal.strIngredient2,
        meal.strIngredient3,
        meal.strIngredient4,
        meal.strIngredient5,
        meal.strIngredient6,
        meal.strIngredient7,
        meal.strIngredient8,
        meal.strIngredient9,
        meal.strIngredient10,
      ].filter((ingredient) => ingredient),
    }));

    return res.status(200).json(formattedMeals);
  }).catch((error) => {
    console.error("Error fetching meals:", error);
    return res.status(500).json({ error: "Internal server error" });
  });
};
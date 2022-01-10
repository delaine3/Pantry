import { useRouter } from "next/router";
import useSWR from "swr";
import ShoppingListForm from "../../components/ShoppingListForm";

//Fetch the food from the database
const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

const AddFoodToShoppinglist = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  //Set the data to an object. If the router query returns an id, set the data to the
  //link to / api / foods / ${ id }, if not se the data to null and call the fetcher
  //function to  fetch the data from mongodb
  const { data: food, error } = useSWR(id ? `/api/foods/${id}` : null, fetcher);
  console.log("Food " + food);
  if (error) return <p>Failed to load</p>;
  if (!food) return <p>Loading...</p>;
  //These are the props that will be sent to the Form component
  const foodForm = {
    name: food.name,
    foodType: food.foodType,
    should_refrigerate: food.should_refrigerate,
    image_url: food.image_url,
    quantity: food.quantity,
    quantityUnit: food.quantityUnit,
  };
  console.log(foodForm);
  //Use the Form component and give it props coresponding to the fields to be edited
  return (
    <ShoppingListForm
      formId="edit-food-form"
      foodForm={foodForm}
      forNewFood={false}
      addToShopping={true}
    />
  );
};
export default AddFoodToShoppinglist;

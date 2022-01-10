import ShoppingListForm from "../components/ShoppingListForm";

const NewFood = () => {
  const foodForm = {
    name: "",
    foodType: "",
    quantity: "",
    quantityUnit: "",
    should_refrigerate: false,
    image_url: "",
  };

  return <ShoppingListForm formId="add-food-form" foodForm={foodForm} />;
};

export default NewFood;

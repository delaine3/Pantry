import Form from "../components/FoodForm";

const NewFood = () => {
  const foodForm = {
    name: "",
    expiry_date: "",
    foodType: "",
    quantity: "",
    quantityUnit: "",
    should_refrigerate: false,
    image_url: "",
  };

  return <Form formId="add-food-form" foodForm={foodForm} />;
};

export default NewFood;

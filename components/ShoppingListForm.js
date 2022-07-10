import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";

const ShoppingListForm = ({
  formId,
  foodForm,
  forNewFood = true,
  addToShopping = false,
}) => {
  const router = useRouter();
  const contentType = "application/json";
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [metric, setMetric] = useState(false);

  const [form, setForm] = useState({
    name: foodForm.name,
    foodType: foodForm.foodType,
    should_refrigerate: foodForm.should_refrigerate,
    image_url: foodForm.image_url,
    quantity: foodForm.quantity,
    quantityUnit: foodForm.quantityUnit,
  });

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query;
    try {
      const res = await fetch(`/api/shoppinglist/${id}`, {
        //We call the "PUT" method defined in pages/api/foods/index and set the headers
        method: "PUT",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        //We set the body to the form dAta in json format
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      //wait for the json response and put it in an object
      const { data } = await res.json();

      //"With mutate, you can update your local data programmatically, while revalidating and finally replace it with the latest data." -https://swr.vercel.app/docs/mutation
      mutate(`/api/shoppinglist/${id}`, data, false); // Update the local data without a revalidation
      router.push("/shoppinglistItems");
    } catch (error) {
      setMessage("Failed to update food");
    }
  };
  /* The POST method adds a new entry in the mongodb database. */
  const addToShoppingList = async (form) => {
    console.log(form);

    try {
      const res = await fetch("/api/shoppinglist", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      router.push("/shoppinglistItems");
    } catch (error) {
      setMessage("Failed to add ****food");
    }
  };
  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch("/api/shoppinglist", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      router.push("/shoppinglistItems");
    } catch (error) {
      setMessage("Failed to add food");
    }
  };

  const handleChange = (e) => {
    const target = e.target;
    const { name, value } = e.target;

    if (name == "foodType" || name == "quantityUnit") {
      value = target.value.toString();
    } else {
      value =
        target.name === "should_refrigerate" ? target.checked : target.value;
    }

    setForm({
      ...form,
      [name]: value,
    });
    console.log(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = formValidate();
    if (Object.keys(errs).length === 0) {
      if (addToShopping) {
        addToShoppingList(form);
        console.log("We're here");
      } else {
        forNewFood ? postData(form) : putData(form);
      }
    } else {
      setErrors({ errs });
    }
  };

  /* Makes sure food info is filled for food name, owner name, foodType, and image url*/
  const formValidate = () => {
    let err = {};

    if (!form.name) err.name = "Name is required";
    if (!form.foodType) err.foodType = "Food type is required";
    if (!form.quantity) err.quantity = "Food quantity is required";
    if (!form.image_url) err.image_url = "Image URL is required";
    return err;
  };

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <h1 id="shopping-list-title">Shopping List</h1>
        <h2>
          Insert the details of your your food to add it to your shopping list.
        </h2>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          maxLength="20"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="quantity">Quantity</label>
        <button className="measurement" onClick={() => setMetric(!metric)}>
          {metric ? "Metric" : "Imperial"}
        </button>
        {metric ? (
          <div>
            <label className="radio-inline" htmlFor="ml">
              Milliliter(ml){" "}
              <input
                onChange={handleChange}
                type="radio"
                id="ml"
                name="quantityUnit"
                value="ml"
              />
            </label>
            <label className="radio-inline" htmlFor="l">
              Liter(l){" "}
              <input
                onChange={handleChange}
                type="radio"
                id="l"
                name="quantityUnit"
                value="l"
              />
            </label>
            <label className="radio-inline" htmlFor="kg">
              Kilogram (kg){" "}
              <input
                onChange={handleChange}
                type="radio"
                id="kg"
                name="quantityUnit"
                value="kg"
              />
            </label>
            <label className="radio-inline" htmlFor="kg">
              Gram (g){" "}
              <input
                onChange={handleChange}
                type="radio"
                id="g"
                name="quantityUnit"
                value="g"
              />
            </label>
          </div>
        ) : (
          <div>
            <label className="radio-inline" htmlFor="oz">
              Ounce(oz){" "}
              <input
                onChange={handleChange}
                type="radio"
                id="oz"
                name="quantityUnit"
                value="oz"
              />
            </label>
            <label className="radio-inline" htmlFor="pound">
              Pound(lb){" "}
              <input
                onChange={handleChange}
                type="radio"
                id="pound"
                name="quantityUnit"
                value="lb"
              />
            </label>

            <label className="radio-inline" htmlFor="gallon">
              Gallon(gal){" "}
              <input
                onChange={handleChange}
                type="radio"
                id="gallon"
                name="quantityUnit"
                value="gallon"
              />
            </label>
            <label className="radio-inline" htmlFor="qt">
              Quart(qt){" "}
              <input
                onChange={handleChange}
                type="radio"
                id="qt"
                name="quantityUnit"
                value="qt"
              />
            </label>
          </div>
        )}
        <br />
        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          required
        />
        <label className="radio-inline" htmlFor="Fruits and Vegetables">
          Fruits and Vegetable{" "}
          <input
            onChange={handleChange}
            type="radio"
            id="Fruits and Vegetables"
            name="foodType"
            value="Fruits and Vegetables"
          />
        </label>
        <label className="radio-inline" htmlFor="Nuts and Grains">
          Nuts and Grains{" "}
          <input
            onChange={handleChange}
            type="radio"
            id="Nuts and Grains"
            name="foodType"
            value="Nuts and Grains"
          />
        </label>
        <label className="radio-inline" htmlFor="Baked Goods">
          Baked Goods{" "}
          <input
            onChange={handleChange}
            type="radio"
            id="Baked Goods"
            name="foodType"
            value="Baked Goods"
          />
        </label>
        <label className="radio-inline" htmlFor="Baked Goods">
          Candy{" "}
          <input
            onChange={handleChange}
            type="radio"
            id="Candy"
            name="foodType"
            value="Candy"
          />
        </label>
        <label className="radio-inline" htmlFor="Meat and eggs">
          Meat and eggs
          <input
            onChange={handleChange}
            type="radio"
            id="Meat and eggs"
            name="foodType"
            value="Meat and eggs"
          />
        </label>
        <label className="radio-inline" htmlFor="Dairy">
          Dairy{" "}
          <input
            onChange={handleChange}
            type="radio"
            id="Dairy"
            name="foodType"
            value="Dairy"
          />
        </label>
        <br />
        <label htmlFor="should_refrigerate">
          Should Refrigerate{" "}
          <input
            type="checkbox"
            name="should_refrigerate"
            checked={form.should_refrigerate}
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor="image_url">Image URL</label>
        <input
          type="url"
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          required
        />
        <button onClick={() => router.back()} type="submit" className="btn">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  );
};

export default ShoppingListForm;

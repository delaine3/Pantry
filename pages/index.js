import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Food from "../models/Food";

const Pantry = ({ foods }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const contentType = "application/json";

  const handleDelete = async (food) => {
    try {
      await fetch(`/api/foods/${food}`, {
        method: "Delete",
      });
      router.push("/");
    } catch (error) {
      setMessage("Failed to delete the food.");
    }
  };

  return (
    <div className="index">
      <h1>
        Pantry
        <br />
        <Link href="/new">
          <button className="btn add">
            <a>Add Food To Pantry</a>
          </button>
        </Link>
      </h1>
      <br />

      <section>
        <h2>EXPIRED</h2>
        <div className="grid">
          {/* Create a card for each food */}
          {foods.map((food) => (
            <div key={food._id}>
              <div>
                {" "}
                {new Date().setDate(new Date().getDate()) >=
                Date.parse(food.expiry_date) ? (
                  <div>
                    <div className="card">
                      <img src={food.image_url} />
                      <h5 className="food-name">{food.name}</h5>
                      <div className="main-content">
                        <p className="food-name">{food.name}</p>
                        <p className="expiry_date">
                          Expiry Date: {food.expiry_date}
                        </p>
                        <p> Food type: {food.foodType}</p>
                        <p>
                          Quantity {food.quantity} <b>{food.quantityUnit} </b>
                        </p>
                        <p>
                          Regrigerate?{" "}
                          {food.should_refrigerate ? <b>Yes</b> : <b>No</b>}{" "}
                        </p>
                        <div className="btn-container">
                          <Link
                            href="/[id]/addToShoppingList"
                            as={`/${food._id}/addToShoppingList`}
                            id={food._id}
                            className="add-to-shopping"
                          >
                            <button className="btn add-to-shopping">
                              addToShoppingList
                            </button>
                          </Link>
                          <Link href="/[id]/edit" as={`/${food._id}/edit`}>
                            <button className="btn edit">Edit</button>
                          </Link>

                          <button
                            className="btn delete"
                            onClick={() => handleDelete(food._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p></p>
                )}{" "}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2>EXPIRING SOON</h2>
        <div className="grid">
          {/* Create a card for each food */}
          {foods.map((food) => (
            <div key={food._id}>
              <div>
                {" "}
                {new Date().setDate(new Date().getDate() + 7) >=
                  Date.parse(food.expiry_date) &&
                new Date().setDate(new Date().getDate()) <
                  Date.parse(food.expiry_date) ? (
                  <div>
                    <div className="card">
                      <img src={food.image_url} />
                      <p className="time-left">
                        Days left :{" "}
                        {(
                          Math.ceil(
                            Math.abs(
                              Date.parse(food.expiry_date) -
                                new Date().setDate(new Date().getDate())
                            )
                          ) /
                          (1000 * 60 * 60 * 24)
                        ).toFixed(1)}
                      </p>

                      <h5 className="food-name">{food.name}</h5>
                      <div className="main-content">
                        <p className="food-name">{food.name}</p>
                        <p className="expiry_date">
                          Expiry Date: {food.expiry_date}
                        </p>
                        <p> Food type: {food.foodType}</p>
                        <p>
                          Quantity {food.quantity} <b>{food.quantityUnit} </b>
                        </p>
                        <p>
                          Regrigerate?{" "}
                          {food.should_refrigerate ? <b>Yes</b> : <b>No</b>}{" "}
                        </p>
                        <div className="btn-container">
                          <Link
                            href="/[id]/addToShoppingList"
                            as={`/${food._id}/addToShoppingList`}
                            id={food._id}
                            className="add-to-shopping"
                          >
                            <button className="btn add-to-shopping">
                              addToShoppingList
                            </button>
                          </Link>
                          <Link href="/[id]/edit" as={`/${food._id}/edit`}>
                            <button className="btn edit">Edit</button>
                          </Link>

                          <button
                            className="btn delete"
                            onClick={() => handleDelete(food._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p></p>
                )}{" "}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2>Dairy</h2>
        <div className="grid">
          {/* Create a card for each food */}
          {foods.map((food) => (
            <div key={food._id}>
              <div>
                {new Date().setDate(new Date().getDate() + 7) <=
                Date.parse(food.expiry_date) ? (
                  food.foodType == "Dairy" ? (
                    <div>
                      <div className="card">
                        <img src={food.image_url} />
                        <h5 className="food-name">{food.name}</h5>
                        <div className="main-content">
                          <p className="food-name">{food.name}</p>
                          <p className="expiry_date">
                            Expiry Date: {food.expiry_date}
                          </p>
                          <p> Food type: Dairy</p>
                          <p>
                            Quantity {food.quantity} <b>{food.quantityUnit} </b>
                          </p>
                          <p>
                            Regrigerate?{" "}
                            {food.should_refrigerate ? <b>Yes</b> : <b>No</b>}{" "}
                          </p>
                          <div className="btn-container">
                            <Link
                              href="/[id]/addToShoppingList"
                              as={`/${food._id}/addToShoppingList`}
                              id={food._id}
                              className="add-to-shopping"
                            >
                              <button className="btn add-to-shopping">
                                addToShoppingList
                              </button>
                            </Link>
                            <Link href="/[id]/edit" as={`/${food._id}/edit`}>
                              <button className="btn edit">Edit</button>
                            </Link>

                            <button
                              className="btn delete"
                              onClick={() => handleDelete(food._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p></p>
                  )
                ) : (
                  <p></p>
                )}{" "}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2>Fruits and Vegetables</h2>
        <div className="grid">
          {/* Create a card for each food */}
          {foods.map((food) => (
            <div key={food._id}>
              <div>
                {new Date().setDate(new Date().getDate() + 7) <=
                Date.parse(food.expiry_date) ? (
                  food.foodType == "Fruits and Vegetables" ? (
                    <div>
                      <div className="card">
                        <img src={food.image_url} />
                        <h5 className="food-name">{food.name}</h5>
                        <div className="main-content">
                          <p className="food-name">{food.name}</p>
                          <p className="expiry_date">
                            Expiry Date: {food.expiry_date}
                          </p>
                          <p> Food type: Fruits and Vegetables</p>
                          <p>
                            Quantity {food.quantity} <b>{food.quantityUnit} </b>
                          </p>
                          <p>
                            Regrigerate?{" "}
                            {food.should_refrigerate ? <b>Yes</b> : <b>No</b>}{" "}
                          </p>
                          <div className="btn-container">
                            <Link
                              href="/[id]/addToShoppingList"
                              as={`/${food._id}/addToShoppingList`}
                              id={food._id}
                              className="add-to-shopping"
                            >
                              <button className="btn add-to-shopping">
                                addToShoppingList
                              </button>
                            </Link>
                            <Link href="/[id]/edit" as={`/${food._id}/edit`}>
                              <button className="btn edit">Edit</button>
                            </Link>

                            <button
                              className="btn delete"
                              onClick={() => handleDelete(food._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p></p>
                  )
                ) : (
                  <p></p>
                )}{" "}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2>Nuts and Grains</h2>
        <div className="grid">
          {/* Create a card for each food */}
          {foods.map((food) => (
            <div key={food._id}>
              <div>
                {new Date().setDate(new Date().getDate() + 7) <=
                Date.parse(food.expiry_date) ? (
                  food.foodType == "Nuts and Grains" ? (
                    <div>
                      <div className="card">
                        <img src={food.image_url} />
                        <h5 className="food-name">{food.name}</h5>
                        <div className="main-content">
                          <p className="food-name">{food.name}</p>
                          <p className="expiry_date">
                            Expiry Date: {food.expiry_date}
                          </p>
                          <p> Food type: Nuts and Grains</p>
                          <p>
                            Quantity {food.quantity} <b>{food.quantityUnit} </b>
                          </p>
                          <p>
                            Regrigerate?{" "}
                            {food.should_refrigerate ? <b>Yes</b> : <b>No</b>}{" "}
                          </p>
                          <div className="btn-container">
                            <Link
                              href="/[id]/addToShoppingList"
                              as={`/${food._id}/addToShoppingList`}
                              id={food._id}
                              className="add-to-shopping"
                            >
                              <button className="btn add-to-shopping">
                                addToShoppingList
                              </button>
                            </Link>
                            <Link href="/[id]/edit" as={`/${food._id}/edit`}>
                              <button className="btn edit">Edit</button>
                            </Link>

                            <button
                              className="btn delete"
                              onClick={() => handleDelete(food._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p></p>
                  )
                ) : (
                  <p></p>
                )}{" "}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2>Meat and eggs</h2>
        <div className="grid">
          {/* Create a card for each food */}
          {foods.map((food) => (
            <div key={food._id}>
              <div>
                {new Date().setDate(new Date().getDate() + 7) <=
                Date.parse(food.expiry_date) ? (
                  food.foodType == "Meat and eggs" ? (
                    <div>
                      <div className="card">
                        <img src={food.image_url} />
                        <h5 className="food-name">{food.name}</h5>
                        <div className="main-content">
                          <p className="food-name">{food.name}</p>
                          <p className="expiry_date">
                            Expiry Date: {food.expiry_date}
                          </p>
                          <p> Food type: Meat and eggs</p>
                          <p>
                            Quantity {food.quantity} <b>{food.quantityUnit} </b>
                          </p>
                          <p>
                            Regrigerate?{" "}
                            {food.should_refrigerate ? <b>Yes</b> : <b>No</b>}{" "}
                          </p>
                          <div className="btn-container">
                            <Link
                              href="/[id]/addToShoppingList"
                              as={`/${food._id}/addToShoppingList`}
                              id={food._id}
                              className="add-to-shopping"
                            >
                              <button className="btn add-to-shopping">
                                addToShoppingList
                              </button>
                            </Link>
                            <Link href="/[id]/edit" as={`/${food._id}/edit`}>
                              <button className="btn edit">Edit</button>
                            </Link>

                            <button
                              className="btn delete"
                              onClick={() => handleDelete(food._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p></p>
                  )
                ) : (
                  <p></p>
                )}{" "}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2>Baked Goods</h2>
        <div className="grid">
          {/* Create a card for each food */}
          {foods.map((food) => (
            <div key={food._id}>
              <div>
                {new Date().setDate(new Date().getDate() + 7) <=
                Date.parse(food.expiry_date) ? (
                  food.foodType == "Baked Goods" ? (
                    <div>
                      <div className="card">
                        <img src={food.image_url} />
                        <h5 className="food-name">{food.name}</h5>
                        <div className="main-content">
                          <p className="food-name">{food.name}</p>
                          <p className="expiry_date">
                            Expiry Date: {food.expiry_date}
                          </p>
                          <p> Food type: Baked Goods</p>
                          <p>
                            Quantity {food.quantity} <b>{food.quantityUnit} </b>
                          </p>
                          <p>
                            Regrigerate?{" "}
                            {food.should_refrigerate ? <b>Yes</b> : <b>No</b>}{" "}
                          </p>
                          <div className="btn-container">
                            <Link
                              href="/[id]/addToShoppingList"
                              as={`/${food._id}/addToShoppingList`}
                              id={food._id}
                              className="add-to-shopping"
                            >
                              <button className="btn add-to-shopping">
                                addToShoppingList
                              </button>
                            </Link>
                            <Link href="/[id]/edit" as={`/${food._id}/edit`}>
                              <button className="btn edit">Edit</button>
                            </Link>

                            <button
                              className="btn delete"
                              onClick={() => handleDelete(food._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p></p>
                  )
                ) : (
                  <p></p>
                )}{" "}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2>Candy</h2>
        <div className="grid">
          {/* Create a card for each food */}
          {foods.map((food) => (
            <div key={food._id}>
              <div>
                {new Date().setDate(new Date().getDate() + 7) <=
                Date.parse(food.expiry_date) ? (
                  food.foodType == "Candy" ? (
                    <div>
                      <div className="card">
                        <img src={food.image_url} />
                        <h5 className="food-name">{food.name}</h5>
                        <div className="main-content">
                          <p className="food-name">{food.name}</p>
                          <p className="expiry_date">
                            Expiry Date: {food.expiry_date}
                          </p>
                          <p> Food type: Baked Goods</p>
                          <p>
                            Quantity {food.quantity} <b>{food.quantityUnit} </b>
                          </p>
                          <p>
                            Regrigerate?{" "}
                            {food.should_refrigerate ? <b>Yes</b> : <b>No</b>}{" "}
                          </p>
                          <div className="btn-container">
                            <Link
                              href="/[id]/addToShoppingList"
                              as={`/${food._id}/addToShoppingList`}
                              id={food._id}
                              className="add-to-shopping"
                            >
                              <button className="btn add-to-shopping">
                                addToShoppingList
                              </button>
                            </Link>
                            <Link href="/[id]/edit" as={`/${food._id}/edit`}>
                              <button className="btn edit">Edit</button>
                            </Link>

                            <button
                              className="btn delete"
                              onClick={() => handleDelete(food._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p></p>
                  )
                ) : (
                  <p></p>
                )}{" "}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

/* Retrieves food(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect();

  /* find all the data in our database */
  const result = await Food.find({});
  const foods = result.map((doc) => {
    const food = doc.toObject();
    food._id = food._id.toString();
    return food;
  });

  return { props: { foods: foods } };
}

export default Pantry;

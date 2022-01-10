import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import ShoppingListItem from "../models/ShoppingListItem";

const ShoppinglistItems = ({ items }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleDelete = async (food) => {
    console.log("THE FOOD " + food);
    try {
      await fetch(`/api/shoppinglist/${food}`, {
        method: "Delete",
      });
      router.push("/");
    } catch (error) {
      setMessage("Failed to delete the food.");
    }
  };

  return (
    <div className="shoppinglist-items">
      <h1>
        Shopping List
        <br />
        <Link href="/shoppinglistForm">
          <button className="btn add">
            <a>Add Item to Shoppinglist</a>
          </button>
        </Link>
      </h1>

      <section>
        <h2>Dairy</h2>
        <div className="grid">
          {/* Create a card for each food */}
          {items.map((food) => (
            <div key={food._id}>
              <div>
                {food.foodType == "Dairy" ? (
                  <div>
                    <div className="card">
                      <img src={food.image_url} />
                      <h5 className="food-name">{food.name}</h5>
                      <div className="main-content">
                        <p className="food-name">{food.name}</p>

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
                            href="/[id]/editShoppinListItem"
                            as={`/${food._id}/editShoppinListItem`}
                          >
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
        <h2>Fruits and Vegetables</h2>
        <div className="grid">
          {/* Create a card for each food */}
          {items.map((food) => (
            <div key={food._id}>
              <div>
                {food.foodType == "Fruits and Vegetables" ? (
                  <div>
                    <div className="card">
                      <img src={food.image_url} />
                      <h5 className="food-name">{food.name}</h5>
                      <div className="main-content">
                        <p className="food-name">{food.name}</p>
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
                            href="/[id]/editShoppinListItem"
                            as={`/${food._id}/editShoppinListItem`}
                          >
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
        <h2>Nuts and Grains</h2>
        <div className="grid">
          {/* Create a card for each food */}
          {items.map((food) => (
            <div key={food._id}>
              <div>
                {food.foodType == "Nuts and Grains" ? (
                  <div>
                    <div className="card">
                      <img src={food.image_url} />
                      <h5 className="food-name">{food.name}</h5>
                      <div className="main-content">
                        <p className="food-name">{food.name}</p>

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
                            href="/[id]/editShoppinListItem"
                            as={`/${food._id}/editShoppinListItem`}
                          >
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
        <h2>Meat and eggs</h2>
        <div className="grid">
          {/* Create a card for each food */}
          {items.map((food) => (
            <div key={food._id}>
              <div>
                {food.foodType == "Meat and eggs" ? (
                  <div>
                    <div className="card">
                      <img src={food.image_url} />
                      <h5 className="food-name">{food.name}</h5>
                      <div className="main-content">
                        <p className="food-name">{food.name}</p>

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
                            href="/[id]/editShoppinListItem"
                            as={`/${food._id}/editShoppinListItem`}
                          >
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
        <h2>Baked Goods</h2>
        <div className="grid">
          {/* Create a card for each food */}
          {items.map((food) => (
            <div key={food._id}>
              <div>
                {food.foodType == "Baked Goods" ? (
                  <div>
                    <div className="card">
                      <img src={food.image_url} />
                      <h5 className="food-name">{food.name}</h5>
                      <div className="main-content">
                        <p className="food-name">{food.name}</p>

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
                            href="/[id]/editShoppinListItem"
                            as={`/${food._id}/editShoppinListItem`}
                          >
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
        <h2>Candy</h2>
        <div className="grid">
          {/* Create a card for each food */}
          {items.map((food) => (
            <div key={food._id}>
              <div>
                {food.foodType == "Candy" ? (
                  <div>
                    <div className="card">
                      <img src={food.image_url} />
                      <h5 className="food-name">{food.name}</h5>
                      <div className="main-content">
                        <p className="food-name">{food.name}</p>

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
                            href="/[id]/editShoppinListItem"
                            as={`/${food._id}/editShoppinListItem`}
                          >
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
    </div>
  );
};

/* Retrieves food(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect();

  /* find all the data in our database */
  const result = await ShoppingListItem.find({});
  const items = result.map((doc) => {
    const food = doc.toObject();
    food._id = food._id.toString();
    return food;
  });
  return { props: { items: items } };
}

export default ShoppinglistItems;

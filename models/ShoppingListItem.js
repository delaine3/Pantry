import mongoose from "mongoose";

/* ShoppingListItem will correspond to a collection in your MongoDB database. */
const ShoppingListItem = new mongoose.Schema({
  name: {
    /* The name of this food */

    type: String,
    required: [true, "Please provide a name for this food."],
    maxlength: [20, "Name cannot be more than 60 characters"],
  },
  quantity: {
    type: Number,
  },
  quantityUnit: {
    type: String,
  },
  foodType: {
    /* The foodType of your food */

    type: String,
    required: [true, "Please specify the foodType of your food."],
  },
  should_refrigerate: {
    /* Boolean should_refrigerate value, if applicable */

    type: Boolean,
  },

  image_url: {
    /* Url to food image */

    required: [true, "Please provide an image url for this food."],
    type: String,
  },
});
export default mongoose.models?.ShoppingListItem ||
  mongoose.model("ShoppingListItem", ShoppingListItem);

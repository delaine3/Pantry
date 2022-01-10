import dbConnect from "../../../lib/dbConnect";
import ShoppingListItem from "../../../models/ShoppingListItem";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET" /* Get a model by its ID */:
      try {
        const food = await ShoppingListItem.findById(id);
        if (!food) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: food });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT" /* Edit a model by its ID */:
      try {
        const food = await ShoppingListItem.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!food) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: food });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE" /* Delete a model by its ID */:
      try {
        const deletedFood = await ShoppingListItem.deleteOne({ _id: id });
        if (!deletedFood) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}

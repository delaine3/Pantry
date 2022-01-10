import dbConnect from "../../../lib/dbConnect";
import ShoppingListItem from "../../../models/ShoppingListItem";
export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const foods = await ShoppingListItem.find(
          {}
        ); /* find all the data in our database */
        res.status(200).json({ success: true, data: foods });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const food = await ShoppingListItem.create(
          req.body
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: food });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POSTTOSHOP":
      try {
        const food = await ShoppingListItem.create(
          req.body
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: food });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}

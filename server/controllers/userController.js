const Grocery = require("../models/groceryModel")


const viewAvailableGroceries = async(req ,res) => {
    try {
        const availableGroceries = await Grocery.find({ inventory: { $gt: 0 } });
        res.status(200).json(availableGroceries);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const bookGroceries = async(req, res)=>{
    try {
        const { items } = req.body;
    
        // Validate that items array is provided and not empty
        if (!items || items.length === 0) {
          return res.status(400).json({ error: 'Items array is required.' });
        }
    
        // Fetch the details of the selected groceries
        const selectedGroceries = await Grocery.find({ _id: { $in: items.map(item => item.id) } });
        console.log("selectedGroceries", selectedGroceries);
        // Check if all selected groceries exist
        if (selectedGroceries.length !== items.length) {
          return res.status(404).json({ error: 'One or more selected groceries not found.' });
        }
    
        // Check if there is enough inventory for each selected grocery
        for (const selectedItem of items) {
          const selectedGrocery = selectedGroceries.find(grocery => grocery._id.toString() === selectedItem.id);
          if (!selectedGrocery || selectedGrocery.inventory < selectedItem.quantity) {
            return res.status(400).json({
              error: `Not enough inventory for grocery '${selectedGrocery.name}' or it does not exist.`,
            });
          }
        }
    
        // Update inventory levels and create an order (for example purposes)
        const updatedGroceries = [];
        for (const selectedItem of items) {
          const { id, quantity } = selectedItem;
          const updatedGrocery = await Grocery.findByIdAndUpdate(
            id,
            { $inc: { inventory: -quantity } }, // Decrease inventory by the specified quantity
            { new: true }
          );
          updatedGroceries.push({ ...updatedGrocery.toObject(), bookedQuantity: quantity });
        }
    console.log("updatedGroceries", updatedGroceries);
        // Create an order (for example purposes)
        const order = {
          user: req.user.username,
          items: updatedGroceries.map(grocery => ({
            name: grocery.name,
            price: grocery.price,
            bookedQuantity: grocery.bookedQuantity,
          })),
          totalPrice: updatedGroceries.reduce((total, grocery) => total + grocery.price * grocery.bookedQuantity, 0),
          timestamp: new Date(),
        };
    
        // Additional logic can be added based on your requirements
    
        res.status(200).json({ message: 'Groceries booked successfully.', order });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
      }
}

module.exports = { bookGroceries, viewAvailableGroceries};
const Grocery = require("../models/groceryModel")

const addGrocery = async (req, res) => {
    try {
      const { name, price, inventory } = req.body;
      const newGrocery = new Grocery({ name, price, inventory });
      await newGrocery.save();
      res.status(201).json(newGrocery);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const viewGroceries = async (req, res) => {
    try {
      const groceries = await Grocery.find();
      res.status(200).json(groceries);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const removeGrocery = async (req, res) => {
    try {
      const { id } = req.params;
      console.log("idddddd", id);
      await Grocery.findOneAndDelete({_id: id});
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const updateGrocery = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, price, inventory } = req.body;
      const updatedGrocery = await Grocery.findByIdAndUpdate(
        id,
        { name, price, inventory },
        { new: true }
      );
      res.status(200).json(updatedGrocery);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const manageInventory = async (req, res) => {
    try {
      const { id } = req.params;
      const { inventory } = req.body;
      const updatedGrocery = await Grocery.findByIdAndUpdate(
        id,
        { inventory },
        { new: true }
      );
      res.status(200).json(updatedGrocery);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  module.exports =  { manageInventory, viewGroceries, addGrocery, updateGrocery, removeGrocery};
  
const express = require("express");
const router = express.Router();
const menuItem = require("../models/menuItem");

//Post method for menu items
router.post("/", async (req, res) => {
  try {
    //fetch data from req.body
    const data = req.body;

    //create a collection(object) from blueprint
    const newMenuItem = new menuItem(data);

    //save the data to the database
    const savedMenu = await newMenuItem.save();
    console.log("Data saved for menu");
    res.status(200).json({ savedMenu });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error while saving data to menu database",
    });
  }
});

//Get Method for menu items
router.get("/", async (req, res) => {
  try {
    //fetch data from the database
    const data = await menuItem.find();
    console.log("Data fetched for menu Items");
    res.status(200).json({ data });
  } catch (error) {
    console.log("Error while fetching data from menu Database");
    res.status(500).json({ error });
  }
});

//Parametrized get method for menu items
router.get("/:tasteType", async (req, res) => {
  try {
    //fetch the parameters from URL
    const tasteType = req.params.tasteType;
    if (tasteType == "spicy" || tasteType == "sweet" || tasteType == "sour") {
      const response = await menuItem.find({ taste: tasteType });
      res.status(200).json(response);
    } else {
      res.status(404).json({
        error: "Invalid taste type",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Error while fetching info",
    });
  }
});

module.exports = router;

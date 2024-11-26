const express = require("express");
const router = express.Router();
const { Category } = require("../models/category"); // Assuming Category model is defined in models/category.js

// Get all categories
router.get(`/`, async (req, res) => {
  const categoryList = await Category.find();
  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.send(categoryList);
});

// Get a single category
router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res
      .status(500)
      .json({ message: "The category with the given ID was not found." });
  }
  res.status(200).send(category);
});

// Create a new category
router.post(`/`, async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });

  category = await category.save();
  if (!category) return res.status(404).send("the category cannot be created!");
  res.send(category);
});

// Delete a category
router.delete("/:id", (req, res) => {
  Category.findByIdAndDelete(req.params.id)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: "the category is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "category not found!" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

// Update a category
router.put("/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon || category.icon,
      color: req.body.color,
    },
    { new: true }
  );
  if (!category) return res.status(400).send("the category cannot be updated!");
  res.send(category);
});

module.exports = router;

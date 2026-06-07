const express = require("express");
const getDynamicModel = require("../models/DynamicModel");

const router = express.Router();

router.get("/:collection", async (req, res) => {
  try {
    const Model = getDynamicModel(req.params.collection);
    const data = await Model.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/:collection", async (req, res) => {
  try {
    console.log("POST collection:", req.params.collection);
    console.log("BODY:", req.body);

    const Model = getDynamicModel(req.params.collection);
    const created = await Model.create(req.body);

    console.log("CREATED:", created);

    res.status(201).json(created);
  } catch (err) {
    console.log("CREATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

router.put("/:collection/:id", async (req, res) => {
  try {
    const Model = getDynamicModel(req.params.collection);
    const updated = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:collection/:id", async (req, res) => {
  try {
    const Model = getDynamicModel(req.params.collection);
    await Model.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
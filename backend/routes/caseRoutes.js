const express = require("express");
const router = express.Router();
const Case = require("../models/Case");

// Get all cases
router.get("/", async (req, res) => {
  try {
    const cases = await Case.find();
    res.json(cases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single case by id
router.get("/:id", async (req, res) => {
  try {
    const caseItem = await Case.findById(req.params.id);
    if (!caseItem)
      return res.status(404).send("The case with the given ID was not found.");
    res.json(caseItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new case
router.post("/", async (req, res) => {
  const newCase = new Case({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    summary: req.body.summary,
  });

  try {
    const savedCase = await newCase.save();
    res.status(201).json(savedCase);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a case by id
router.put("/:id", async (req, res) => {
  try {
    const updatedCase = await Case.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedCase)
      return res.status(404).send("The case with the given ID was not found.");
    res.json(updatedCase);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a case
router.delete("/:id", async (req, res) => {
  try {
    const deletedCase = await Case.findByIdAndDelete(req.params.id);
    if (!deletedCase)
      return res.status(404).send("The case with the given ID was not found.");
    res.json(deletedCase);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Export the router
module.exports = router;

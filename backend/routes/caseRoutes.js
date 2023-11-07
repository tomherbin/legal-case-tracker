const express = require("express");
const router = express.Router();
const Case = require("../models/Case");
const { generateSummary } = require("../services/summaryService");

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

router.post("/", async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const summary = await generateSummary(description);

    const newCase = new Case({
      title,
      description,
      status,
      summary,
    });

    const savedCase = await newCase.save();
    const io = req.app.get("io");
    io.emit("case-created");
    res.status(201).json(savedCase);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
    const io = req.app.get("io");
    io.emit("case-updated");
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

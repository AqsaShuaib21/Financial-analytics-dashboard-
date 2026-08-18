const express = require("express");
const router = express.Router();

// In-memory store for demo
let transactions = [];

// Get all transactions
router.get("/", (req, res) => {
  res.json(transactions);
});

// Add a new transaction
router.post("/", (req, res) => {
  const newTransaction = {
    _id: Date.now().toString(),
    title: req.body.title,
    amount: Number(req.body.amount),
    category: req.body.category,
  };
  transactions.unshift(newTransaction);
  res.json(newTransaction);
});

module.exports = router;

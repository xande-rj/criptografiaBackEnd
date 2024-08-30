const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  id: Number,
  userDocument: String,
  creditCardToken: String,
  value: Number,
  date: Date,
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;

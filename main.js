const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
const mongoose = require("mongoose");

const encrypt = require("./encryption");
const Customer = require("./customerSchema");
require("dotenv").config();
const Url = process.env.DB_Url;

app.get("/", async (req, res) => {
  await mongoose.connect(Url);

  const docs = await Customer.find();
  res.send("Rota get : " + docs);
});

app.post("/", async (req, res) => {
  await mongoose.connect(Url);

  const { userDocument, creditCardToken, value } = req.body;
  const initialCount = await Customer.countDocuments();

  await Customer.create({
    userDocument: encrypt(userDocument),
    creditCardToken: encrypt(creditCardToken),
    value: value,
    date: new Date(),
  });

  const FinalCount = await Customer.countDocuments();
  if (initialCount >= FinalCount) {
    res.send("Erro na Operacao");
  }
  res.send("Rota Post : Operação concluida");
});

app.put("/users/:userID", async (req, res) => {
  await mongoose.connect(Url);
  const { userDocument, creditCardToken, value } = req.body;
  const updates = {
    userDocument: encrypt(userDocument),
    creditCardToken: encrypt(creditCardToken),
    value: value,
  };
  let doc = await Customer.findOneAndUpdate(
    { _id: req.params.userID },
    { $set: updates }
  );
  doc = await Customer.findOne({ _id: req.params.userID });
  res.send("Rota Put " + doc);
});

app.delete("/user/:userID", async (req, res) => {
  await mongoose.connect(Url);

  try {
    const result = await Customer.deleteOne({ _id: req.params.userID });
  } catch (error) {
    return res.send("Erro na Operação");
  }

  res.send("Rota Delete : Operação concluida");
});

app.listen(port, () => {
  console.log("Estou ouvindo a porta : " + port);
});

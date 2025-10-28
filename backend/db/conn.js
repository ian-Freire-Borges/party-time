const mongoose = require("mongoose");

async function main() {
  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect(
      "mongodb+srv://ianxofreire:ianxo@cluster0.lwleo0j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log("conectado ao banco");
  } catch (error) {
    console.log(`erro: ${error}`);
  }
}

module.exports = main;

// getting-started.js
const mongoose = require('mongoose');

async function mainDb() {
let connectionString = 'mongodb://127.0.0.1:27017/test'
  await mongoose.connect(connectionString);
}

module.export = {mainDb}
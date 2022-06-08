const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb://localhost:27017/getAPet');
  console.log('connected to mongoDB');
}

main().catch((err) => {
  console.log(err);
});

module.exports = mongoose;

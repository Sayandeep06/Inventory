require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes')

const app = express();
app.use(express.json());
app.use(cors());

async function main(){
  try{
    await mongoose.connect(process.env.MONGO_URL)
    app.use('/api/items', routes);
    app.listen(process.env.PORT, () => {
      console.log('Listening on port 3000')
    });
  }catch(error){
    console.error('Database connection error:', error.message); // Log the error instead of using res
    process.exit(1);
  }
}

main();


require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL);
const schema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
  description: String,
  category: String,
});

const Item = mongoose.model('items', schema);

module.exports = Item;
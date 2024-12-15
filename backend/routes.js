const express = require('express');
const Item = require('./db')
const router = express.Router();



router.get('/', async (req, res)=>{
  const items = await Item.find();
  res.json(items)
})

router.get('/single', async(req,res)=>{
  try {
    const { _id } = req.body;
    const response = await Item.findOne({
      _id
    });
    res.json(response)
  }
  catch(error){
    res.json({
      message: error.message
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const { name, quantity, price, description, category } = req.body;
    const item = await Item.create({
      name,
      quantity,
      price,
      description,
      category
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }  
});

router.delete('/', async (req, res) => {
  try {
    const { _id } = req.body;
    const response = await Item.deleteOne({
      _id
    })
    res.json(response)
  }
  catch(error){
    res.json({
      message: error.message
    })
  }
});

router.put('/', async (req, res) => {
  try {
    const { _id, name, quantity, price, description, category } = req.body;
    const response = await Item.updateOne({
      _id
    }, {
      name,
      quantity,
      price,
      description,
      category
    })
    res.json(response)
  }

  catch (error) {
    res.json({
      message: error.message
    })
  }
});


module.exports = router;
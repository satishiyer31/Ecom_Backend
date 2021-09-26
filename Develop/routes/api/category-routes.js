const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const categories = await Category.findAll({include: [{model: Product}]});
    res.status(200).json(categories);
  }
  catch (err){
    res.status(500).json(err);
  }
  
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const category = await Category.findByPk(req.params.id,{include: [{model: Product}]});
    if (category) {
      res.status(200).json(category);
    }
    else 
    res.status(404).json({message: 'No category with this ID'})
  }
  catch(err)
  {
    res.status(500).json({message: err});
  }
});

router.post('/', async(req, res) => {
  // create a new category
  try{
    const category = await Category.create(req.body);
    if(category){
      res.status(200).json({message:`${req.body} created`});
    }
  }
  catch(err){
    res.status(500).json({message:`There was an error: ${err}`})
  }

});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try{
    const category = await Category.update({category_name : req.body.category_name},{where: {id: req.params.id}});
    if(category){
      res.status(200).json({message:`${req.params.id} has been updated to ${req.body.name}`});
    }
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try{
    const category = await Category.destroy({where: {id: req.params.id}});
    if(category){
      res.status(200).json({message:`${req.params.id} has been deleted`});
    }
  }
  catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;

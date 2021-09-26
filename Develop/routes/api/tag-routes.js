const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tag = await Tag.findAll({include: [{model: Product, through: ProductTag, as: "tag_products"}]});
    res.status(200).json(tag);
  }
  catch (err){
    res.status(500).json(err);
  }
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tag = await Tag.findByPk(req.params.id,{include: [{model: Product, through: ProductTag, as:"tag_products"}]});
    if (tag) {
      res.status(200).json(tag);
    }
    else 
    res.status(404).json({message: 'No Tag with this ID'})
  }
  catch(err)
  {
    res.status(500).json({message: err});
  }
});

router.post('/',async(req, res) => {
  // create a new tag
  try{
    const tag = await Tag.create(req.body);
    if(tag){
      res.status(200).json({message:`${req.body} created`});
    }
  }
  catch(err){
    res.status(500).json({message:`There was an error: ${err}`})
  }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try{
    const tag = await Tag.update({tag_name : req.body.category_name},{where: {id: req.params.id}});
    if(tag){
      res.status(200).json({message:`${req.params.id} has been updated to ${req.body.name}`});
    }
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try{
    const tag = await Tag.destroy({where: {id: req.params.id}});
    if(tag){
      res.status(200).json({message:`${req.params.id} has been deleted`});
    }
  }
  catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;

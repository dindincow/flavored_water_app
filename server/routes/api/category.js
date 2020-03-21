const express = require("express");
const router = express.Router();
const Category = require("../../models/Category")
const Product = require("../../models/Product")

router.post('/', async (req, res) => {
    const category = await Category.create(req.body);
    res.send(category) 
})
router.put('/:id', async (req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body);
    res.send(model)
})

router.delete('/:id', async (req, res) => {
    await Category.findByIdAndDelete(req.params.id, req.body);
    res.send({
        success:true
    })
})

router.get('/', async (req, res) => {
    const list = await Category.find().sort({createTime:-1}).limit(10);
    res.send(list)  
})

router.get('/:id', async (req, res) => {
    //const model = await Category.findById(req.params.id);
    const list = await Product.find({category : req.params.id});

    res.send(list)
})




module.exports=router
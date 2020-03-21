const express = require("express");
const router = express.Router();
const Category = require("../../models/Category")

router.post('/', async (req, res) => {
    console.log("req.body", req.body)
    const category = await Category.create(req.body);
    res.send(category)
    
})
router.put('/:id', async (req, res) => {
        console.log("req.params.id",req.params.id)
        console.log(" req.body", req.body)
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
    const model = await Category.findById(req.params.id);
    res.send(model)
})




module.exports=router
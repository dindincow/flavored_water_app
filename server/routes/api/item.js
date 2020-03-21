module.exports= app =>{
    const express = require("express");
    const router = express.Router();
    const Item = require("../../models/Item")
    
    router.post('/items', async (req, res) => {
        const category = await Item.create(req.body);
        res.send(category)
        
    })
    router.put('/items/:id', async (req, res) => {
        const model = await Item.findByIdAndUpdate(req.params.id, req.body);
        res.send(model)
    })

    router.delete('/items/:id', async (req, res) => {
        await Item.findByIdAndDelete(req.params.id, req.body);
        res.send({
            success:true
        })
    })

    router.get('/items', async (req, res) => {
        const list = await Item.find().populate('parent').limit(10);
        res.send(list)
    })

    router.get('/items/:id', async (req, res) => {
        const model = await Item.findById(req.params.id);
        res.send(model)
    })



    app.use('/admin/api', router)
}
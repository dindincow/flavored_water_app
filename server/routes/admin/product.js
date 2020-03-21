const express = require("express");
const router = express.Router();
const Product = require("../../models/Product")
const Category = require("../../models/Category")

// 獲取全部產品
router.get('/', async (req, res) => {
    const productList = await Product.find()
    res.send(productList)
})


// // 獲取產品分類列表
// router.get('/Category', async (req, res) => {
//     const ClassifyList = await Classify.find();
//     res.send(ClassifyList)
// })


// 獲取單ㄧ產品
router.get('/:id', async (req, res) => {
    const model = await Product.findById(req.params.id);
    res.send(model)
})

// 新增產品
router.post('/', async (req, res) => {
    const category = await Product.create(req.body);
    res.send(category)
})

// 刪除產品
router.delete('/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id, req.body);
    res.send({
        success:true
    })
})

// 修改產品
router.put('/:id', async (req, res) => {
    const model = await Product.findByIdAndUpdate(req.params.id, req.body);
    res.send(model)
})




// // 新增產品分類
// router.post('/classify', async (req, res) => {
//     const ClassifyList = await Category.create(req.body);
//     res.send(ClassifyList)
// })









// // 刪除產品分類
// router.get('/sort', async (req, res) => {
//     const productSort = await Product.aggregate( [{$group: {_id: "$type"}}])
//     res.send(productSort)
// })
    

// // 獲取產品分類
// router.get('/sort', async (req, res) => {
//     const productSort = await Product.aggregate( [{$group: {_id: "$type"}}])
//     res.send(productSort)
// })

// // 查詢分類產品
// router.get('/:sort', async (req, res) => {
//     const productSort = await Product.find({type:req.params.sort})
//     res.send(productSort)
// })


module.exports=router
const express = require("express");
const router = express.Router();
const Banners = require("../../models/Banners");

// 獲取輪撥圖
router.get('/',async (req, res) => {
    const bannerList = await Banners.find()
    res.send(bannerList)
})

// 獲取單個輪撥圖資訊
router.get('/:id', async (req, res) => {
    const banner = await Banners.findById(req.params.id);
    res.send({
        code:0,
        message:"",
        banner
    })
})

// 新增輪撥圖
router.post('/', async (req, res) => {
    const banner = await Banners.create(req.body);
    res.send({
        code:0,
        message:"新增成功"
    })
})


// 修改輪撥圖
router.put('/:id', async (req, res) => {
    const banner = await Banners.findByIdAndUpdate(req.params.id, req.body);
    res.send({
        code:0,
        message:"修改成功"
    })
})

// 刪除輪撥圖
router.delete('/:id', async (req, res) => {
    console.log("req.body",req.body)
    await Banners.findByIdAndDelete(req.params.id,req.body);
    res.send({
        code:0,
        message:"刪除成功"
    })
})




module.exports=router

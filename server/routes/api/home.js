const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");
const Banners = require("../../models/Banners");

// 輪撥圖
router.get('/banners',async (req, res) => {
    const bannerList = await Banners.find()
    res.send(bannerList)
})

// 新品
router.get('/newProduct', async (req, res) => {
    const newProducts = await Product.find().sort({createTime:-1}).limit(4)
    res.send(newProducts)
})

// 熱門商品
router.get('/hotProducts', async (req, res) => {
    const hotProducts = await Product.find().sort({rebate:-1}).limit(5)
    res.send(hotProducts)
})

module.exports=router

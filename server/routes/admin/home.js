const express = require("express");
const router = express.Router();
const Product = require("../../models/Product")
const Banners = require("../../models/Banners")

router.get('/', async (req, res) => {
    const productList = await Product.find()
    res.send(productList)
})

router.get('/hotProducts', async (req, res) => {
    const hotProducts = await Product.find().sort({rebate:-1}).limit(4)
    res.send(hotProducts)
})


router.get('/banners', async (req, res) => {
    const bannerList = await Banners.find()
    res.send(bannerList)
})

module.exports=router

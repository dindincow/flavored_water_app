const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Order = require("../../models/Order");
const Shopcart = require("../../models/shopcart");
const Product = require("../../models/Product")
const ObjectId = require('mongodb').ObjectID;

// 商品增加到購物車
router.post('/', async (req, res) => {
    console.log("*****",req.body)

    const user = await User.findById(req.body.id);
    if(!user){
        res.send({code:1,message:"帳號不存在"});
        return;
    }

   
    const obj={
        userId:req.body.id,
        products:[{quantity:1,productId:req.body.productId}],
        totals:100
    }


    const shopcart = await Shopcart.create(obj);
    

    res.send({code:0,shopcart});
})
module.exports = router; 
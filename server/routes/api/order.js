const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Order = require("../../models/Order");
const Product = require("../../models/Product")
const ObjectId = require('mongodb').ObjectID;


// 查詢訂單
router.get('/', async (req, res) => {
    const orderList = await Order.find();
    res.send({code:0,orderList});
})


// 查詢訂單
router.get('/:id', async (req, res) => {
   
    const user = await User.findById(req.params.id);
    if(!user){
        res.send({code:1,message:"帳號不存在"});
        return;
    }
    const allproducts = await Product.find();
    const order = await Order.find({userId:req.params.id}).sort({"createTime":-1});
    
    // 重組訂單
    const tempOdersArry = [];
    order.forEach((item,index)=>{
        var tempOder ={
            totals : item.totals,
            status :  item.status,
            _id :  item._id,
            userId :   item.userId,
            products : [],
            createTime :  item.createTime
        }
      
        item.products.forEach(product =>{
            allproducts.forEach(allproductItem =>{
                if(JSON.stringify(product.productId)===JSON.stringify(allproductItem._id)){
                    var obj = {
                        pDetail:allproductItem,
                        amount:product.quantity
                    }
                    tempOder.products.push(obj)
                }
            })
        })
        tempOdersArry.push(tempOder)
    })
   
    res.send({code:0,orders:tempOdersArry});
})

// 提交訂單
router.post('/', async (req, res) => {

    const user = await User.findById(req.body.userId);
    if(!user){
        res.send({code:1,message:"帳號不存在"});
        return;
    }

    // 建立訂單
    const order = await Order.create(req.body);

    // 清空購物車
    await User.update({'_id':ObjectId(req.body.userId)},{$set:{'shoppingCart':[]}})

    res.send({code:0,message:"訂單成功建立!"});
})

// 修改訂單狀態
router.put('/:id', async (req, res) => {
 
    await Order.update({'_id':ObjectId(req.params.id)},{$set:{'status':req.body.status}})
    res.send({code:0,message:"訂單修改成功!"});
})


module.exports = router; 
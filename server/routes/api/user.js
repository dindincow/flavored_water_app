const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const key = require('../../config/key');
const authMiddleware =  require("../../middleware/auth");
const Product = require("../../models/Product")
const ObjectId = require('mongodb').ObjectID;
const getPageData =  require("../../common/pagenation")

// 獲取全部會員列表
router.get('/', async (req, res) => {
    const pageSize = parseInt(req.query.pageSize) || 1;
    const currentPage = parseInt(req.query.currentPage) || 1;
    let obj={}
    if(req.query.id){
        obj={
            _id:ObjectId(req.query.id)
        }
    }

    const data = await getPageData(currentPage, pageSize,User,obj);
    res.send(data);
})

// 獲取單一會員資料
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    res.send({
        code:0,
        message:"",
        user
    })
})

// 刪除會員
router.delete('/:id', async (req, res) => {

    await User.findByIdAndDelete(req.params.id, req.body);
    res.send({
        code:0,
        message:"刪除成功"
    })
})

// 修改會員資料
router.put('/:id', async (req, res) => {
    console.log('req.body',req.body)
   await User.findByIdAndUpdate(req.params.id, req.body);
    res.send({
        code:0,
        message:"修改資料成功"
    })
})


// 會員註冊
router.post('/register', async (req, res) => {
    console.log('req.body.account',req.body.account)
    const user = await User.findOne({ account: req.body.account });
    
    if (user) { 
        res.send({ message: "帳號已經存在!", code: 1 });
        return;

    } else {
        const data = await User.create(req.body);
        res.send({ message: "註冊成功!", code: 0, userdata: data });
    }
})


// 會員登入
router.post('/login', async (req, res) => {
    const user = await User.findOne({ account: req.body.account }).select('+password');

    // 1.檢查帳號
    if (!user) {
        return  res.status(401).send({ message: "無此帳號!", code: 1});
    }

    // 2.比對密碼
    const isValid = bcrypt.compareSync(req.body.password, user.password);
    if(!isValid){
        return  res.status(401).send({ message: "密碼不正確!", code: 1});
    }

    // 3.返回token
    const token = jwt.sign({id : user._id} , key.secret )
    res.send({ code:0,message: "登入成功!", token });

})


// 獲取使用者資訊
router.get('/userInfo/:id', authMiddleware(), async (req, res) => {
    const user = await User.findById(req.params.id);
    res.send({user,code:0,});
})

// 加入購物車
router.post('/shoppingCart', authMiddleware(), async (req, res) => {

    var obj = {
        quantity:req.body.quantity || 1,
        productId:req.body.productId,
    }

    const user = await User.findById(req.body.id);

    let hasProduct = false;

    // 檢查購物車是否有該商品，有則該商品則修改數量
    user.shoppingCart.forEach(function (item) {
        if(item.productId == obj.productId){
            hasProduct =  true ;
            item.quantity = item.quantity + obj.quantity;
        }
    });

    // 如果沒有商品則直接加入到購物車
    if(!hasProduct){
        user.shoppingCart.push(obj) ;
    }
    user.save();

    res.send({user,code:0});
})


// 修改購物車
router.post('/updateShoppingCart', authMiddleware(), async (req, res) => {
   
    var obj = {
        quantity:req.body.quantity,
        productId:req.body.productId
    }
    const user = await User.findById(req.body.userId);

    // 修改商品數量
    user.shoppingCart.forEach(function (item) {
        if(item.productId == obj.productId){
            item.quantity =  obj.quantity;
        }
    });

    user.save();

    const products = await Product.find();
    const cartList = []
    
    user.shoppingCart.forEach((shopCartItem)=>{
        products.forEach(productItem =>{
            if(JSON.stringify(shopCartItem.productId)===JSON.stringify(productItem._id)){
                let obj = {
                    shopCartItem : shopCartItem,
                    detail:productItem,
                    totalItemPrice: shopCartItem.quantity * productItem.discountPrice
                }
                cartList.push(obj) 
            }
        })
    })

    res.send({cartList,code:0,user});
    // res.send(user);
})


// 刪除購物車商品
router.post('/deleteCartItem', async (req, res) => {
  
    await User.updateOne(
        { _id: ObjectId(req.body.userId) },
        { $pull: { shoppingCart: { _id: ObjectId(req.body.shopCartItemId) } } }
    );

    const user = await User.findById(req.body.userId);

    console.log('user====>',user)
  
    res.send({code:0,message:"刪除成功",user})
})


// 獲取購物車列表清單
router.get('/shoppingcartList/:id', authMiddleware(), async (req, res) => {
    const products = await Product.find();
    const user = await User.findById(req.params.id);
    const cartList = []
    
    user.shoppingCart.forEach((shopCartItem)=>{
        products.forEach(productItem =>{
            if(JSON.stringify(shopCartItem.productId)===JSON.stringify(productItem._id)){
                let obj = {
                    shopCartItem : shopCartItem,
                    detail:productItem,
                    totalItemPrice: shopCartItem.quantity * productItem.discountPrice
                }
                cartList.push(obj) 
            }
        })
    })

    res.send({cartList,code:0});
})


// 新增收藏
router.post('/wish', async (req, res) => {
    console.log('req.body',req.body)

    const user = await User.findById(req.body.userId);

    // 判斷該商品是否已經收藏，如果已經收藏->取消蒐藏
    const isCollect = user.wish.some(item=>{
        return JSON.stringify(item.productId) === JSON.stringify(req.body.wishes)
    })

    if(isCollect){
        await user.updateOne({$pull:{"wish":{"productId":ObjectId(req.body.wishes)}}});  
       
    }else{
        await user.updateOne({$push:{"wish":{"productId":ObjectId(req.body.wishes)}}});  
        
    }
    await user.save();

    const tempUser = await User.findById(req.body.userId);

    res.send({
        code:0,
        user:tempUser,
        message:"修改成功"
    })

})

// 獲取收藏列表
router.get('/wish/:id', async (req, res) => {
    console.log('req.params.id=>',req.params.id)
    const user = await User.findById(req.params.id);

    const wishList = await User.aggregate([ 
        {$match:{ _id:ObjectId(req.params.id)}}, 
        {
            // 關連查詢
            $lookup:{
                from:'products',
                localField:'wish.productId',
                foreignField:'_id',
                as:'wishProductsList'
            }
        }
    ])

    const orderList = await User.aggregate([ 
        {$match:{ _id:ObjectId(req.params.id)}}, 
        {
            // 關連查詢
            $lookup:{
                from:'orders',
                localField:'_id',
                foreignField:'userId',
                as:'orderList'
            }
        }
    ])

    const orderLength = orderList[0].orderList.length;

    res.send({
        code:0,
        orderLength,
        wishList:wishList[0].wishProductsList,  
    })
   
})




module.exports = router; 
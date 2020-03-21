const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const schema = mongoose.Schema({
    account: {
        type: String
    },
    username: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        select:false, // 查詢時，密碼時不要查出來
        set(val){
            return bcrypt.hashSync(val,10)
        }
    },
    address:{
        type: String,
        default: ''
    },
    phone:{
        type: Number,
        default: ''
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
        default: Date.now
    },
    shoppingCart:[
        {
            quantity:{
                type:Number,
                default: 0
            },
            productId: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Product',
            },  
        }
    ],
  
    wish:[
        {
            productId: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Product',
            },
        }
    ],
})

module.exports = mongoose.model("User", schema)
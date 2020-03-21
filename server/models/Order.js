const mongoose = require("mongoose")
const schema = mongoose.Schema({
  
    userId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    },
    products:[
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
    totals:{
        type: Number,
        default: 0
    },
    status:{
        type: Number,
        default: 1 //1:處理中 2:成功 3:失敗 
    },
    createTime: {
        type: Date,
        default: Date.now
    },
 
})

module.exports = mongoose.model("Order", schema)
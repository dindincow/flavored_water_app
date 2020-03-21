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
    }
 
})

module.exports = mongoose.model("ShopCart", schema)
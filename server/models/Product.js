const mongoose = require("mongoose")
const schema = mongoose.Schema({
    name:{
        type:String
    },
    img:{
       type: String
    },
    desc:{
        type: String
    },
    price:{
        type: Number
    },
    discountPrice:{
        type: Number
    },
    detail:{
        type:String
    },
    category:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category',
    },
    stock:{
        type:Number
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
        default: Date.now
    },

})

module.exports = mongoose.model("Product",schema)
const mongoose = require("mongoose")
const schema = mongoose.Schema({
    name:{
        type:String
    },
    img:{
       type: String
    },
    link:{
        type: String
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

module.exports = mongoose.model("Banners",schema)
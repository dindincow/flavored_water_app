const mongoose = require("mongoose")
const schema = mongoose.Schema({
    name:{
        type:String
    },
    img:{
       type: String
    },
    detail:{
        type:String
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

module.exports = mongoose.model("Actives",schema)
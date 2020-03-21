const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json())

//讓靜態文件可以透過 /uploads 下的文件可以通過 /uploads 來訪問
app.use('/uploads', express.static(__dirname + '/uploads'))
require("./pluging/db")(app);

// 設定一個密鑰
app.set('secret','helloWord')


// 引入路由
const home = require("./routes/api/home")
const products = require("./routes/api/product")
const uploads = require("./routes/api/uploads")
const user = require("./routes/api/user")
const category = require("./routes/api/category")
const actives = require("./routes/api/actives")
const banner = require("./routes/api/banner")
const order = require("./routes/api/order")
const shopcart = require("./routes/api/shopcart")

// 引入路由(前台)
//const categoryWeb = require("./routes/web/category")


// 使用 routes
app.use("/api/home",home)
app.use("/api/products",products)
app.use("/api/uploads",uploads),
app.use("/api/category",category)
app.use("/api/user",user)
app.use("/api/actives",actives)
app.use("/api/banner",banner)
app.use("/api/order",order)
app.use("/api/shopcart",shopcart)



app.listen(3000,()=>{
    console.log("server is running!")
})
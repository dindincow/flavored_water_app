const express = require("express");
const router = express.Router();
const Actives = require("../../models/Actives")

// 獲取活動列表
router.get('/', async (req, res) => {
    const activesList = await Actives.find()
    res.send({activesList,code:0})
})

// 獲取活動詳情
router.get('/:id', async (req, res) => {
    const activesInfo = await Actives.findById(req.params.id);
    res.send({activesInfo,code:0})
})

// 新增活動
router.post('/', async (req, res) => {
    const active = await Actives.create(req.body);
    res.send(active)
})

// 修改活動
router.put('/:id', async (req, res) => {

    const active = await Actives.findByIdAndUpdate(req.params.id, req.body);
    res.send(active)
})

module.exports=router
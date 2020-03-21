
module.exports =  () =>{
    const jwt = require('jsonwebtoken');
    const key = require('../config/key');
    const User = require('../models/User');


    return async (req, res,next) => {
    
        const token = String(req.headers.authorization || '').split(' ').pop();
    
        if(!token || token==''){
            return res.status(401).send({ msg: "請先登入", success: false});
        }
    
        const {id} = jwt.verify(token,key.secret);
    
        if(!id || id==''){
            return res.status(401).send({ msg: "請先登入", success: false});
        }
    
        req.user = await User.findById(id);
    
        if( !req.user){
            return res.status(401).send({ msg: "請先登入", success: false});
        }
    
        await next();
    }
}
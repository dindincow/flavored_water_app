export default{
    toalCount(state){
        if(state.userInfo.shoppingCart){
            return state.userInfo.shoppingCart.reduce((preTotal,product)=> preTotal + product.quantity,0 )
        }
        return  0;
    },
    toalPrice(state){
        if(state.shopcartList.length>0){
            return state.shopcartList.reduce((preTotal,product)=> preTotal + product.totalItemPrice ,0 )
        }
        return  0;
        
    }
}
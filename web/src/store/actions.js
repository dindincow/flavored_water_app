import { reqUser,reqProducts,reqAddCart,reqCartList, reqUpDateCount,reqCheckout,reqOrderList,reqWishList,deleteCartItem} from '../api'

import { GET_USER_INFO ,GET_ALL_PRODUCTS,CLEAR_SHOPPINGCART,UPDATE_SHOPPINGCART,UPDATE_USERINFO,GET_SHOPCART_LIST,LOGUOT,UPDATE_COUNT,} from './mutationsType'

export default {

    // 登出要清除全狀態
    logout({commit}){
        commit(LOGUOT)
    },

    // 獲取用戶訊息
    async getUserInfo({commit},userId) {
        const result = await reqUser(userId)
        if(result.code===0){
            const userInfo = result.user;
            console.log('userInfo',userInfo)
            commit(GET_USER_INFO, { userInfo })
        }
        
    },

    // 獲取全部商品
    async getProducts({commit},callback) {
        const result = await reqProducts()

        if(result.code===0){
            const productList = result.allProductsList;
            commit(GET_ALL_PRODUCTS,productList);

            // 數據更新後通知回調函數，要跑initScroll
            callback && callback();
        }
    },

    // 加入購物車
    async addCart({commit},obj) {
        const result = await reqAddCart(obj)
        if(result.code===0){
            const userInfo = result.user;
            commit(UPDATE_USERINFO,userInfo);
        }
    },

    // 獲取購物車商品訊息
    async getCartList({commit},userId){
        const result = await reqCartList(userId);
        if(result.code===0){
            const cartList = result.cartList;
            commit(GET_SHOPCART_LIST,cartList);
        }
    },

    // 修改購物車商品數量
    async updateCount({commit},obj){
        const result = await reqUpDateCount(obj);

        if(result.code===0){
            const cartList = result.cartList;
            const user = result.user;
            commit(UPDATE_COUNT,{cartList,user});
        }
    },

    // 結帳
    async goCheckout({commit},data){
        const result = await reqCheckout(data);
        if(result.code===0){
            // UPDATE_SHOPPINGCART
            commit(CLEAR_SHOPPINGCART);
        }
    },

    // 刪除購物車商品
    async deleteCartItem({commit},obj){
        const result = await deleteCartItem(obj);
        console.log("123",result)
        if(result.code===0){
            commit(UPDATE_SHOPPINGCART,result.user);
        }
    },

    // 獲取訂單列表
    async getOrderList({commit},userId){
        const result = await reqOrderList(userId);
        console.log()
        if(result.code===0){
            console.log("commit",commit)
        }
    },

    // 更改蒐藏狀態
    async changeWishStatus({commit},data){
        const result = await reqWishList(data);
        if(result.code===0){
            commit(UPDATE_USERINFO,result.user);
        }
    }


 
}

import { GET_USER_INFO,GET_ALL_PRODUCTS,UPDATE_USERINFO,GET_SHOPCART_LIST,LOGUOT,UPDATE_COUNT,UPDATE_SHOPPINGCART,CLEAR_SHOPPINGCART} from './mutationsType'

export default {
    [GET_USER_INFO](state, {userInfo}) {
        state.userInfo = userInfo;
    },
    [GET_ALL_PRODUCTS](state, productList) {
        state.allProducts = productList;
    },

    [UPDATE_USERINFO](state, userInfo) {
        state.userInfo = userInfo;
    },
    [LOGUOT](state) {
        state.userInfo = {};
        state.shopcartList=[];
    },
    [GET_SHOPCART_LIST](state,cartList) {
        state.shopcartList = cartList;
    },

    [UPDATE_COUNT](state,{cartList,user}) {
        state.shopcartList = cartList;
        state.userInfo = user;
    },

    [CLEAR_SHOPPINGCART](state) {
        state.shopcartList = [];
        state.userInfo.shoppingCart=[];
    },

    [UPDATE_SHOPPINGCART](state,user) {
        state.userInfo.shoppingCart=user.shoppingCart;
    },

}
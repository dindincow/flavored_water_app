import ajax from '@/api/ajax'

// 獲取輪撥圖
export function getBanners(){
    return ajax({
        url: '/home/banners',
        method: 'get',
    })
}

// 為你推薦(新品)
export function getRecommend(){
    return ajax({
        url: '/home/newProduct',
        method: 'get',
    })
}

// 熱門商品
export function getHotProducts(){
    return ajax({
        url: '/home/hotProducts',
        method: 'get',
    })
}

// 商品詳情
export function getProductDetail(id){
    return ajax({
        url: `/products/${id}`,
        method: 'get',
    })
}

// 會員註冊
export function reqRegister(data){
    return ajax({
        url: `user/register/`,
        method: 'post',
        data:data
    })
}

// 會員登入
export function reqLogin(data){
    return ajax({
        url: `user/login/`,
        method: 'post',
        data:data
    })
}

// 獲取用戶資訊
export function reqUser(userId){
    return ajax({
        url: `user//userInfo/${userId}`,
        method: 'get',
    })
}

// 獲取全部商品
export function reqProducts(){
    return ajax({
        url: `products`,
        method: 'get',
    })
}

// 增加商品到購物車
export function reqAddCart(obj){
    return ajax({
        url: `user/shoppingCart`,
        method: 'post',
        data:obj
    })
}

// 查詢購物車列表
export function reqCartList(userId){
    return ajax({
        url: `user/shoppingcartList/${userId}`,
        method: 'get', 
    })
}

// 更新購物車數量
export function reqUpDateCount(obj){
    return ajax({
        url: `user/updateShoppingCart`,
        method: 'post',
        data:obj 
    })
}

// 結帳，清空購物車
export function reqCheckout(data){
    return ajax({
        url: `order`,
        method: 'post',
        data:data 
    })
}

// 獲取訂單列表
export function reqOrderList(userId){
    return ajax({
        url: `order/${userId}`,
        method: 'get',
    })
}

// 獲取文章列表
export function reqActiveList(){
    return ajax({
        url: `actives`,
        method: 'get',
    })
}

// 獲取單篇文章
export function reqActiveInfo(id){
    return ajax({
        url: `actives/${id}`,
        method: 'get',
    })
}

// 是否蒐藏
export function reqWishList(data){
    return ajax({
        url: `user/wish`,
        method: 'post',
        data:data
    })
}


// 獲取收藏列表
export function getWishList(id){
    return ajax({
        url: `user/wish/${id}`,
        method: 'get',
    })
}

// 刪除購物車商品
export function deleteCartItem(obj){
    return ajax({
        url: `user/deleteCartItem`,
        method: 'post',
        data:obj
    })
}











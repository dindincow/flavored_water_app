import AlertTip from './AlertTip.vue';

const obj={}

obj.install = (Vue)=>{
    
   // 1. 創件組建構造器
   const AlertTipConstructor = Vue.extend(AlertTip)

   // 2 .創件組件物件的實例
   const alertTip = new AlertTipConstructor()
   
   // 3. 掛載到原素上
   alertTip.$mount(document.createElement('div'))

   // 4. alertTip.$el 對應的就是div
   document.body.appendChild(alertTip.$el)

   Vue.prototype.$alertTip = alertTip;

}
export default obj
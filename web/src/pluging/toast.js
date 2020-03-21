import Toast from './Toast.vue';

const toast = {}

toast.install = (Vue) => {
    const ToastConstructor = Vue.extend(Toast)
    const instance = new ToastConstructor() 
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el)

    Vue.prototype.$toast = instance
    
}

export default toast

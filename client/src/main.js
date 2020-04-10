import Vue from 'vue';
import App from './App.vue';
import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '932309908365-88kj4a3isb7k2595mr279iaq928unafd.apps.googleusercontent.com'
}
Vue.use(GAuth, gauthOption)

new Vue({
    render: h => h(App)
}).$mount("#app");
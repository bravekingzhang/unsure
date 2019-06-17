import Vue from 'vue'
import App from './App'


import store from './store'  
Vue.prototype.$store = store  

// const Parser = require('rss-parser')

//广场页组件
import android from './pages/main/android.vue'
Vue.component('android',android)

//发现页组件
import motivational from './pages/find/motivational.vue'
Vue.component('motivational',motivational)
import travel from './pages/find/travel.vue'
Vue.component('travel',travel)
import reading from './pages/find/reading.vue'
Vue.component('reading',reading)
import book from './pages/find/book.vue'
Vue.component('book',book)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()

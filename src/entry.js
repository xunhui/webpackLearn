import myless from './index.less'
import mySass from './index.scss'

import Vue from 'Vue'

let cc = 'cc'

console.log(cc)

new Vue({
    el: '#box',
    data: {
        msg: 'test Vue import'
    },
    computed: {
        reverseMsg: function () {
            return msg.reverse().split('').join('')
        }      
    }
})
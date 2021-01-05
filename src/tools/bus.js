import Vue from 'vue';
const bus = new Vue({
    data() {
        return {
            cardInfo: {
                img: "",
                name: "",
                flag: ""
            }
        }
    },
    methods: {
        // 动态计算海报的宽高
        computeWH(w, h, box_width, box_height, edit_box_dom) {
            const scale = w / h;
            if (scale <= box_width / box_height) {
                edit_box_dom.style.width = `${box_height * scale}px`;
                edit_box_dom.style.height = `${box_height}px`;
            } else {
                edit_box_dom.style.width = `${box_width}px`;
                edit_box_dom.style.height = `${box_width / scale}px`;
            }
        },
    }
});
Vue.$bus = Vue.prototype.$bus = bus;
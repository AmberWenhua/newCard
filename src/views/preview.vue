<template>
    <div class="preview hor-ver_center">
        <Loading type="spinner" v-if="!imgUrlCanvas" />
        <img :src="imgUrlCanvas" v-if="imgUrlCanvas" />
    </div>
</template>

<script>
import Draw from "@tools/draw.js";
import qrcode from "@tools/qrcode.js";
import { Loading } from 'vant';

export default {
    name: "Preview",
    data() {
        return {
            imgUrlCanvas: "",
        };
    },
    mounted() {
        this.drawPoster();
    },
    components: {
        Loading
    },
    methods: {
        async drawPoster() {
            const draw = new Draw();
            draw.init(750, 1206);
            // 绘制背景图
            await draw.drawImg(require("@imgs/bg.png"));
            // 绘制屋檐
            await draw.drawImg(require("@imgs/edit_bg.png"), 0, 31, 750, 1128);

            // 绘制头上传的图片
            const img = this.$bus.cardInfo.img[0] && this.$bus.cardInfo.img[0].content || require("@imgs/defalut_img.png");
            await draw.drawImg(img, 186, 285, 375, 375);

            // 绘制名字
            const name = this.$bus.cardInfo.name || "我是李白";
            const temp = this.getTextWidth(name, "36px");
            let x = 350 - (temp/2).toFixed(0);
            await draw.drawText(`@${name}`, x, 695, {
                fontSize: 36,
                fontWeight: "bold",
                color: "#fff7e7",
            });

            // 绘制flag
            const flag = this.$bus.cardInfo.flag || "奶茶不要酒 五花马千金裘样样有";
            await draw.drawText(`2021年，我要${flag}`, 260, 754, {
                fontSize: 24,
                color: "#fff7e7",
                maxLine: 3,
                maxWidth: 235,
                lineSpace: 16,
            });

            // 二维码的框
            const qr_code_bg = require("@imgs/qr_box.png");
            await draw.drawImg(qr_code_bg, 105, 982, 160, 160);
            // 绘制二维码
            const qr_code = qrcode.create('http://cdn-test.via.cool/web/newyear-poster/index.html#/home');
            await draw.drawImg(qr_code, 111, 988, 149, 149);

            // 二维码旁边的文字
            await draw.drawText(
                `你的2021新年小目标立了吗？识别二维码速速生成您的2021小目标专属卡片哟！`,
                283,
                1006,
                {
                    fontSize: 24,
                    color: "#f3ca7d",
                    maxLine: 3,
                    maxWidth: 320,
                    lineSpace: 12,
                }
            );

            // 提示长按保存的文字
            await draw.drawText(
                `据说长按保存并分享的人更能实现2021的小目标哟!`,
                283,
                1136,
                {
                    fontSize: 16,
                    color: "#f8daa1",
                    textLine: true,
                    textBaseline: 'bottom'
                }
            );

            this.imgUrlCanvas = draw.export();
        },
        // 判断字数，挪动位置
        getTextWidth(str, fontSize) {
            let result = 0;
            let ele = document.createElement("div");
            ele.style.position = "absolute";
            ele.style.whiteSpace = "nowrap";
            ele.style.fontSize = fontSize;
            ele.style.opacity = 0;
            ele.innerText = str;
            document.body.append(ele);
            result = ele.getBoundingClientRect().width;
            document.body.removeChild(ele);
            return result;
        },
    },
};
</script>

<style lang="scss">
.preview {
    min-height: 100vh;
    background: url("~@imgs/bg.png");
    background-size: 88%;
}
</style>
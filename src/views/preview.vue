<template>
    <div class="preview hor-ver_center">
        <Loading type="spinner" v-if="!imgUrlCanvas" />
        <img :src="imgUrlCanvas" v-if="imgUrlCanvas" />
    </div>
</template>

<script>
import Draw from "@tools/draw.js";
import qrcode from "@tools/qrcode.js";
import { Loading } from "vant";

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
        Loading,
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
            await draw.drawImg(img, 186, 285, 375, 355);

            // 绘制名字
            const name = this.$bus.cardInfo.name || "子美今天更美了吗";
            const temp = this.getTextWidth(name, "36px");
            let x = 350 - (temp / 2).toFixed(0);
            await draw.drawText(`@${name}`, x, 675, {
                fontSize: 36,
                fontWeight: "bold",
                color: "#fff7e7",
            });

            // 绘制flag
            await draw.drawText("2021年，我要", 300, 734, {
                fontSize: 24,
                color: "#fff7e7",
            });
            const flag = this.$bus.cardInfo.flag || "奶茶不要酒\n五花马千金裘\n样样有";
            let oW = 0, sizeWidth = 0, maxWidth = 230, maxLine = 3, y = 0;
            // 有换行符，折行并居中显示
            if (flag.indexOf("\n") > -1) {
                let newFlag = flag.split("\n");
                await newFlag.forEach((item, index) => {
                    if(index > maxLine - 1) {
                        item = '...';
                        y = 737 + 34 * (index + 1);
                    }else {
                        y = 737 + 38 * (index + 1);
                    }
                    oW = this.getTextWidth(item, "24px");
                    sizeWidth = oW < maxWidth? (375 - oW/2).toFixed(0) : 270;
                    draw.drawText(item, sizeWidth, y, {
                        fontSize: 24,
                        color: "#fff7e7",
                        maxLine: 1,
                        maxWidth,
                        lineSpace: 14,
                    });
                });
            } else {
                oW = this.getTextWidth(flag, "24px");
                sizeWidth = oW < maxWidth? (375 - oW/2).toFixed(0) : 270;
                await draw.drawText(flag, sizeWidth, 775, {
                    fontSize: 24,
                    color: "#fff7e7",
                    maxLine,
                    maxWidth,
                    lineSpace: 14,
                });
            }

            // 二维码的框
            const qr_code_bg = require("@imgs/qr_box.png");
            await draw.drawImg(qr_code_bg, 105, 982, 160, 160);
            // 绘制二维码
            const qr_code = qrcode.create(window.location.href);
            await draw.drawImg(qr_code, 111, 988, 149, 149);

            // 二维码旁边的文字
            await draw.drawText(
                `据说长按保存并分享的人更能实现2021的小目标哟!`,
                283,
                1036,
                {
                    fontSize: 24,
                    color: "#f3ca7d",
                    maxLine: 3,
                    maxWidth: 280,
                    lineSpace: 12,
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
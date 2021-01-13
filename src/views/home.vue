<template>
    <div class="home hor-ver_center" ref="card">
        <div class="bg_box" ref="view_content">
            <div class="content">
                <div class="upload hor-ver_center">
                    <Uploader
                        type="file"
                        v-model="$bus.cardInfo.img"
                        :max-count="1"
                        accept="image/*"
                        :after-read="afterRead"
                        :before-read="beforeRead"
                        :preview-options="preOptions"
                    >
                        <img
                            class="photo"
                            :src="require('@imgs/upload.png')"
                            alt=""
                        />
                    </Uploader>
                </div>
                <div class="edit_box">
                    <Field
                        class="edit_name"
                        v-model="$bus.cardInfo.name"
                        label="@"
                        placeholder="输入您的昵称"
                        :right-icon="require('@imgs/pin.png')"
                        maxlength="10"
                    />
                </div>
                <div class="edit_box edit_flag">
                    <Field
                        v-model="$bus.cardInfo.flag"
                        type="textarea"
                        maxlength="30"
                        autosize
                        label="2021我要..."
                        placeholder="输入您的2021小目标（不超过30字）"
                        :right-icon="require('@imgs/pin.png')"
                    />
                </div>
                <div class="btn">
                    <img
                        @click="toView"
                        :src="require('@imgs/save.png')"
                        alt=""
                    />
                </div>
            </div>
        </div>
        <Popup
            v-model="showCutImg"
            position="bottom"
            :style="{ height: '100%', background: '#000' }"
            get-container="#cutImg_box"
        >
            <CutImg
                v-if="showCutImg"
                :ratio="1 / 1"
                :img="imgWillCut"
                @cancel="onCutCancel"
                @ok="onCutOk"
            />
        </Popup>
    </div>
</template>

<script>
import { compressImg } from "@tools/handle.js";
import { Uploader, Popup, Toast, Field } from "vant";
import CutImg from "@comp/CutImg";

export default {
    name: "Home",
    components: {
        Uploader,
        Popup,
        Field,
        CutImg,
    },
    data() {
        return {
            showCutImg: false,
            imgWillCut: "",
        };
    },
    computed: {
        preOptions() {
            return {
                showIndex: false,
                closeable: true,
            };
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.$bus.computeWH(
                750,
                1175,
                this.$refs.card.clientWidth,
                this.$refs.card.clientHeight,
                this.$refs.view_content
            );
        });
    },
    methods: {
        // 读取图片数据
        afterRead(ctn) {
            this.showCutImg = true;
            console.log("读取图片数据", ctn);
            this.imgWillCut = ctn.content;
        },
        // 读取图片数据之前，检测图片大小
        beforeRead(file) {
            // 大于 2m 小于 10M 则压缩, 大于 10M 则提示图片过大
            return new Promise((resolve, reject) => {
                if (file.size > 10485760) {
                    Toast(`图片大小不得超过10M,请重新选择图片`);
                    return reject(false);
                }
                // 小于5M直接生成
                if (file.size < 2097152) return resolve(file);
                // 大于5M则压缩
                if (file.size >= 2097152) {
                    Toast.loading({
                        message: "图片加载中...",
                        forbidClick: true,
                    });
                    // 对图片进行压缩
                    compressImg(file)
                        .then((fs) => {
                            resolve(fs);
                        })
                        .catch((err) => {
                            console.log("压缩图片报错", err);
                        })
                        .finally(() => {
                            Toast.clear();
                        });
                }
            });
        },
        // 取消裁剪
        onCutCancel() {
            this.showCutImg = false;
        },
        // 裁剪成功
        onCutOk(result) {
            this.showCutImg = false;
            this.$bus.cardInfo.img[0].file = result.file;
            this.$bus.cardInfo.img[0].content = result.base64;
        },
        // 点击生成效果图
        toView() {
            this.$router.push({ path: "/preview" });
        },
    },
};
</script>

<style lang="scss">
.home {
    min-height: 100vh;
    background: url("~@imgs/bg.png");
    font-size: 20px * $scale;
    .bg_box {
        background: url("~@imgs/edit_bg.png");
        background-size: 100% 100%;
        position: relative;
    }
    .content {
        width: 375px * $scale;
        margin: 0 auto;
        .upload {
            height: 375px * $scale;
            background-color: rgba(138, 0, 11, 0.7);
            margin-top: 254px * $scale;
            .van-uploader {
                width: 347px * $scale;
                height: 347px * $scale;
                border: 2px #dbaaa2 dashed;
                .van-uploader__wrapper {
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                    img.photo {
                        width: 60%;
                        margin: 0 auto;
                    }
                }
            }
            .van-uploader__preview-delete {
                width: 35px * $scale;
                height: 35px * $scale;
                .van-uploader__preview-delete-icon {
                    font-size: 40px * $scale;
                }
            }
            .van-uploader__preview {
                margin: 0;
                width: 100%;
                height: 100%;
                .van-uploader__preview-image {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .edit_box {
            margin-top: 15px * $scale;
            .van-cell {
                background-color: rgba(138, 0, 11, 0.7);
                border-radius: 10px;
                line-height: 40px * $scale;
                font-size: 20px * $scale;
                padding: 20px * $scale;
            }
            .van-field__label {
                color: #dbaaa2;
                width: auto;
                margin-right: 0;
            }
            .van-field__control {
                color: #dbaaa2;
            }
            .van-icon__image {
                width: 25px * $scale;
                height: 25px * $scale;
            }
            input::-webkit-input-placeholder,
            textarea::-webkit-input-placeholder {
                color: #dbaaa2;
            }
            input::-moz-placeholder,
            textarea::-moz-placeholder {
                /* Mozilla Firefox 19+ */
                color: #dbaaa2;
            }
            input:-moz-placeholder,
            textarea:-moz-placeholder {
                /* Mozilla Firefox 4 to 18 */
                color: #dbaaa2;
            }
            input:-ms-input-placeholder,
            textarea:-ms-input-placeholder {
                /* Internet Explorer 10-11 */
                color: #dbaaa2;
            }
        }
        .edit_flag {
            .van-cell {
                display: block;
            }
            .van-field__control {
                line-height: 24px * $scale;
            }
            .van-field__body {
                position: relative;
                .van-field__right-icon {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                }
            }
        }
        .btn {
            position: absolute;
            bottom: 32px * $scale;
            width: 385px * $scale;
        }
    }
}
</style>
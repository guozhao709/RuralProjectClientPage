<template>
    <div class="container">
        <FunctionHeader title="健康信息" />
        <div class="container-up">
            <div class="options">
                <div class="option" v-for="option in helathyOptions" :key="option.name">
                    <label>
                        <p>{{ option.label }}</p>
                        <input type="text" :placeholder="option.unit" v-model="option.value" />
                    </label>
                </div>
            </div>

            <div class="selectOptions">
                <van-swipe class="my-swipe" indicator-color="white">
                    <van-swipe-item v-for="option in healthySwipeOptions" :key="option.name">
                        <p>{{ option.label }}</p>
                        <div :class="option.value ? 'is-true is' : 'is-false is'"
                            @click=" option.value = !option.value">
                            {{ option.value ? '有' : '无' }}
                        </div>
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div class="additional-information"> <label>
                    <p>既往病史</p>
                    <input type="text" placeholder="请输入既往病史">
                </label>
            </div>
        </div>

        <div class="container-down">
            <div class="view">
            </div>
            <div class="submit">
                <van-button type="primary" size="large">提交</van-button>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import FunctionHeader from '@/components/FunctionHeader.vue';




const helathyOptions = ref([
    { name: 'bloodPressure', label: '血压(高/低)', unit: '毫米/汞柱', value: '' },
    { name: 'bodyTemperature', label: '体温', unit: '°C', value: '' },
    { name: 'weight', label: '体重', unit: '千克', value: '' },
    { name: 'height', label: '身高', unit: '厘米', value: '' },
]);

const healthySwipeOptions = ref([
    { name: 'headache', label: ' 头痛 ', value: false },
    { name: 'chest_tightness', label: ' 胸闷 ', value: false },
    { name: 'cough', label: ' 咳嗽 ', value: false },
    { name: 'abdominal_pain', label: ' 肚子痛 ', value: false },
    { name: 'fever', label: ' 发热 ', value: false },
    { name: 'fatigue', label: ' 乏力 ', value: false },
    { name: 'dizziness', label: ' 头晕 ', value: false },
    { name: 'joint_pain', label: ' 关节痛 ', value: false }
])

</script>

<style scoped lang="scss">
.container {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    font-size: clamp(30px, 2.5vw, 30px);

    .container-up {
        flex: 1;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        overflow-y: auto;

        .options {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            width: 95%;
            margin: 0 auto;

            .option {
                width: 45%;
                height: 100px;
                border-radius: 10px;
                background-color: #cfd8f3;
                text-align: center;

                input {
                    width: 70%;
                }

            }
        }



        .selectOptions {
            width: 95%;
            margin: 0 auto;
            border-radius: 10px;

            .my-swipe {
                width: 100%;
                border-radius: 10px;

                .van-swipe-item {
                    width: 100%;
                    height: 200px;
                    padding-top: 10px;
                    text-align: center;
                    background-color: #cfd8f3;

                    .is {
                        width: 200px;
                        height: 100px;
                        margin: 20px auto 0 auto;
                        border-radius: 20px;
                        line-height: 100px;
                    }

                    .is-true {
                        background-color: green;
                    }

                    .is-false {
                        background-color: red;
                    }
                }
            }
        }

        .additional-information {
            width: 95%;
            height: 100px;
            border-radius: 10px;
            text-align: center;
            background-color: #cfd8f3;

            input {
                width: 70%;
            }

            ;
        }
    }

    .container-down {
        flex: 10;
        margin: 20px auto 0;
        width: 95%;
        border-radius: 10px;
        background-color: #cfd8f3;
        display: flex;
        flex-direction: column;
        padding: 10px;

        .view {
            flex: 1;
            margin-bottom: 10px;
            border-radius: 10px;
            background-color: #fff;
            overflow-y: auto;
        }

        .submit {
            margin: 0 auto;
            width: 200px;
        }
    }
}
</style>
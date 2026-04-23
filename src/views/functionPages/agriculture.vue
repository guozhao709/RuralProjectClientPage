<template>
    <FunctionHeader title="农业助手" description="智能分析作物种植建议" />
    <div class="agriculture-page">

        <!-- 顶部区域：标题、作物选择、天气信息 -->
        <section class="section-card">
            <header class="page-header">
                <h1 class="page-title">农业助手</h1>
                <p class="page-subtitle">智能分析作物种植建议</p>
            </header>

            <div class="crop-selector">
                <p class="section-label">请选择作物</p>
                <div class="crop-list">
                    <van-button v-for="crop in cropOptions" :key="crop.key" round class="crop-btn"
                        :type="selectedCrop === crop.key ? 'primary' : 'default'" @click="handleSelectCrop(crop.key)">
                        {{ crop.label }}
                    </van-button>
                </div>
                <p class="selected-crop">当前作物：{{ currentCropLabel }}</p>
            </div>

            <div class="weather-card">
                <div class="weather-top">
                    <p class="weather-city">地点：{{ currentResult.weather.location }}</p>
                    <van-tag type="success" size="large">
                        {{ currentResult.weather.condition }}
                    </van-tag>
                </div>
                <p class="weather-temp">{{ currentResult.weather.temperature }}</p>
                <p class="weather-desc">{{ currentResult.weather.forecast }}</p>
            </div>

            <van-button class="analyze-btn" type="success" block round @click="startAnalysis">
                开始分析
            </van-button>
            <p class="analyze-time">最近分析时间：{{ lastAnalyzeTime }}</p>
        </section>

        <!-- 中部区域：分析结果卡片 -->
        <section class="analysis-section">
            <article v-for="card in analysisCards" :key="card.title" class="analysis-card">
                <h2 class="card-title">{{ card.title }}</h2>
                <ul class="card-list">
                    <li v-for="(item, index) in card.items" :key="`${card.title}-${index}`">
                        {{ item }}
                    </li>
                </ul>
            </article>
        </section>

        <!-- 底部区域：AI 综合种植建议 -->
        <section class="section-card summary-section">
            <div class="summary-head">
                <h2 class="summary-title">AI综合种植建议</h2>
                <van-tag size="large" :type="decisionTagType" class="decision-tag">
                    {{ decisionText }}
                </van-tag>
            </div>
            <ol class="reason-list">
                <li v-for="(reason, index) in currentResult.aiAdvice.reasons" :key="`reason-${index}`">
                    {{ reason }}
                </li>
            </ol>
        </section>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import FunctionHeader from "@/components/FunctionHeader.vue";

type CropKey = "corn" | "wheat" | "rice" | "tomato" | "cucumber";
type AdviceLevel = "recommended" | "careful" | "avoid";

interface CropOption {
    key: CropKey;
    label: string;
}

interface WeatherInfo {
    location: string;
    condition: string;
    temperature: string;
    forecast: string;
}

interface AiAdvice {
    level: AdviceLevel;
    reasons: string[];
}

interface CropAnalysis {
    weather: WeatherInfo;
    cropIntro: string[];
    diseasePrevention: string[];
    fertilization: string;
    marketTrend: string;
    weatherImpact: string;
    aiAdvice: AiAdvice;
}

interface AnalysisCard {
    title: string;
    items: string[];
}

const cropOptions: CropOption[] = [
    { key: "corn", label: "玉米" },
    { key: "wheat", label: "小麦" },
    { key: "rice", label: "水稻" },
    { key: "tomato", label: "番茄" },
    { key: "cucumber", label: "黄瓜" },
];

// mock 数据：后续接后端时可直接替换这一段
const mockAnalysisMap: Record<CropKey, CropAnalysis[]> = {
    corn: [
        {
            weather: {
                location: "西安",
                condition: "多云",
                temperature: "23℃",
                forecast: "未来三天有降雨，土壤墒情较好。",
            },
            cropIntro: [
                "生长周期：100-120天",
                "适宜温度：22-30℃",
                "适宜季节：春季播种",
            ],
            diseasePrevention: ["叶斑病风险中等", "注意玉米螟"],
            fertilization: "氮肥 + 钾肥，拔节期适量追肥",
            marketTrend: "玉米 2.5 元/kg，趋势上涨",
            weatherImpact: "未来有降雨，建议暂缓施肥 1-2 天",
            aiAdvice: {
                level: "recommended",
                reasons: [
                    "当前市场价格较高，销售空间较好",
                    "近期温度适中，利于苗期生长",
                    "病害风险可控，管理难度较低",
                    "建议分次施肥，避免一次过量",
                ],
            },
        },
        {
            weather: {
                location: "西安",
                condition: "阴天",
                temperature: "20℃",
                forecast: "本周后半段有连续小雨，田间湿度偏高。",
            },
            cropIntro: [
                "生长周期：100-120天",
                "适宜温度：20-30℃",
                "适宜季节：春夏交替播种",
            ],
            diseasePrevention: ["锈病风险上升", "关注土壤湿度"],
            fertilization: "减少氮肥，配合少量磷钾肥",
            marketTrend: "玉米 2.4 元/kg，短期平稳",
            weatherImpact: "降雨偏多，建议加强排水管理",
            aiAdvice: {
                level: "careful",
                reasons: [
                    "价格保持稳定，但上行空间有限",
                    "连续降雨会增加病害压力",
                    "可种植，但需加强田间巡查",
                    "建议提前疏通排水沟",
                ],
            },
        },
    ],
    wheat: [
        {
            weather: {
                location: "西安",
                condition: "晴",
                temperature: "21℃",
                forecast: "昼夜温差适中，适合小麦返青管理。",
            },
            cropIntro: [
                "生长周期：220-260天",
                "适宜温度：15-22℃",
                "适宜季节：秋播冬管",
            ],
            diseasePrevention: ["条锈病风险较低", "注意蚜虫早防"],
            fertilization: "尿素 + 复合肥，返青期追肥",
            marketTrend: "小麦 2.8 元/kg，趋势平稳",
            weatherImpact: "近期光照充足，利于分蘖生长",
            aiAdvice: {
                level: "recommended",
                reasons: [
                    "气候与小麦生长期匹配度高",
                    "病虫害风险较低，便于管理",
                    "市场价格稳定，收益可预期",
                    "建议按阶段追肥，提高穗粒数",
                ],
            },
        },
        {
            weather: {
                location: "西安",
                condition: "多云",
                temperature: "18℃",
                forecast: "未来两天风力较大，土壤表层偏干。",
            },
            cropIntro: [
                "生长周期：220-260天",
                "适宜温度：12-22℃",
                "适宜季节：秋季播种",
            ],
            diseasePrevention: ["白粉病风险中等", "注意倒伏预防"],
            fertilization: "氮肥减量，配合叶面喷施微量元素",
            marketTrend: "小麦 2.7 元/kg，趋势小幅下行",
            weatherImpact: "风大土干，建议及时小水灌溉",
            aiAdvice: {
                level: "careful",
                reasons: [
                    "短期价格回落，收益需谨慎评估",
                    "风干天气对幼苗有一定压力",
                    "加强水肥管理可降低风险",
                    "建议控制播种密度，减少倒伏",
                ],
            },
        },
    ],
    rice: [
        {
            weather: {
                location: "西安",
                condition: "多云",
                temperature: "24℃",
                forecast: "未来三天湿度较高，适合水稻分蘖。",
            },
            cropIntro: [
                "生长周期：120-150天",
                "适宜温度：25-32℃",
                "适宜季节：春末夏初",
            ],
            diseasePrevention: ["稻瘟病风险中等", "注意飞虱监测"],
            fertilization: "氮肥 + 磷肥，分蘖期少量多次",
            marketTrend: "稻谷 3.1 元/kg，趋势上涨",
            weatherImpact: "湿度较高，建议加强通风与晒田",
            aiAdvice: {
                level: "careful",
                reasons: [
                    "价格有上行空间，收益有吸引力",
                    "高湿环境会增加病害概率",
                    "加强田间管理后仍可稳产",
                    "建议落实病虫监测与预防",
                ],
            },
        },
        {
            weather: {
                location: "西安",
                condition: "阵雨",
                temperature: "22℃",
                forecast: "未来一周降雨频繁，田块积水风险高。",
            },
            cropIntro: [
                "生长周期：120-150天",
                "适宜温度：24-32℃",
                "适宜季节：夏季种植",
            ],
            diseasePrevention: ["纹枯病风险偏高", "注意稻飞虱暴发"],
            fertilization: "暂停追肥，待天气转稳后补施",
            marketTrend: "稻谷 3.0 元/kg，趋势震荡",
            weatherImpact: "连续降雨，建议优先排水防倒伏",
            aiAdvice: {
                level: "avoid",
                reasons: [
                    "当前连续降雨不利于稳产",
                    "病害风险偏高，管理成本上升",
                    "短期价格波动较大，不确定性高",
                    "建议暂缓大面积种植，先小范围试种",
                ],
            },
        },
    ],
    tomato: [
        {
            weather: {
                location: "西安",
                condition: "晴",
                temperature: "26℃",
                forecast: "光照较好，昼夜温差适中。",
            },
            cropIntro: [
                "生长周期：90-120天",
                "适宜温度：20-28℃",
                "适宜季节：春秋两季",
            ],
            diseasePrevention: ["晚疫病风险较低", "注意白粉虱"],
            fertilization: "有机肥 + 钾肥，坐果期补钙",
            marketTrend: "番茄 4.6 元/kg，趋势上涨",
            weatherImpact: "温度适宜，利于开花坐果",
            aiAdvice: {
                level: "recommended",
                reasons: [
                    "当前价格较高，经济收益较好",
                    "天气条件适合番茄生长",
                    "病害压力较低，管理更省力",
                    "建议控制浇水频率，防止裂果",
                ],
            },
        },
        {
            weather: {
                location: "西安",
                condition: "阴转雨",
                temperature: "19℃",
                forecast: "未来两天有降雨，棚内湿度上升明显。",
            },
            cropIntro: [
                "生长周期：90-120天",
                "适宜温度：18-28℃",
                "适宜季节：春秋种植",
            ],
            diseasePrevention: ["灰霉病风险中等", "注意通风降湿"],
            fertilization: "减少氮肥，补充钙镁元素",
            marketTrend: "番茄 4.2 元/kg，趋势平稳",
            weatherImpact: "湿度偏高，建议减少浇水并及时通风",
            aiAdvice: {
                level: "careful",
                reasons: [
                    "短期价格稳定，收益中等",
                    "阴雨天气提高病害发生率",
                    "加强棚内管理后可继续种植",
                    "建议重点防灰霉病和裂果",
                ],
            },
        },
    ],
    cucumber: [
        {
            weather: {
                location: "西安",
                condition: "晴",
                temperature: "25℃",
                forecast: "未来三天以晴好天气为主，通风条件良好。",
            },
            cropIntro: [
                "生长周期：55-70天",
                "适宜温度：18-30℃",
                "适宜季节：春夏两季",
            ],
            diseasePrevention: ["霜霉病风险较低", "注意蚜虫"],
            fertilization: "氮肥 + 钾肥，结果期增施钾肥",
            marketTrend: "黄瓜 3.8 元/kg，趋势上涨",
            weatherImpact: "光照较好，利于连续挂果",
            aiAdvice: {
                level: "recommended",
                reasons: [
                    "当前行情较好，销售速度快",
                    "温度和光照都较适宜",
                    "病害风险较低，投入压力小",
                    "建议分批采收，保证商品品质",
                ],
            },
        },
        {
            weather: {
                location: "西安",
                condition: "雷阵雨",
                temperature: "21℃",
                forecast: "本周降雨偏多，空气湿度较大。",
            },
            cropIntro: [
                "生长周期：55-70天",
                "适宜温度：20-30℃",
                "适宜季节：春夏季",
            ],
            diseasePrevention: ["霜霉病风险偏高", "注意细菌性角斑病"],
            fertilization: "暂停叶面肥，雨后补施钾肥",
            marketTrend: "黄瓜 3.5 元/kg，趋势小幅回落",
            weatherImpact: "连续降雨，建议加强排湿和病害预防",
            aiAdvice: {
                level: "careful",
                reasons: [
                    "价格略有回落，利润空间变窄",
                    "高湿环境对黄瓜病害不利",
                    "加强排湿可降低损失风险",
                    "建议先小规模种植并观察行情",
                ],
            },
        },
    ],
};

const selectedCrop = ref < CropKey > ("corn");
const lastAnalyzeTime = ref("--:--");

const getFirstAnalysis = (crop: CropKey): CropAnalysis => {
    const first = mockAnalysisMap[crop][0];
    if (!first) {
        throw new Error(`缺少 ${crop} 的 mock 分析数据`);
    }
    return first;
};

const getAnalysisByIndex = (crop: CropKey, index: number): CropAnalysis => {
    const cropData = mockAnalysisMap[crop];
    return cropData[index] ?? getFirstAnalysis(crop);
};

const currentResult = ref < CropAnalysis > (getFirstAnalysis("corn"));

const analysisCursor = reactive < Record < CropKey, number>> ({
    corn: 0,
    wheat: 0,
    rice: 0,
    tomato: 0,
    cucumber: 0,
});

const adviceTextMap: Record<AdviceLevel, string> = {
    recommended: "推荐种植",
    careful: "谨慎种植",
    avoid: "不建议种植",
};

const adviceTagTypeMap: Record<AdviceLevel, "success" | "warning" | "danger"> = {
    recommended: "success",
    careful: "warning",
    avoid: "danger",
};

const currentCropLabel = computed(
    () => cropOptions.find((item) => item.key === selectedCrop.value)?.label ?? ""
);

const decisionText = computed(
    () => adviceTextMap[currentResult.value.aiAdvice.level]
);

const decisionTagType = computed(
    () => adviceTagTypeMap[currentResult.value.aiAdvice.level]
);

const analysisCards = computed < AnalysisCard[] > (() => [
    {
        title: "作物介绍",
        items: currentResult.value.cropIntro,
    },
    {
        title: "病害预防",
        items: currentResult.value.diseasePrevention,
    },
    {
        title: "施肥建议",
        items: [currentResult.value.fertilization],
    },
    {
        title: "市场行情",
        items: [currentResult.value.marketTrend],
    },
    {
        title: "天气影响",
        items: [currentResult.value.weatherImpact],
    },
]);

const updateAnalyzeTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    lastAnalyzeTime.value = `${hours}:${minutes}`;
};

// 点击“开始分析”后模拟刷新中下区域数据
const startAnalysis = () => {
    const cropData = mockAnalysisMap[selectedCrop.value];
    const index = analysisCursor[selectedCrop.value] % cropData.length;
    currentResult.value = getAnalysisByIndex(selectedCrop.value, index);
    analysisCursor[selectedCrop.value] = (index + 1) % cropData.length;
    updateAnalyzeTime();
};

const handleSelectCrop = (crop: CropKey) => {
    selectedCrop.value = crop;
    startAnalysis();
};

startAnalysis();
</script>

<style scoped lang="scss">
.agriculture-page {
    min-height: 100dvh;
    box-sizing: border-box;
    padding: 14px 12px calc(28px + env(safe-area-inset-bottom));
    overflow-y: auto;
    background:
        radial-gradient(circle at top right, rgba(120, 187, 132, 0.2) 0%, rgba(120, 187, 132, 0) 45%),
        linear-gradient(180deg, #edf7ee 0%, #f6fbf6 42%, #eef6ef 100%);
}

.section-card {
    border-radius: 16px;
    background: #ffffff;
    box-shadow: 0 6px 18px rgba(29, 82, 42, 0.08);
    padding: 16px;
}

.page-header {
    .page-title {
        margin: 0;
        font-size: 30px;
        line-height: 1.2;
        color: #1f5d2e;
        font-weight: 700;
    }

    .page-subtitle {
        margin: 8px 0 0;
        font-size: 17px;
        color: #4d7058;
        line-height: 1.5;
    }
}

.crop-selector {
    margin-top: 14px;

    .section-label {
        margin: 0;
        font-size: 17px;
        font-weight: 600;
        color: #2a6038;
    }

    .crop-list {
        margin-top: 10px;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 10px;
    }

    .crop-btn {
        height: 46px;
        border: 1px solid #c9dfce;
        background: #f7fbf8;
    }

    .crop-btn:deep(.van-button__text) {
        font-size: 18px;
        font-weight: 600;
    }

    .crop-btn.van-button--primary {
        border: none;
        background: linear-gradient(90deg, #2f9b4b 0%, #3bad57 100%);
        box-shadow: 0 4px 10px rgba(50, 147, 73, 0.25);
    }

    .selected-crop {
        margin: 10px 0 0;
        font-size: 16px;
        color: #446952;
    }
}

.weather-card {
    margin-top: 14px;
    border-radius: 14px;
    border: 1px solid #d9eadc;
    padding: 12px;
    background: #f2faf3;

    .weather-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
    }

    .weather-city {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: #2d5d39;
    }

    .weather-temp {
        margin: 8px 0 0;
        font-size: 34px;
        line-height: 1;
        font-weight: 700;
        color: #1f6b33;
    }

    .weather-desc {
        margin: 8px 0 0;
        font-size: 16px;
        line-height: 1.6;
        color: #4b6c57;
    }
}

.analyze-btn {
    margin-top: 14px;
    height: 48px;
}

.analyze-btn:deep(.van-button__text) {
    font-size: 19px;
    font-weight: 700;
    letter-spacing: 1px;
}

.analyze-time {
    margin: 8px 0 0;
    font-size: 14px;
    color: #67816f;
}

.analysis-section {
    margin-top: 14px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.analysis-card {
    border-radius: 14px;
    border: 1px solid #dfede2;
    background: #f8fcf8;
    box-shadow: 0 4px 12px rgba(57, 111, 66, 0.06);
    padding: 14px 16px;

    .card-title {
        margin: 0;
        font-size: 21px;
        font-weight: 700;
        color: #1f5f34;
    }

    .card-list {
        margin: 8px 0 0;
        padding-left: 22px;
    }

    .card-list li {
        margin-bottom: 2px;
        font-size: 16px;
        line-height: 1.7;
        color: #355543;
    }
}

.summary-section {
    margin-top: 14px;

    .summary-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 10px;
    }

    .summary-title {
        margin: 0;
        font-size: 23px;
        font-weight: 700;
        color: #1f5d2f;
    }

    .decision-tag {
        flex-shrink: 0;
    }

    .decision-tag:deep(.van-tag) {
        padding: 5px 10px;
        font-size: 15px;
        font-weight: 600;
    }

    .reason-list {
        margin: 12px 0 0;
        padding-left: 24px;
    }

    .reason-list li {
        margin-bottom: 4px;
        font-size: 16px;
        line-height: 1.75;
        color: #2f523e;
    }
}
</style>

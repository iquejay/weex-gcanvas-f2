<template>
  <div class="ml10 mr20">
    <div>
      <canvas v-if="isWeb" :id="chartId" ref="canvas_holder" :style="{width: width+'px', height:height+'px'}"></canvas>
      <gcanvas v-else :id="chartId" ref="canvas_holder" :style="{width: width+'px', height:height+'px'}"></gcanvas>
    </div>
  </div>
</template>
<script>
/* IFTRUE_isNative */
import { enable, WeexBridge, Image as GImage } from "gcanvas.js";
/* FITRUE_isNative */
import F2 from "./f2.js";
// import color from '@/common/color';
import config from "@/config";
const animation = weex.requireModule("animation");
export default {
  props: {
    data: {
      type: Array
    },
    width: {
      default: 750
    },
    height: {
      default: 350
    },
    animation: {
      type: Boolean,
      default: true
    },
    scale: {
      type: Number,
      default: 4
    },
    colors: {
      type: Array
    },
    smooth: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isWeb: weex.config.env.platform === 'Web',
      chart: null,
      locationLineVisible: true,
      lineColor: config.primaryColor,
      lineStyle: {}
    };
  },
  watch: {
    data() {
      this.renderChart(this.data);
    }
  },
  mounted() {
    this.renderChart(this.data);
  },
  destroyed() {
    this.chart && this.chart.destroy();
  },
  computed: {
    chartId() {
      return "chart" + this._uid;
    }
  },
  methods: {
    formatDate(date) {
      return date.replace(/(\d{4})[^\d]?(\d{2})[^\d]?(\d{2})/, "$1-$2-$3");
    },
    renderChart(chartData) {
      if (!this.chart) this.initChart(chartData);
      else {
        var that = this;
        this.chart.scale("value", {
          tickCount: 5,
          formatter: function formatter(val) {
            return val.toFixed(that.scale);
          }
        });
        this.chart.changeData(chartData);
      }
    },
    initChart(chartData) {
      let that = this;
      // Step 1: 创建 Chart 对象
      if (weex.config.env.platform != "Web") {
        /* IFTRUE_isNative */
        let ref = this.$refs.canvas_holder;
        ref = enable(ref, { bridge: WeexBridge });
        let ctx = ref.getContext("2d");
        const canvas = new F2.Renderer(ctx);
        this.canvas = canvas;
        this.chart = new F2.Chart({
          el: canvas, // 将第三步创建的 canvas 对象的上下文传入
          width: this.width, // 必选，图表宽度，同 canvas 的宽度相同
          height: this.height // 必选，图表高度，同 canvas 的高度相同
        });
        /* FITRUE_isNative */
      } else {
        /* IFTRUE_isWeb */
        this.chart = new F2.Chart({
          id: that.chartId,
          pixelRatio: window.devicePixelRatio // 指定分辨率
        });
        /* FITRUE_isWeb */
      }
      let chart = this.chart;
      chart.legend(false);
      chart.animate(false); // weex.config.env.platform == 'Web'
      this.render(chart, chartData);
    },
    render(chart, chartData) {
      let that = this;
      // Step 2: 载入数据源
      chart.source(chartData, {
        value: {
          tickCount: 5,
          formatter: function formatter(val) {
            return val.toFixed(that.scale);
          }
        },
        date: {
          type: "timeCat",
          range: [0, 1],
          mask: "MM-DD",
          tickCount: 5
        }
      });
      // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
      chart.axis("date", {
        label: function label(text, index, total) {
          var textCfg = {};
          if (index === 0) {
            // textCfg.textAlign = 'start'
          } else if (index === total - 1) {
            textCfg.textAlign = "end";
          }
          return textCfg;
        },
        line: null
      });
      chart.axis(false);
      chart.tooltip(false);
      let lineSize = weex.config.env.platform == "Web" ? 2 : 4;
        // {sortable: false}
      let line = chart.line().position("date*value");
      if (this.smooth) {
        line.shape("smooth");
      }
      line.color("type", that.colors).size(lineSize);
      // Step 4: 渲染图表
      chart.render();
    }
  }
};
</script>

<template>
  <scroller>
    <div style="background-color: #4688FA;margin-top: 100px;" class="chart-card">
      <div class="chart-card_desc">
        <text class="chart-card_text">全部订单</text>
        <text class="chart-card_text">3000</text>
      </div>
      <chart :colors="['#ffffff']" width="622" height="160" :smooth="lineSmooth" :data="chartData"></chart>
    </div>
    <div style="background-color: #FFAA33;margin-top: 16px;margin-bottom: 16px;" class="chart-card">
      <div class="chart-card_desc">
        <text class="chart-card_text">完成订单</text>
        <text class="chart-card_text">2000</text>
      </div>
      <chart :colors="['#ffffff']" width="622" height="160" :smooth="lineSmooth" :data="chartData2"></chart>
    </div>
    <div style="background-color: #FF4759;" class="chart-card">
      <div class="chart-card_desc">
        <text class="chart-card_text">取消订单</text>
        <text class="chart-card_text">1000</text>
      </div>
      <chart :colors="['#ffffff']" width="622" height="160" :smooth="lineSmooth" :data="chartData3"></chart>
    </div>
  </scroller>
</template>

<script>
import chart from '@/components/chart/chart'
function randomScalingFactor () {
  return Math.round(Math.random() * 3000)
}
export default {
  components: {
    chart
  },
  data () {
    return {
      lineSmooth: true, // 改为false正常，改为true会异常
      chartData: [],
      chartData2: [],
      chartData3: []
    }
  },
  created () {
    for (var i = 0; i < 10; i++) {
      this.chartData.push({
        type: 'line',
        date: `2019-10-29 0${i}:00:00`,
        value: randomScalingFactor()
      })
      this.chartData2.push({
        type: 'line',
        date: `2019-10-29 0${i}:00:00`,
        value: randomScalingFactor()
      })
      this.chartData3.push({
        type: 'line',
        date: `2019-10-29 0${i}:00:00`,
        value: randomScalingFactor()
      })
    }
  }
}
</script>
<style scoped>
.chart-card {
  padding-top: 32px;
  padding-left: 32px;
  padding-right: 32px;
  margin-left: 32px;
  width: 686px;
  border-radius: 12px;
}
.chart-card_desc {
  flex-direction: row;
  justify-content: space-between;
}
.chart-card_text {
  color: #ffffff;
  font-size: 28px;
}
</style>

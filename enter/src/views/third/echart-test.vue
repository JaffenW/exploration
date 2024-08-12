<template>
  <div ref="container" class="container">11</div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'echart-test',
  data () {
    return {
      echarts
    }
  },
  mounted () {
    const echart = echarts.init(this.$refs.container)
    echart.setOption({
      title: {
        text: '测试'
      },
      tooltip: {},
      xAxis: {
        data: ['a', 'b', 'c']
      },
      yAxis: {
        data: []
      },
      series: {
        name: '水果',
        type: 'bar',
        data: [199, 200, 210]
      }
    })
  }
}
</script>

<style scoped>
.container {
  height: 50%;
  width: 50%;
}
</style>

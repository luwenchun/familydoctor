<template>
  <section>
    <!--卡片展示-->
    <wn-row>
      <wn-col :xs="24 " :sm="12 "  class="col-sm-2-4" >
        <div class="card1" style="margin-left: -8px">
          <div class="box-content">
            <div  style="min-height: 70px;">
              <div class="card1-title"><span>年度签约总金额</span></div>
              <div class="desc clearfix">
                <span class="number pull-left">9832</span>
                <span class="yuan pull-left">元</span>
                <img class="pull-right" src="../../../static/img/icon_cg1.png" alt=""/>
              </div>
            </div>
          </div>
        </div>
      </wn-col>
      <wn-col :xs="24 " :sm="12 "  class="col-sm-2-4">
        <div class="card1">
          <div class="box-content">
            <div  style="min-height: 70px;">
              <div class="card1-title"><span>累计签署协议总数</span></div>
              <div class="desc clearfix">
                <span class="number pull-left">900</span>
                <span class="yuan pull-left">份</span>
                <img class="pull-right" src="../../../static/img/kpdb-12.png" alt=""/>
              </div>
            </div>
          </div>
        </div>
      </wn-col>
      <wn-col :xs="24 " :sm="12 "  class="col-sm-2-4">
        <div class="card1">
          <div class="box-content">
            <div  style="min-height: 70px;">
              <div class="card1-title"><span>年度新签约总数</span></div>
              <div class="desc clearfix">
                <span class="number pull-left">30</span>
                <span class="yuan pull-left">份</span>
                <img class="pull-right" src="../../../static/img/icon_cg3.png" alt=""/>
              </div>
            </div>
          </div>
        </div>
      </wn-col>
      <wn-col :xs="24 " :sm="12 "  class="col-sm-2-4">
        <div class="card1">
          <div class="box-content">
            <div  style="min-height: 70px;">
              <div class="card1-title"><span>一周内到期签约总数</span></div>
              <div class="desc clearfix">
                <span class="number pull-left">10</span>
                <span class="yuan pull-left">份</span>
                <img class="pull-right" src="../../../static/img/kpdb-16.png" alt=""/>
              </div>
            </div>
          </div>
        </div>
      </wn-col>
      <wn-col :xs="24 " :sm="12 " class="col-sm-2-4">
        <div class="card1" style="margin-right: -8px">
          <div class="box-content">
            <div  style="min-height: 70px;">
              <div class="card1-title"><span>年度协议履约率</span></div>
              <div class="desc clearfix">
                <span class="number pull-left">80</span>
                <span class="yuan pull-left">%</span>
                <img class="pull-right" src="../../../static/img/icon_cg4.png" alt=""/>
              </div>
            </div>
          </div>
        </div>
      </wn-col>
    </wn-row>
    <!--echart展示-->
    <wn-row>
      <wn-col :xs="24" :md="12">
        <div class="box" style="margin-right: 8px;">
          <div class="box-header">
            <div class="box-name">
              <i class="fa fa-bar-chart-o"></i>
              <span>月度签约趋势</span>
            </div>
          </div>
          <div class="box-content" style="padding: 0">
            <div id="chart1" style="min-height: 190px;"></div>
          </div>
        </div>
      </wn-col>
      <wn-col :xs="24" :md="12">
        <div class="box" style="margin-left: 8px">
          <div class="box-header">
            <div class="box-name">
              <i class="fa fa-circle"></i>
              <span>服务未赴约率 top5</span>
            </div>
          </div>
          <div class="box-content" style="padding: 0">
            <div id="chart2" style="min-height: 190px;"></div>
          </div>
        </div>
      </wn-col>
    </wn-row>
    <!--echart展示-->
    <wn-row>
      <wn-col :xs="24" >
        <div class="box">
          <div class="box-header">
            <div class="box-name">
              <i class="fa fa-map-marker"></i>
              <span>重点人群签约分布</span>
            </div>
          </div>
          <div class="box-content">
            <div id="chart3" style="min-height: 190px;"></div>
          </div>
        </div>
      </wn-col>
    </wn-row>
  </section>
</template>
<script type="text/javascript">
  import echarts from 'echarts'
  export default {
    data(){
    return{
      chart1:null,
      chart2:null,
      chart3:null
    }
  },
  mounted:function(){
    let that=this;
    let color = ['#4bcddb', '#e79355', '#8bbc51'];
    this.chart1=echarts.init(document.getElementById('chart1'));
    this.chart2=echarts.init(document.getElementById('chart2'));
    this.chart3=echarts.init(document.getElementById('chart3'));
    this.chart1.setOption({
      color:color,
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        itemWidth: 8,
        itemHeight: 8,
        itemGap: 13,
        data: ['新签约', '续约', '解约'],
        top:'0%',
        textStyle: {
          fontSize: 11,
          color: '#959595',
        }
      },
      grid: {
        top:'12%',
        right:'3%',
        bottom: '6%',
        left:'3%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        axisTick: {
          show:false
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#959595'
          }

        },
        axisLine: {
          lineStyle:{
            color:'#eee'
          }
        },
        data: ['12月','01','02','03','04','05','06','07','08','09','10','11']
      }],
      yAxis: [{
        // type: 'value',
//            name: '万张',
//            nameTextStyle:{color:'#959595'},
        minInterval: 5,
        //控制y轴线
        axisLine: {
          show:false
        },
        //控制y轴刻度
        axisTick: {
          show: false
        },
        //控制y轴颜色
        axisLabel:{
          color:'#959595',
          fontSize:'10'
        },
        //控制y轴网格线
        splitLine:{
          show:true,
          lineStyle: {
            color: ['#f2f6f9']
          }
        }

      }],
      series: [
        {
          name: '新签约',
          type: 'line',
          smooth: false,
          symbolSize: 7,
          data: [42, 48, 59, 43, 45,42, 48, 59, 43,42, 48, 59]
        },
        {
          name: '续约',
          type: 'line',
          smooth: false,
          symbolSize: 7,
          data: [32, 38, 32, 34, 32,32, 38, 32, 34, 32,34, 32]
        },  {
          name: '解约',
          type: 'line',
          smooth: false,
          symbolSize: 7,
          data: [ 14, 16, 14, 18,12, 14, 16,12, 14, 16, 14, 18]


        }
      ]
    });
    this.chart2.setOption({
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        top:'12%',
        right:'3%',
        bottom: '6%',
        left:'3%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        boundaryGap: true,
        axisTick: {
          show:false,
          alignWithLabel: true
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#959595'
          }

        },
        axisLine: {
          lineStyle:{
            color:'#eee'
          }
        },
        data: [
          {value:'入户访视'},
          {value:'老年人评估'},
          {value:'快速血压'},
          {value:'快速血糖'},
          {value:'慢病随访'}
        ]
      }],
      yAxis: [{
        minInterval:20,
        //控制y轴线
        axisLine: {
          show:false
        },
        //控制y轴刻度
        axisTick: {
          show: false,
        },
        //控制y轴颜色
        axisLabel:{
          color:'#959595',
          fontSize:'10',
          formatter: '{value} %'
        },
        //控制y轴网格线
        splitLine:{
          show:true,
          lineStyle: {
            color: ['#f2f6f9']
          }
        }
      }],
      series: [
        {
          type:'bar',
          barWidth:'5%',
          data:[
            40,
            50,
            80,
            70,
            60
          ],
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                "offset": 0,
                "color": "#7fbbfe" // 0% 处的颜色
              }, {
                "offset": 1,
                "color": "#d98df4" // 100% 处的颜色
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10,
            }
          }
        }
      ]
    });
    this.chart3.setOption({
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        top:'2%',
        right:'1%',
        bottom: '1%',
        left:'1%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        axisTick: {
          show:false,
          alignWithLabel: true
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#959595'
          }

        },
        axisLine: {
          lineStyle:{
            color:'#eee'
          }
        },
        data: ['老年人','儿童','孕产妇','精神院','高血压','糖尿病','脑猝中','冠心病','肺结核','残疾人','低收入','计划生育特殊家庭']
      }],
      yAxis: [{
        minInterval:10,
        //控制y轴线
        axisLine: {
          show:false
        },
        //控制y轴刻度
        axisTick: {
          show: false,
        },
        //控制y轴颜色
        axisLabel:{
          color:'#959595',
          fontSize:'10',
        },
        //控制y轴网格线
        splitLine:{
          show:true,
          lineStyle: {
            color: ['#f2f6f9']
          }
        }
      }],
      series: [
        {
          type:'bar',
          barWidth:'5%',
          data:[50, 80, 70, 60,30,40,50,60,70,70,90,55],
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                "offset": 0,
                "color": "#7fbbfe" // 0% 处的颜色
              }, {
                "offset": 1,
                "color": "#d98df4" // 100% 处的颜色
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10,
            }
          }
        }
      ]
    });
  }
  }

</script>
<style scoped>
  .card1 {
    background: #fff;
    display: block;
    z-index: 1999;
    position: relative;
    border: 1px solid #f8f8f8;
    box-shadow: 0 0 4px #D8D8D8;
    margin-bottom: 15px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }
  .card1 .card1-title {
    font-weight: bold;
    padding: 5px 0;
    font-size: 12px;
    color: #666;
  }
  .card1 .desc {
    line-height: 35px;
  }
  .card1 .number {
    font-size: 22px;
    font-weight: bold;
    color: #666;
  }
  .pull-left {
    float: left !important;
  }
  .card1 .yuan {
    color: #9d9d9d;
    margin-left: 10px;
    line-height: 40px;
    font-size: 12px;
  }
  .pull-right {
    float: right !important;
  }
  img {
    vertical-align: middle;
  }
  .card1:hover {
    box-shadow: 0 0 4px #007eca;
  }
  @media (min-width: 768px){
    .col-sm-2-4 {
      position: relative;
      min-height: 1px;
      padding-right: 8px;
      padding-left: 8px;
      width: 20%;
      float: left;
    }
  }

</style>

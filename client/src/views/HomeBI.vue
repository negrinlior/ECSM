<template>
  <div class="MainContainer" >
    <!-- <div v-if="isLoades">
     <li  v-for="item in CustomersPieData" :key="item.message">
            {{item.CustomerName}}{{ FillDataSourceChart(item.CustomerID) }} 
          </li>  
      </div> -->
    <BR/><BR/><BR/><BR/><BR/><BR/> <BR/><BR/><BR/>  
    <img alt="ECS logo" src="../assets/ECSLogo.png" width="230" height="100">
    <img alt="MALAB logo" src="../assets/MalabLogo.png" width="380" height="100">
    
    <ejs-accumulationchart id="PieContainer" style='display:block' :legendSettings='CustomersPieLegendSettings' :tooltip='CustomersPieTooltip' :primaryYAxis='CustomersPiePrimaryYAxis' :title='CustomersPieTitle'>
          <e-accumulation-series-collection >
              <e-accumulation-series :dataSource='CustomersPieData' :dataLabel='CustomersPieDataLabel' xName='CustomerName' yName='numBdikot' innerRadius='60%'
                explode=true explodeOffset='10%' :explodeIndex='0'> </e-accumulation-series>
          </e-accumulation-series-collection>
    </ejs-accumulationchart>
    
    <div id='Chart'></div>


     <ejs-chart v-if="isLoades" id="ChartContainer" ref='chart' style='display:block' :title='BdikotByYearTitle' :primaryXAxis='BdikotByYearPrimaryXAxis' :primaryYAxis='BdikotByYearPrimaryYAxis'>
      <e-series-collection v-for="item in CustomersPieData" :key="item.CustomerName" >
          <e-series :dataSource='FillDataSourceChart(item.CustomerID)' type='StackingArea' xName='שנה' yName='מספר_בדיקות' ></e-series>
          <!-- <li v-for="item in items" :key="item.message">
            {{ item.message }}
          </li> -->

          <!-- <e-series :dataSource='[{"שנה":2018,"לקוח":"החברה למשק וכלכלה","מספר בדיקות":697},{"שנה":2019,"לקוח":"החברה למשק וכלכלה","מספר בדיקות":913},{"שנה":2016,"לקוח":"החברה למשק וכלכלה","מספר בדיקות":594},{"שנה":2020,"לקוח":"החברה למשק וכלכלה","מספר בדיקות":371},{"שנה":2017,"לקוח":"החברה למשק וכלכלה","מספר בדיקות":691},{"שנה":2014,"לקוח":"החברה למשק וכלכלה","מספר בדיקות":17},{"שנה":2015,"לקוח":"החברה למשק וכלכלה","מספר בדיקות":578}]' 
          type='StackingArea' xName='שנה' yName='מספר בדיקות' > </e-series>  -->
          <!-- <e-series :dataSource='BdikotByYearData2' type='StackingArea' xName='שנה' yName='מספר בדיקות' > </e-series> 
          <e-series :dataSource='BdikotByYearData3' type='StackingArea' xName='שנה' yName='מספר בדיקות' > </e-series>  -->
          
      </e-series-collection>
    </ejs-chart>


  </div>
</template>

<script>
        import Vue from "vue";
        import { AccumulationChartPlugin, PieSeries, AccumulationLegend, AccumulationDataLabel, AccumulationTooltip} from "@syncfusion/ej2-vue-charts";
        import { ChartPlugin, StackingAreaSeries, Legend, DateTime} from "@syncfusion/ej2-vue-charts";
        import { DataManager,Query } from '@syncfusion/ej2-data';
        import ServerConfig from '../ServerConfig';
        import GetDataServices from '../services/GetDataServices';

        //const axios = require('axios');
        Vue.use(AccumulationChartPlugin);
        Vue.use(ChartPlugin);

        export default Vue.extend({
          data() {
            return {
                      CustomersPieTitle:"לקוחות לפי מספר בדיקות",
                      CustomersPieData: [],
                      CustomersPieDataLabel: { visible: true, name: 'מספר בדיקות' },
                      CustomersPieLegendSettings: {visible: false, position: 'Top'},
                      CustomersPieTooltip: { enable: true},
                      CustomersPiePrimaryYAxis:{
                          title: 'לקוח',
                          minimum: -3,
                          maximum: 3,
                          interval: 1,
                          lineStyle: { width: 0 },
                          majorTickLines: { width: 0 }, majorGridLines: { width: 1 },
                          minorGridLines: { width: 1 }, minorTickLines: { width: 0 },
                          labelFormat: '{value}B',
                      },
 
                      BdikotByYearTitle: "בדיקות לפי שנים",
                      BdikotByYearData: [],
                      BdikotByYearData1: [],
                      isLoades:false,
                      BdikotByYearPrimaryXAxis: {
                           //valueType: 'DateTime',
                           //intervalType: 'Years',
                           //majorGridLines: { width: 0 },
                          // labelFormat: 'y',
                           edgeLabelPlacement: 'Shift',
                           lineStyle: { width: 0},
                           majorTickLines: { width: 0}
                      },
                      BdikotByYearPrimaryYAxis:
                      {
                          title: 'מספר בדיקות',
                          minimum: 0, 
                          //maximum: 700, interval: 1,
                          labelFormat: '{value}',
                          lineStyle: { width: 0},
                          majorTickLines: { width: 0}
                      },
                     
                   };
          },
          provide: {
            accumulationchart: [AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel],
            chart: [StackingAreaSeries, Legend, DateTime]
          },
          methods:{
              FillDataSourceChart: function (val){ 
               // alert(val);
               //alert('Fill');
                                //this.BdikotByYearData=await GetDataServices.GetDataFromAPIReturnJson("HomeBIAPI/BdikotByClientAndYear");
                                 // this.BdikotByYearData1 =await new DataManager(this.BdikotByYearData).executeLocal(new Query().where("לקוח","equal",val).clone());
                                 // this.BdikotByYearData2 =await new DataManager(this.BdikotByYearData).executeLocal(new Query().where("לקוח","equal",val).clone());
                                  //alert(JSON.stringify(this.BdikotByYearData1));
                                  //alert(JSON.stringify(this.BdikotByYearData1[val]));
                                  //return (await this.BdikotByYearData1[val]);
                                 // var x=await JSON.stringify(this.BdikotByYearData2);
                                  //alert (JSON.stringify(this.BdikotByYearData1[val]));
                                  //return (JSON.stringify(this.BdikotByYearData1[val]));
                                  //alert(this.$refs.chart);
                                  //return (this.BdikotByYearData1[val]);
                                  return ([{"שנה":2018,"מספר_בדיקות":697},{"שנה":2019,"מספר_בדיקות":913},{"שנה":2016,"מספר_בדיקות":594},{"שנה":2020,"מספר_בדיקות":371},{"שנה":2017,"מספר_בדיקות":691},{"שנה":2014,"מספר_בדיקות":17},{"שנה":2015,"מספר_בדיקות":578}]);
                                  
                                  //return (JSON.stringify(this.BdikotByYearData1[val]));
                                  }
           },

           created: async function(){
                this.CustomersPieData=await GetDataServices.GetDataFromAPIReturnJson("HomeBIAPI/ClientDisterbution");
                this.BdikotByYearData=await GetDataServices.GetDataFromAPIReturnJson("HomeBIAPI/BdikotByClientAndYear");

                for(var i = 0; i < this.CustomersPieData.length; i++) {
                    var obj = this.CustomersPieData[i];

                    this.BdikotByYearData1[obj.CustomerID]=await new DataManager(this.BdikotByYearData).executeLocal(new Query().where("לקוח","equal",obj.CustomerName).clone());
                    this.BdikotByYearData1[obj.CustomerID]=await new DataManager(this.BdikotByYearData1[obj.CustomerID]).executeLocal(new Query().select(["שנה","מספר_בדיקות"]));
                     
                }
                this.isLoades=true;  //ok can render coponent             
              },
        })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #container {
     height: 200px;
      }
</style>
<template>
  <div class="MainContainer" >
    <div class="control-section dashboard-default">
      <ejs-dashboardlayout ref="DashbordInstance" :columns="5" id='defaultLayout' :allowResizing="false" :cellSpacing="spacing" :cellAspectRatio='cellAspectRatio'>
          <div id="LOGOS" class="e-panel" data-row="0" data-col="0" data-sizeX="3" data-sizeY="2">
            <div class="e-panel-container"> 
              <img alt="ECS logo" src="../assets/ECSLogo.png" width="230" height="100">
              <img alt="MALAB logo" src="../assets/MalabLogo.png" width="380" height="100">
            </div>
          </div>
          <div id="Chart" class="e-panel" data-row="2" data-col="0" data-sizeX="2" data-sizeY="8">
              <div class="e-panel-container">
                <ejs-accumulationchart id="PieContainer" style='display:block' :legendSettings='CustomersPieLegendSettings' :tooltip='CustomersPieTooltip' :primaryYAxis='CustomersPiePrimaryYAxis' :title='CustomersPieTitle'>
                    <e-accumulation-series-collection >
                        <e-accumulation-series :dataSource='CustomersPieData' :dataLabel='CustomersPieDataLabel' xName='CustomerName' yName='numBdikot' innerRadius='60%'
                          explode=true explodeOffset='10%' :explodeIndex='0'> </e-accumulation-series>
                    </e-accumulation-series-collection>
                </ejs-accumulationchart> 
              </div>
          </div>
          <div id="LineChart" class="e-panel" data-row="2" data-col="2" data-sizeX="3" data-sizeY="8">
              <div class="e-panel-container">
                <ejs-chart v-if="isLoades" id="ChartContainer" style='display:block' :title='BdikotByYearTitle' :primaryXAxis='BdikotByYearPrimaryXAxis' :primaryYAxis='BdikotByYearPrimaryYAxis'>
                  <e-series-collection >
                      <e-series  v-for="item in CustomersPieData" :key="item.CustomerName" :name="item.CustomerName" :dataSource='FillDataSourceChart(item.CustomerID)' type='StackingArea' xName='שנה' yName='מספר_בדיקות'  ></e-series>
                  </e-series-collection>
                </ejs-chart> 
              </div>
          </div>
      </ejs-dashboardlayout>   
    </div>
  </div>
</template>

<script>
        import Vue from "vue";
        import { AccumulationChartPlugin, PieSeries, AccumulationLegend, AccumulationDataLabel, AccumulationTooltip} from "@syncfusion/ej2-vue-charts";
        import { ChartPlugin, StackingAreaSeries, Legend, DateTime} from "@syncfusion/ej2-vue-charts";
        import { DataManager,Query } from '@syncfusion/ej2-data';
        import { DashboardLayoutPlugin } from "@syncfusion/ej2-vue-layouts";
        import ServerConfig from '../ServerConfig';
        import GetDataServices from '../services/GetDataServices';

        //const axios = require('axios');
        Vue.use(AccumulationChartPlugin);
        Vue.use(ChartPlugin);
        Vue.use(DashboardLayoutPlugin);

        export default Vue.extend({
          data() {
            return {
                      spacing: [10,10],
                      cellAspectRatio: 100/20,

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
 
                      BdikotByYearTitle: "בדיקות לפי שנים - מצטבר",
                      BdikotByYearData: [],
                      BdikotByYearData1: [],
                      isLoades:false,
                      BdikotByYearPrimaryXAxis: {
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
                                            return (this.BdikotByYearData1[val]);
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
<style>
    @import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
    @import "../../node_modules/@syncfusion/ej2-vue-layouts/styles/material.css";

    #dashboard_layout .e-panel .e-panel-content {
    vertical-align: middle;
    font-weight: 600;
    font-size: 20px;
    text-align: center;
    line-height: 60px;
}

    #container {
     height: 200px;
      }
</style>
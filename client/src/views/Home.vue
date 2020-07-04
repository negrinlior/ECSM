<template>
  <div class="MainContainer" >
    <div class="control-section dashboard-default" >
      <ejs-dashboardlayout  ref="DashbordInstance" :columns="5" id='defaultLayout' :allowResizing="false" :cellSpacing="spacing" :cellAspectRatio='cellAspectRatio'  style="z-index: 0;">
          
          <div id="LOGOS" class="e-panel" data-row="0" data-col="0" data-sizeX="2" data-sizeY="2">
            <div class="e-panel-container"> 
              <img alt="ECS logo" src="../assets/ECSLogo.png" class="ECSIMG">
              <img alt="MALAB logo" src="../assets/MalabLogo.png"  class="MALABIMG">
            </div>
          </div>

          <div id="Statistics" class="e-panel" data-row="0" data-col="0" data-sizeX="3" data-sizeY="2">
            <div class="e-panel-container"> 
              <table class="TBLCSS"  v-if="isLoades" >
                <tr>
                  <td>הפרות לא תקינות</td>
                  <td>תלושים</td>
                  <td>עובדים</td>
                </tr>
                 <tr>
                    <td>
                        <i class="material-icons" style="font-size:31px;">gavel</i>
                        {{KPIStats[0].Hafarot}}
                    </td>
                    <td>
                        <i class="material-icons"  style="font-size:31px;">receipt</i>
                         {{KPIStats[0].Tlushim}}
                    </td>
                    <td>
                        <i class="material-icons" style="font-size:31px;">assignment_ind</i>
                         {{KPIStats[0].Ovdim}}
                    </td>
                </tr>
              </table>
              <img v-else alt="Loading" src="../assets/LoadingAnim.gif" class="LoadingIMG">
            </div>
          </div>
          
          <div id="Chart" class="e-panel" data-row="2" data-col="0" data-sizeX="2" data-sizeY="8">
              <div class="e-panel-container">
                <ejs-accumulationchart  v-if="isLoades" id="PieContainer" style='display:block' :legendSettings='CustomersPieLegendSettings' :tooltip='CustomersPieTooltip' :primaryYAxis='CustomersPiePrimaryYAxis' :title='CustomersPieTitle'>
                    <e-accumulation-series-collection >
                        <e-accumulation-series :dataSource='CustomersPieData' :dataLabel='CustomersPieDataLabel' xName='CustomerName' yName='numBdikot' innerRadius='60%'
                          explode=true explodeOffset='10%' :explodeIndex='0'> </e-accumulation-series>
                    </e-accumulation-series-collection>
                </ejs-accumulationchart> 
                <img v-else alt="Loading" src="../assets/LoadingAnim.gif" class="LoadingIMG">
              </div>
          </div>

          <div id="LineChart" class="e-panel" data-row="2" data-col="2" data-sizeX="3" data-sizeY="8">
              <div class="e-panel-container">
                <ejs-chart v-if="isLoades" id="ChartContainer" style='display:block' :title='BdikotByYearTitle' :primaryXAxis='BdikotByYearPrimaryXAxis' :primaryYAxis='BdikotByYearPrimaryYAxis'>
                  <e-series-collection >
                      <e-series  v-for="item in CustomersPieData" :key="item.CustomerName" :name="item.CustomerName" :dataSource='FillDataSourceChart(item.CustomerID)' type='StackingArea' xName='שנה' yName='מספר_בדיקות'  ></e-series>
                  </e-series-collection>
                </ejs-chart> 
                <img v-else alt="Loading" src="../assets/LoadingAnim.gif" class="LoadingIMG">
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

        Vue.use(AccumulationChartPlugin);
        Vue.use(ChartPlugin);
        Vue.use(DashboardLayoutPlugin);

        export default Vue.extend({
          data() {
            return {
                      //----  DASHBOARD LAYOUT CONFIGURATION  ----
                      spacing: [10,10],
                      cellAspectRatio: 100/20,

                      //----  KPI CONFIGURATION  ----
                      KPIStats:[],
                      
                      //----  PIE CONFIGURATION  ----
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
 

                      //----  STACK LINE CONFIGURATION  ----
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
              FillDataSourceChart: function (val){ //Fill stackline for 1 datasource
                                            return (this.BdikotByYearData1[val]);
                                  }
           },

           created: async function(){
                //----  Get Data  ----
                this.CustomersPieData=await GetDataServices.GetDataFromAPIReturnJson("HomeBIAPI/ClientDisterbution");
                this.BdikotByYearData=await GetDataServices.GetDataFromAPIReturnJson("HomeBIAPI/BdikotByClientAndYear");
                
                //----  Split Data - FAST  ----
                for(var i = 0; i < this.CustomersPieData.length; i++) {
                    var obj = this.CustomersPieData[i];

                    this.BdikotByYearData1[obj.CustomerID]= new DataManager(this.BdikotByYearData).executeLocal(new Query().where("לקוח","equal",obj.CustomerName).clone());
                    this.BdikotByYearData1[obj.CustomerID]= new DataManager(this.BdikotByYearData1[obj.CustomerID]).executeLocal(new Query().select(["שנה","מספר_בדיקות"]));
                     
                }

                this.KPIStats=await GetDataServices.GetDataFromAPIReturnJson("HomeBIAPI/Stats");//Takes time thats why i make it async
                this.isLoades=true;  //ok can render coponent             
              },
        })
</script>

<style scoped>
    @import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
    @import "../../node_modules/@syncfusion/ej2-vue-layouts/styles/material.css";

    #dashboard_layout .e-panel .e-panel-content {
        vertical-align: middle;
        font-weight: 600;
        font-size: 20px;
        text-align: center;
        line-height: 60px;
    }

    .MainContainer {
        padding-top: 2px;
      }

    /* ------------- TABLE DESIGN ------------- */
    .TBLCSS {
      width: 100%;
      height: 100%;
      border-collapse:collapse;
    }
    .TBLCSS td:nth-child(even){
       border-left: 1px solid #e3e3e3;
      border-right: 1px solid #e3e3e3;
    }
    .TBLCSS tr:nth-child(even) {
        color: #33DDDD;
        
        text-align: center;
        vertical-align: middle;
        font-size: 3vw;
        font-weight: bold;
 
      }
    .TBLCSS tr:nth-child(odd) {
        /* background: #fafafa; */
        height: 30%;
        text-align: center;
        vertical-align: middle;
        font-weight: bold;
        font-size: 2vw;

      }


    /* ------------- Loading DESIGN ------------- */

    .LoadingIMG{
        display: block;
        margin-left: auto;
        margin-right: auto;
        
        width: auto;
        height: 80%;
    }

    /* ------------- LOGOS DESIGN ------------- */

    .ECSIMG{
        margin-left: auto;
        margin-right: auto;
        padding-left: 4px;
        
        width: 35%;
        height: 70%;

    }
    .MALABIMG{
        margin-left: auto;
        margin-right: auto;
        padding-top: 13px;
        padding-left: 3px;
        
        width: 63%;
        height: 80%;
    }
</style>
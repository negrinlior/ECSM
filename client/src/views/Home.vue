<template>
  <div class="MainContainer">
    <BR/><BR/><BR/><BR/><BR/><BR/> <BR/><BR/><BR/>  
    <img alt="ECS logo" src="../assets/ECSLogo.png" width="230" height="100">
    <img alt="MALAB logo" src="../assets/MalabLogo.png" width="380" height="100">
    
    <ejs-accumulationchart id="container">
          <e-accumulation-series-collection>
              <e-accumulation-series :dataSource='CustomersPieData' xName='x' yName='y' innerRadius='60%'> </e-accumulation-series>
          </e-accumulation-series-collection>
    </ejs-accumulationchart>

  </div>
</template>

<script>
        import Vue from "vue";
        import { AccumulationChartPlugin, PieSeries } from "@syncfusion/ej2-vue-charts";
        import ServerConfig from '../ServerConfig';

        const axios = require('axios');
        Vue.use(AccumulationChartPlugin);

        export default Vue.extend({
          data() {
            return {
                    CustomersPieData: []
                   };
          },
          provide: {
            accumulationchart: [PieSeries]
          },
          methods:{
            
           },
           created: async function(){
                var x=await axios.get(ServerConfig.HomeBIAPI)
                  .then(response => {
                    this.CustomersPieData = response.data; 
                    return 1; 
                  })
                  .catch(e => {
                    alert('F' + e);
                  })
                //  this.CustomersPieData= [
                //   { x: 'Jan', y: 3, text:'January' }, { x: 'Feb', y: 3.5, text: 'February' },
                //   { x: 'Mar', y: 7, text: 'March' }, { x: 'Apr', y: 800, text: 'April' }
                //     ]
              },
        })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #container {
     height: 200px;
      }
</style>
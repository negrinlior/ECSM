<template>
  <div class="UsersGrid">
    <!-- <h1>This is the users grid</h1>
    <BR/> -->
    <ejs-grid  ref='LiorGrid' :allowFiltering='true' :allowSorting='true' :filterSettings='filterOptions'  :created='created' :dataSource="dataSource" :toolbar='toolbar'  :editSettings='editSettings' :toolbarClick='toolbarClick'  :allowExcelExport='true'> 
      <e-columns>
        <e-column field='ID' headerText='ID' textAlign='Right' width=50></e-column>
        <e-column field='First' headerText='שם פרטי' textAlign='Right' width=100></e-column>
        <e-column field='Last' headerText='שם משפחה' textAlign='Right' width=120></e-column>
        <e-column field='Team' headerText='צוות' textAlign='Right' width=100></e-column>
        <e-column field='User' headerText='שם משתמש' textAlign='Left' width=120></e-column>
        <e-column field='PassWord' headerText='סיסמא' textAlign='Left' width=100></e-column> 
        <e-column field='Email' headerText='מייל' textAlign='Left' width=150></e-column> 
        <e-column field='Phone' headerText='טלפון' textAlign='Left' width=100   ></e-column> 
        


        <!-- <e-column field='OrderID' headerText='Order ID' textAlign='Right' width=100></e-column>
        <e-column field='CustomerID' headerText='Customer ID' width=120></e-column>
        <e-column field='Freight' headerText='Freight' width=100></e-column>  -->
      </e-columns>
    </ejs-grid>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { GridPlugin, Filter, Sort, Edit, Toolbar,ExcelExport } from '@syncfusion/ej2-vue-grids';
    import { DataManager, WebApiAdaptor,RemoteSaveAdaptor } from "@syncfusion/ej2-data";
    import UsersData from '../../services/UsersServices';
    const axios = require('axios');


    Vue.use(GridPlugin);

export default Vue.extend({
      data: ()=>{
        let SERVICE_URL: string =" http://localhost:5000/";


        return {
                dataSource: new DataManager({
                  json: [],
                  adaptor: new RemoteSaveAdaptor,
                  insertUrl: '/Home/Insert',
                  updateUrl: SERVICE_URL + 'api/UsersAPI/UpdateUser',
                  removeUrl: '/Home/Delete'
                }), 
                filterOptions: {
                  type: 'CheckBox'
                },
                toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
                editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true },
                
              };
      },
      provide: {
        grid: [Sort,Filter,Edit, Toolbar]       
      },
      methods:{
            created() { 
            var gridOj =this.$refs.LiorGrid;  
            UsersData.GetUsersData(gridOj);
            },
      }
    } );
      
 
</script>

<style>
    @import '../../../node_modules/@syncfusion/ej2-base/styles/material.css'; 
    @import '../../../node_modules/@syncfusion/ej2-buttons/styles/material.css'; 
    @import '../../../node_modules/@syncfusion/ej2-calendars/styles/material.css'; 
    @import '../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css'; 
    @import '../../../node_modules/@syncfusion/ej2-inputs/styles/material.css'; 
    @import '../../../node_modules/@syncfusion/ej2-navigations/styles/material.css'; 
    @import '../../../node_modules/@syncfusion/ej2-popups/styles/material.css'; 
    @import '../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css'; 
    @import "../../../node_modules/@syncfusion/ej2-vue-grids/styles/material.css"; 
</style>


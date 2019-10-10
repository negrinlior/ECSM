<template>
  <div class="UsersGrid">
    <!-- <h1>This is the users grid</h1>
    <BR/> -->
    <ejs-grid  allowFiltering='true' allowSorting='true' :filterSettings='filterOptions'  :dataSource="data" :toolbar='toolbar'  :editSettings='editSettings' :toolbarClick='toolbarClick'  :allowExcelExport='true'  > 
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
    import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";
    

    Vue.use(GridPlugin);

    export default Vue.extend({
      data: ()=>{
        let SERVICE_URI: string =" http://localhost:5000/";
        return {
          data: new DataManager({
            url: SERVICE_URI + 'api/UsersAPI',
            adaptor: new WebApiAdaptor(),
            offline: true
          }),
          /* data2: [
              { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38 },
              { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61 },
              { OrderID: 10250, CustomerID: 'HANAR', Freight: 65.83 },
              { OrderID: 10251, CustomerID: 'VICTE', Freight: 41.34 },
              { OrderID: 10252, CustomerID: 'SUPRD', Freight: 51.3 },
              { OrderID: 10253, CustomerID: 'HANAR', Freight: 58.17 },
              { OrderID: 10254, CustomerID: 'CHOPS', Freight: 22.98 },
              { OrderID: 10255, CustomerID: 'RICSU', Freight: 148.33 },
              { OrderID: 10256, CustomerID: 'WELLI', Freight: 13.97 },
              { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61 },
              { OrderID: 10250, CustomerID: 'HANAR', Freight: 65.83 },
              { OrderID: 10251, CustomerID: 'VICTE', Freight: 41.34 },
              { OrderID: 10252, CustomerID: 'SUPRD', Freight: 51.3 },
              { OrderID: 10253, CustomerID: 'HANAR', Freight: 58.17 },
              { OrderID: 10254, CustomerID: 'CHOPS', Freight: 22.98 },
              { OrderID: 10255, CustomerID: 'RICSU', Freight: 148.33 },
              { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61 },
              { OrderID: 10250, CustomerID: 'HANAR', Freight: 65.83 },
              { OrderID: 10251, CustomerID: 'VICTE', Freight: 41.34 },
              { OrderID: 10252, CustomerID: 'SUPRD', Freight: 51.3 },
              { OrderID: 10253, CustomerID: 'HANAR', Freight: 58.17 },
              { OrderID: 10254, CustomerID: 'CHOPS', Freight: 22.98 },
              { OrderID: 10255, CustomerID: 'RICSU', Freight: 148.33 },
              { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61 },
              { OrderID: 10250, CustomerID: 'HANAR', Freight: 65.83 },
              { OrderID: 10251, CustomerID: 'VICTE', Freight: 41.34 },
              { OrderID: 10252, CustomerID: 'SUPRD', Freight: 51.3 },
              { OrderID: 10253, CustomerID: 'HANAR', Freight: 58.17 },
              { OrderID: 10254, CustomerID: 'CHOPS', Freight: 22.98 },
              { OrderID: 10255, CustomerID: 'RICSU', Freight: 148.33 },
              
          ], */
          filterOptions: {
            type: 'CheckBox'
          },
          toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
          editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true },
        };
      },
      provide: {
        grid: [Sort,Filter,Edit, Toolbar]       
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


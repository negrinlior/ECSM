<template>
  <!-- FK: MisparKablan, ID ANAF, ID CUSTOMER, MISPAR RASHUT-->
    <div v-if="isLoades" class="HaktzaatBdikot">
      <ejs-grid id='mainGrid' ref='MainGrid' height=480  locale='he-IL' :allowFiltering='true' :allowSorting='true' :filterSettings='filterOptions'  :created='GridCreated' :dataSource="dataSource" :toolbar='toolbar'  :editSettings='editSettings' :toolbarClick='toolbarClick'  :allowExcelExport='true' :allowResizing='true'> 
        <e-columns>
          <e-column field='ID'  headerText='ID' textAlign='Right' width=60 :allowEditing ='false' :isPrimaryKey='true' :isIdentity='true'></e-column>
          <e-column field='Customer' headerText='לקוח' textAlign='Right' width=110 foreignKeyField='ID' foreignKeyValue='CustomerName' :dataSource='Customers'></e-column>
          <e-column field='Anaf' headerText='ענף' textAlign='Right' width=120></e-column>
          <e-column field='Kablan' headerText='קבלן' textAlign='Right' width=100></e-column>
          <e-column field='Rashuiot' headerText='רשות' textAlign='Left' width=120 :visible='false'></e-column>
          <e-column field='[User' headerText='משתמש' textAlign='Left' width=100></e-column> 
          <e-column field='Backup User' headerText='מגבה 1' textAlign='Left' width=150></e-column> 
          <e-column field='Backup User 2' headerText='מגבה 2' textAlign='Left' width=100   ></e-column> 
        
        </e-columns>
      </ejs-grid>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { L10n, setCulture } from '@syncfusion/ej2-base';
    import { GridPlugin, Filter, Sort, Edit, Toolbar, ExcelExport, Resize, ForeignKey, created } from '@syncfusion/ej2-vue-grids';
    import { DataManager, WebApiAdaptor,RemoteSaveAdaptor } from "@syncfusion/ej2-data";
    import GetDataServices from '../../services/GetDataServices';
    import HebConf from './GridHebConfig.js';
    import ServerConfig from '../../ServerConfig';

    var CustomersList=[];

    setCulture('he-IL');
    L10n.load(HebConf);

    Vue.use(GridPlugin);

export default Vue.extend({
        data: ()=>{

              return {
                        dataSource: new DataManager({
                          json: [],
                          adaptor: new RemoteSaveAdaptor,
                          insertUrl: ServerConfig.HaktzaatBdikotAPI + 'InsertUser',
                          updateUrl: ServerConfig.HaktzaatBdikotAPI + 'UpdateUser',
                          removeUrl: ServerConfig.HaktzaatBdikotAPI + 'DeleteUser',
                        }), 
                        Customers:[],
                        isLoades:false,
                        filterOptions: {
                          type: 'CheckBox'
                        },
                        toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'ExcelExport'],
                        editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, showDeleteConfirmDialog: true },
                      };
        },
      provide: {
        grid: [Sort,Filter,Edit, Toolbar,ExcelExport,Resize,ForeignKey]       
      },
      methods:{
            toolbarClick: function(args) {
              if (args.item.id === 'mainGrid_excelexport') {
                  this.$refs.MainGrid.excelExport();
                  var x=this.$refs.MainGrid; //Usless, but somehow mak it work 
              }
            },
            async GridCreated() { 
              var gridOj =this.$refs.MainGrid;  
              GetDataServices.GetDataForGrid(gridOj,'HaktzaatBdikotAPI');
            },
      },

      //Get forigin keys on component creation
      created: async function(){
          this.Customers=await GetDataServices.GetFkeyList('Customers');  
          this.isLoades=true;  //ok can render coponent
      },
      
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


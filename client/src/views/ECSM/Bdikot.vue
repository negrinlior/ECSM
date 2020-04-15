<template>
  <!-- FK: MisparKablan, ID ANAF, ID CUSTOMER, ID RASHUT-->
    <div v-if="isLoades" class="Bdikot">
      <ejs-grid id='mainGrid' ref='MainGrid' height=420  locale='he-IL' :allowFiltering='true' :allowSorting='true' :filterSettings='filterOptions'  :created='GridCreated' :dataSource="dataSource" :toolbar='toolbar'  :editSettings='editSettings' :toolbarClick='toolbarClick'  :allowExcelExport='true' :allowResizing='true' :allowPaging="true" :pageSettings='pageSettings'> 
        <e-columns>
          <e-column field='ID'  headerText='ID' textAlign='Right' width=90 :allowEditing ='false' :isPrimaryKey='true' :isIdentity='true'></e-column>
          <e-column field='Kablan' headerText='קבלן' textAlign='Right' width=250 foreignKeyField='MisparKablan' foreignKeyValue='Name' :dataSource='Kablanim'></e-column>
          <e-column field='Rishayon' headerText='רישיון בתוקף' textAlign='Right' width=80 foreignKeyField='ID' foreignKeyValue='Disp' :dataSource='YesNoList'></e-column>
          <e-column field='KablanSecondary' headerText='קבלן משנה' textAlign='Right' width=150></e-column>
          <e-column field='RishayonSecondary' headerText='רישיון בתוקף' textAlign='Right' width=80 foreignKeyField='ID' foreignKeyValue='Disp' :dataSource='YesNoList'></e-column>
          <e-column field='Rashut' headerText='רשות' textAlign='Right' width=200 foreignKeyField='ID' foreignKeyValue='RNm' :dataSource='RashuiotLst'></e-column>
          <e-column field='Anaf' headerText='ענף' textAlign='Right' width=100 foreignKeyField='ID' foreignKeyValue='anafnm' :dataSource='Anafim'></e-column>
          <e-column field='Mechraz' headerText='מכרז' textAlign='Right' width=120></e-column>
          <e-column field='DateRangeText' headerText='טווח תאריכים' textAlign='Right' width=220></e-column>
          <e-column field='StageCode' headerText='סטטוס בדיקה' textAlign='Right' width=150 foreignKeyField='Code' foreignKeyValue='StageName' :dataSource='StagesList' :allowEditing ='false'></e-column>
          <e-column field='BdikatAvID' headerText='ID בדיקת אב' textAlign='Right' width=130 type='number'></e-column>
          <e-column field='SugBdikaMeuchedet' headerText='סוג בדיקה מיוחדת' textAlign='Right' width=200 foreignKeyField='ID' foreignKeyValue='Disp' :dataSource='SugBdikaMeiuhedetList'></e-column>
          <e-column field='CustomerID' headerText='לקוח' textAlign='Right' width=200 foreignKeyField='ID' foreignKeyValue='CustomerName' :dataSource='Customers'></e-column>
          <e-column field='DateCreation' headerText='תאריך יצירה' textAlign='Right' width=150 :allowEditing ='false' :format='formatOptions' type='date' ></e-column>
          <e-column field='SrcFile' headerText='קובץ מקור' textAlign='Right' width=220 :allowEditing ='false'></e-column>
        </e-columns>
      </ejs-grid>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { L10n, setCulture } from '@syncfusion/ej2-base';
    import { GridPlugin, Filter, Sort, Edit, Toolbar, ExcelExport, Resize, ForeignKey, created,Page } from '@syncfusion/ej2-vue-grids';
    import { DataManager, WebApiAdaptor,RemoteSaveAdaptor } from "@syncfusion/ej2-data";
    import GetDataServices from '../../services/GetDataServices';
    import HebConf from './GridHebConfig.js';
    import ServerConfig from '../../ServerConfig';

    setCulture('he-IL');
    L10n.load(HebConf);

    Vue.use(GridPlugin);

export default Vue.extend({
        data: ()=>{

              return {
                        dataSource: new DataManager({
                          json: [],
                          adaptor: new RemoteSaveAdaptor,
                          insertUrl: ServerConfig.BdikotAPI + 'InsertBdikot',
                          updateUrl: ServerConfig.BdikotAPI + 'UpdateBdikot',
                          removeUrl: ServerConfig.BdikotAPI + 'DeleteBdikot',
                        }), 
                        formatOptions: {type:'date', format:'dd/MM/yyyy'},
                        Kablanim:[],
                        YesNoList:[{ID:'כן',Disp:'כן'},{ID:'לא',Disp:'לא'}],
                        SugBdikaMeiuhedetList:[{ID:'מורחבת',Disp:'מורחבת'},{ID:' ',Disp:''}],
                        RashuiotLst:[],
                        Customers:[],
                        Anafim:[],
                        StagesList:[],
                        isLoades:false,
                        filterOptions: {
                          type: 'Excel'
                        },
                        // toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'ExcelExport'],
                        toolbar: ['Edit', 'Delete', 'Update', 'Cancel', 'ExcelExport'],
                        editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, showDeleteConfirmDialog: true },
                        
                         pageSettings: { pageSizes: [25,50,100], pageSize:50  }
                      };
        },
      provide: {
        grid: [Sort,Filter,Edit, Toolbar,ExcelExport,Resize,ForeignKey,Page]       
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
              GetDataServices.GetDataForGrid(gridOj,'BdikotAPI');
            },
      },

      //Get forigin keys on component creation
      created: async function(){
          this.Kablanim=await GetDataServices.GetFkeyList('Kablanim');  
          this.RashuiotLst=await GetDataServices.GetFkeyList('Rashuiot');  
          this.Anafim=await GetDataServices.GetFkeyList('Anafim');  
          this.Customers=await GetDataServices.GetFkeyList('Customers');  
          this.StagesList=await GetDataServices.GetFkeyList('StageList');  
          
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


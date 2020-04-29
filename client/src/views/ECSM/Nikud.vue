<template>
  <!-- FK: MisparKablan, ID ANAF, ID CUSTOMER, ID RASHUT-->
    <div v-if="isLoades" class="Nikud">
      <ejs-grid id='mainGrid' ref='MainGrid' height=420  locale='he-IL' :allowFiltering='true' :allowSorting='true' :filterSettings='filterOptions'  :created='GridCreated' :dataSource="dataSource" :toolbar='toolbar'  :editSettings='editSettings' :toolbarClick='toolbarClick'  :allowExcelExport='true' :allowResizing='true' :allowPaging="true" :pageSettings='pageSettings'> 
        <e-columns>
          <e-column field='ID'  headerText='ID' textAlign='Right' width=90 :allowEditing ='false' :isPrimaryKey='true' :isIdentity='true'></e-column>
          <e-column field='ObjectType' headerText='סוג אובייקט לניקוד' textAlign='Right' width=250 foreignKeyField='MisparKablan' foreignKeyValue='Name' :dataSource='Kablanim'></e-column>
          <e-column field='ObjectCode' headerText='אובייקט לניקוד' textAlign='Right' width=80 foreignKeyField='ID' foreignKeyValue='Disp' :dataSource='YesNoList'></e-column>
          <e-column field='DateStart' headerText='מתאריך' textAlign='Right' width=150></e-column>
          <e-column field='DateEnd' headerText='עד תאריך' textAlign='Right' width=150></e-column>
          <e-column field='NikudType' headerText='אובייקט לניקוד' textAlign='Right' width=150></e-column>
          <e-column field='NikudValue' headerText='ניקוד' textAlign='Right' width=150></e-column>
          <e-column field='Machpil' headerText='מכפיל' textAlign='Right' width=150></e-column>
          <e-column field='MathAction' headerText='פעולה חשבונית' textAlign='Right' width=150></e-column>
         
        </e-columns>
      </ejs-grid>

      <input type="file" ref="NikudFileUploadPTH" style="display: none" v-on:change="UploadNikudFile()">
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { L10n, setCulture } from '@syncfusion/ej2-base';
    import { GridPlugin, Filter, Sort, Edit, Toolbar, ExcelExport, Resize, ForeignKey, created,Page } from '@syncfusion/ej2-vue-grids';
    import { DataManager, WebApiAdaptor,RemoteSaveAdaptor } from "@syncfusion/ej2-data";
    import GetDataServices from '../../services/GetDataServices';
    import FileUploadServices from '../../services/FileServices';
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
                          insertUrl: ServerConfig.NikudAPI + 'InsertNikud',
                          updateUrl: ServerConfig.NikudAPI + 'UpdateNikud',
                          removeUrl: ServerConfig.NikudAPI + 'DeleteNikud',
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
                        toolbar: ['Add','Edit', 'Delete', 'Update', 'Cancel', 'ExcelExport',
                                 {text: 'נקה הכל', tooltipText: 'נקה הכל', prefixIcon: 'e-icons e-unfilter', id: 'ClearAllFilters' , align:'Right'}
                                 ],
                        editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, showDeleteConfirmDialog: true },
                        
                         pageSettings: { pageSizes: [25,50,100], pageSize:50  }
                      };
        },
      provide: {
        grid: [Sort,Filter,Edit, Toolbar,ExcelExport,Resize,ForeignKey,Page]       
      },
      methods:{
            toolbarClick: async function(args) {
              if (args.item.id === 'mainGrid_excelexport') {
                  this.$refs.MainGrid.excelExport();
                  var x=this.$refs.MainGrid; //Usless, but somehow mak it work 
              }
              if (args.item.id === "ClearAllFilters"){
                  this.$refs.MainGrid.clearFiltering();
              }
            },
            async GridCreated() { 
              var gridOj =this.$refs.MainGrid;  
              GetDataServices.GetDataForGrid(gridOj,'NikudAPI');
            },
      },

      //Get forigin keys on component creation
      created: async function(){
          this.Kablanim=await GetDataServices.GetFkeyList('Kablanim');  
          
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
    @import "../../../node_modules/@syncfusion/ej2-vue-grids/styles/material.css"; 
    .e-unfilter:before{
        content:'\ea82';
    }
   .e-upload:before{
       content: '\e60f';
    }
</style>


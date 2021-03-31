<template>
    <div v-if="isLoades" class="NihulShlavimToClient">
      <ejs-grid id='mainGrid' ref='MainGrid' height=380  locale='he-IL' :allowFiltering='true' :allowSorting='true' :filterSettings='filterOptions'  :created='GridCreated' :dataSource="dataSource" :toolbar='toolbar'  :editSettings='editSettings' :toolbarClick='toolbarClick'  :allowExcelExport='true' :allowResizing='true' :allowPaging="true" :pageSettings='pageSettings'> 
        <e-columns>
          <e-column field='ID'  headerText='ID' textAlign='Right' width=1 :allowEditing ='false' :isPrimaryKey='true' :isIdentity='true'></e-column>
          <e-column field='IDClient' headerText='לקוח' textAlign='Right' width=200 foreignKeyField='ID' foreignKeyValue='CustomerName' :dataSource='Customers' :allowEditing ='false'></e-column>
          <e-column field='StageCode' headerText='שלב בדיקה' textAlign='Right' width=100 foreignKeyField='Code' foreignKeyValue='StageName' :dataSource='StagesList' :allowEditing ='false'></e-column>
          <e-column field='DaysForKablanToReturnAnswer' headerText='ימים שיש לקבלן להחזיר תשובה' textAlign='Right' width=120 format='N'></e-column>
          <e-column field='DaysForHatrahLekablanLefniTarichYaad' headerText='ימי התראה לקבלן לפני תאריך היעד' textAlign='Right' width=120 format='N'></e-column>
          <e-column field='DaysForMalab' headerText='מספר הימים של מלב להוצאת תגובה' textAlign='Right' width=120 format='N'></e-column>
          <e-column field='MailCCList' headerText='מכותבים קבועים למייל' textAlign='Right' width=150></e-column>
        </e-columns>
      </ejs-grid>

    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { L10n, setCulture } from '@syncfusion/ej2-base';
    import { GridPlugin,Page, Filter, Sort, Edit, Toolbar, ExcelExport, Resize, ForeignKey, created, GridComponent } from '@syncfusion/ej2-vue-grids';
    import { DataManager, WebApiAdaptor,RemoteSaveAdaptor } from "@syncfusion/ej2-data";
    import { DropDownList } from "@syncfusion/ej2-dropdowns";
    import { Query } from '@syncfusion/ej2-data';
    import { DatePicker } from '@syncfusion/ej2-calendars';
    import GetDataServices from '../../services/GetDataServices';
    import FileUploadServices from '../../services/FileServices';
    import HebConf from './GridHebConfig.js';
    import ServerConfig from '../../ServerConfig';

    //setCulture('he-IL');
    L10n.load(HebConf);

    let ObjTElem, ObjElem, ObjTObj, ObjObj;

    Vue.use(GridPlugin);

export default Vue.extend({
        data: ()=>{

              return {
                        dataSource: new DataManager({
                          json: [],
                          adaptor: new RemoteSaveAdaptor,
                          insertUrl: ServerConfig.NihulShlavimToClientAPI + 'Irrelevent',
                          updateUrl: ServerConfig.NihulShlavimToClientAPI + 'UpdateNihulShlavimToClient',
                          removeUrl: ServerConfig.NihulShlavimToClientAPI + 'Irrelevent2',
                        }), 
                        formatOptions: {type:'date', format:'dd/MM/yyyy'},
                        StagesList:[],
                        Customers:[],
                        isLoades:false,
                        filterOptions: {
                          type: 'Excel'
                        },
                        toolbar: ['Add','Edit', 'Delete', 'Update', 'Cancel', 'ExcelExport',
                                 {text: 'נקה הכל', tooltipText: 'נקה הכל', prefixIcon: 'e-icons e-unfilter', id: 'ClearAllFilters' , align:'Right'}
                                 ],
                        editSettings: { allowEditing: true, allowAdding: false, allowDeleting: false, showDeleteConfirmDialog: true },
                        pageSettings: { pageSizes: [25,50,100], pageSize:50  },
                        dpParams: { params: { } },

                      };
        },
      provide: {
        grid: [Sort,Filter,Edit, Toolbar,ExcelExport,Resize,ForeignKey,Page]       
      },
      methods:{
            toolbarClick: async function(args) {
              if (args.item.id === 'mainGrid_excelexport') {
                 (this.$refs.MainGrid as GridComponent).excelExport();
                  var x=(this.$refs.MainGrid as GridComponent); //Usless, but somehow mak it work 
              }
              if (args.item.id === "ClearAllFilters"){
                  (this.$refs.MainGrid as GridComponent).clearFiltering();
              }
            },
            async GridCreated() { 
              var gridOj =(this.$refs.MainGrid as GridComponent);  
              GetDataServices.GetDataForGrid(gridOj,'NihulShlavimToClientAPI');
            },
      },
         //Get forigin keys on component creation
      created: async function(){
          this.StagesList=await GetDataServices.GetFkeyList('StageList');  
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
    .e-unfilter:before{
        content:'\ea82';
    }
   .e-upload:before{
       content: '\e60f';
    }
</style>


<template>
    <div v-if="isLoades" class="TarichiBdika">
      <ejs-grid id='mainGrid' ref='MainGrid' height=480  locale='he-IL' :allowFiltering='true' :allowSorting='true' :filterSettings='filterOptions'  :created='GridCreated' :dataSource="dataSource" :toolbar='toolbar'  :editSettings='editSettings' :toolbarClick='toolbarClick'  :allowExcelExport='true' :allowResizing='true' :allowPaging="true" :pageSettings='pageSettings'> 
        <e-columns>
          <e-column field='ID'  headerText='ID' textAlign='Right' width=90 :allowEditing ='false' :isPrimaryKey='true' :isIdentity='true'></e-column>
          <e-column field='BdikotID' headerText='מספר בדיקה' textAlign='Right' width=120 :allowEditing ='false'></e-column>
          <!-- שלב בדיקה -->
          <e-column field='StageStatus' headerText='סטטוס בדיקה' textAlign='Right' width=150 :allowEditing ='false'></e-column>
          <e-column field='StageYaadDateAuto' headerText='תאריך יעד אוטומטי' textAlign='Right' width=150  :format='formatOptions' type='date' editType= 'datepickeredit' :edit='dpParams' :allowEditing ='false'></e-column>
          <e-column field='StageYaadDateManual' headerText='תאריך יעד ידני' textAlign='Right' width=150  :format='formatOptions' type='date' editType= 'datepickeredit' :edit='dpParams'></e-column>
          <e-column field='DateYaadSpecial' headerText='תאריך יעד לפי לקוח' textAlign='Right' width=150  :format='formatOptions' type='date' editType= 'datepickeredit' :edit='dpParams'></e-column>
          <e-column field='DateOfPaperWork' headerText='תאריך קבלת מסמכים' textAlign='Right' width=150  :format='formatOptions' type='date' editType= 'datepickeredit' :edit='dpParams'></e-column>
          <e-column field='DateOfHfakatDoch' headerText='תאריך הפקת דוח' textAlign='Right' width=150  :format='formatOptions' type='date' editType= 'datepickeredit' :edit='dpParams'></e-column>

        </e-columns>
      </ejs-grid>

      <input type="file" ref="NikudFileUploadPTH" style="display: none" v-on:change="UploadNikudFile()">
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { L10n, setCulture } from '@syncfusion/ej2-base';
    import { GridPlugin,Page, Filter, Sort, Edit, Toolbar, ExcelExport, Resize, ForeignKey, created } from '@syncfusion/ej2-vue-grids';
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
                          insertUrl: ServerConfig.NikudAPI + 'InsertNikud',
                          updateUrl: ServerConfig.NikudAPI + 'UpdateNikud',
                          removeUrl: ServerConfig.NikudAPI + 'DeleteNikud',
                        }), 
                        formatOptions: {type:'date', format:'dd/MM/yyyy'},
                        NikudObjectList:[],
                        NikudTypeList:[],
                        MathActionList:[],
                        isLoades:false,
                        filterOptions: {
                          type: 'Excel'
                        },
                        toolbar: ['Add','Edit', 'Delete', 'Update', 'Cancel', 'ExcelExport',
                                 {text: 'נקה הכל', tooltipText: 'נקה הכל', prefixIcon: 'e-icons e-unfilter', id: 'ClearAllFilters' , align:'Right'}
                                 ],
                        editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, showDeleteConfirmDialog: true },
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
                  this.$refs.MainGrid.excelExport();
                  var x=this.$refs.MainGrid; //Usless, but somehow mak it work 
              }
              if (args.item.id === "ClearAllFilters"){
                  this.$refs.MainGrid.clearFiltering();
              }
            },
            async GridCreated() { 
              var gridOj =this.$refs.MainGrid;  
              GetDataServices.GetDataForGrid(gridOj,'TarichiBdikaAPI');
            },
      },
         //Get forigin keys on component creation
      created: async function(){
          this.NikudObjectList=await GetDataServices.GetFkeyList('NikudObjectList');  
          this.NikudTypeList=await GetDataServices.GetFkeyList('NikudType');  
          this.MathActionList=await GetDataServices.GetFkeyList('MathActions');  

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


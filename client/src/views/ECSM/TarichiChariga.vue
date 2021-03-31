<template>
  <div v-if="isLoades" class="TarichiChariga">
   <ejs-grid id='mainGrid' ref='MainGrid' height=380 locale='he-IL' :allowFiltering='true' :allowSorting='true' :filterSettings='filterOptions' :created='GridCreated' :dataSource="dataSource" :toolbar='toolbar' :editSettings='editSettings' :toolbarClick='toolbarClick' :allowExcelExport='true' :allowResizing='true' :allowPaging="true" :pageSettings='pageSettings'> 
    <e-columns>

        <e-column field='ID' headerText='ID' textAlign='Right' width=90 :allowEditing ='false' :isPrimaryKey='true' :isIdentity='true'></e-column>
        <e-column field='BdikaID' headerText=' מספר בדיקה' textAlign='Right' width=120 :allowEditing ='false'></e-column>
        <e-column field='DateOfHariga' headerText=' תאריך חריגה' textAlign='Right'  width=180 :format='formatOptions' type='date' editType= 'datepickeredit' :edit='dpParams'></e-column>
        <e-column field='Shimua1' headerText=' תאריך שימוע 1' textAlign='Right'  width=180 :format='formatOptions' type='date' editType= 'datepickeredit' :edit='dpParams'></e-column>
        <e-column field='YaadShimua1' headerText=' יעד שימוע 1' textAlign='Right'  width=180 :format='formatOptions' type='date' editType= 'datepickeredit' :edit='dpParams'></e-column>
        <e-column field='Shimua2' headerText=' תאריך שימוע 2' textAlign='Right'  width=180 :format='formatOptions' type='date' editType= 'datepickeredit' :edit='dpParams'></e-column>
        <e-column field='YaadShimua2' headerText=' יעד שימוע 2' textAlign='Right'  width=180 :format='formatOptions' type='date' editType= 'datepickeredit' :edit='dpParams'></e-column>
        <e-column field='HatraaEmail' headerText=' תאריך מייל התראה' textAlign='Right'  width=180 :format='formatOptions' type='date' editType= 'datepickeredit' :edit='dpParams'></e-column>
        <e-column field='YaadHatraaEmail' headerText=' תאריך יעד מייל התראה' textAlign='Right'  width=180 :format='formatOptions' type='date' editType= 'datepickeredit' :edit='dpParams'></e-column>
        <e-column field='HatraaLetter' headerText=' תאריך מכתב התראה' textAlign='Right'  width=180 :format='formatOptions' type='date' editType= 'datepickeredit' :edit='dpParams'></e-column>
        <e-column field='YaadHatrraLetter' headerText=' תאריך יעד מכתב התראה' textAlign='Right'  width=180 :format='formatOptions' type='date' editType= 'datepickeredit' :edit='dpParams'></e-column>
        <e-column field='IdkunRashut' headerText=' תאריך עדכון רשות' textAlign='Right'  width=180 :format='formatOptions' type='date' editType= 'datepickeredit' :edit='dpParams'></e-column>
        <e-column field='TizkuretIdkunRashut' headerText=' תאריך תזכור רשות' textAlign='Right'  width=180 :format='formatOptions' type='date' editType= 'datepickeredit' :edit='dpParams'></e-column>
        <e-column field='MeetingRashut' headerText=' תאריך פגישה עם הרשות' textAlign='Right'  width=180 :format='formatOptions' type='date' editType= 'datepickeredit' :edit='dpParams'></e-column>
        <e-column field='ShimuaRashut' headerText=' תאריך שימוע רשות' textAlign='Right'  width=180 :format='formatOptions' type='date' editType= 'datepickeredit' :edit='dpParams'></e-column>
        <e-column field='YaadShimuaRashut' headerText=' תאריך יעד שימוע רשות' textAlign='Right'  width=180 :format='formatOptions' type='date' editType= 'datepickeredit' :edit='dpParams'></e-column>
        <e-column field='Heara' headerText=' הערה' textAlign='Right'  width=180></e-column>
        <e-column field='SchumIkavon' headerText=' סכום עיקבון' textAlign='Right' width=180 format='N2'></e-column>
        <e-column field='SchumIkavonHaktana' headerText=' סכום עיקבון הקטנה' textAlign='Right' width=180 format='N2'></e-column>
        <e-column field='SchumArvut' headerText=' סכום ערבות' textAlign='Right' width=180 format='N2'></e-column>
        <e-column field='TokefArvot' headerText=' תוקף ערבות' textAlign='Right'  width=180 :format='formatOptions' type='date' editType= 'datepickeredit' :edit='dpParams'></e-column>
        <e-column field='HatzaraRochbit' headerText='הצהרה רוחבית' textAlign='Right'  width=180 foreignKeyField='ID' foreignKeyValue='Disp' :dataSource='HatzharaRochbitList'></e-column>
    </e-columns>
   </ejs-grid>

   <input type="file" ref="TarichiHarigaFileUploadPTH" style="display: none" v-on:change="UploadTarichFile()">

  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { L10n, setCulture } from '@syncfusion/ej2-base';
  import { GridPlugin,Page, Filter, Sort, Edit, Toolbar, ExcelExport, Resize, ForeignKey, created , GridComponent} from '@syncfusion/ej2-vue-grids';
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
             insertUrl: ServerConfig.TarichiCharigaAPI + 'Irrelevent',
             updateUrl: ServerConfig.TarichiCharigaAPI + 'UpdateTarichiChariga',
             removeUrl: ServerConfig.TarichiCharigaAPI + 'Irrelevent2',
            }), 
            formatOptions: {type:'date', format:'dd/MM/yyyy'},
            HatzharaRochbitList:[{ID:'כן',Disp:'כן'},{ID:'לא',Disp:'לא'},{ID:'לא רלוונטי',Disp:'לא רלוונטי'},{ID:' ',Disp:''}],
            isLoades:false,
            filterOptions: {
             type: 'Excel'
            },
            toolbar: ['Add','Edit', 'Delete', 'Update', 'Cancel', 'ExcelExport',
                 {text: 'טעינת תאריכי חריגה', tooltipText: 'טעינת תאריכי חריגה', prefixIcon: 'e-icons e-upload', id: 'UpldFile' , align:'Right'},
                 {text: 'נקה הכל', tooltipText: 'נקה הכל', prefixIcon: 'e-icons e-unfilter', id: 'ClearAllFilters' , align:'Right'}
                 ],
            editSettings: { allowEditing: true, allowAdding: false, allowDeleting: false, showDeleteConfirmDialog: true },
            pageSettings: { pageSizes: [25,50,100], pageSize:50 },
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
         var x=this.$refs.MainGrid; //Usless, but somehow mak it work 
       }
       if (args.item.id === "ClearAllFilters"){
        (this.$refs.MainGrid as GridComponent).clearFiltering();
       }
       if (args.item.id === "UpldFile"){
          (<any> this.$refs.TarichiHarigaFileUploadPTH).click(); //Open file dialog
        }
      },
      async GridCreated() { 
       var gridOj =this.$refs.MainGrid; 
       GetDataServices.GetDataForGrid(gridOj,'TarichiCharigaAPI');
      },
      async UploadTarichFile() { 
        var x=await FileUploadServices.UploadTarichiHariga((<any> this.$refs.TarichiHarigaFileUploadPTH).files[0]);
        this.GridCreated();
      },
   },
     //Get forigin keys on component creation
   created: async function(){
     this.isLoades=true; //ok can render coponent
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


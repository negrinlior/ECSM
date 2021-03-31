<template>
    <div v-if="isLoades" class="Nikud">
      <ejs-grid id='mainGrid' ref='MainGrid' height=480  locale='he-IL' :allowFiltering='true' :allowSorting='true' :filterSettings='filterOptions'  :created='GridCreated' :dataSource="dataSource" :toolbar='toolbar'  :editSettings='editSettings' :toolbarClick='toolbarClick'  :allowExcelExport='true' :allowResizing='true' > 
        <e-columns>
          <e-column field='ID'  headerText='ID' textAlign='Right' width=90 :allowEditing ='false' :isPrimaryKey='true' :isIdentity='true'></e-column>
          <e-column field='NikudType' headerText='אובייקט לניקוד' textAlign='Right' width=150 foreignKeyField='Code' foreignKeyValue='Description' :dataSource='NikudTypeList'></e-column>
          <e-column field='ObjectType' headerText='סוג אובייקט לניקוד' textAlign='Right' width=185 foreignKeyField='Code' foreignKeyValue='Description' :dataSource='NikudObjectList' :editType='dropdownedit' :edit='ObjTypeParams'></e-column>
          <e-column field='ObjCodeDis' headerText='אובייקט' textAlign='Right' width=550 :editType='dropdownedit' :edit='ObjParams'></e-column>
          <e-column field='DateStart' headerText='מתאריך' textAlign='Right' width=150  :format='formatOptions' type='date' editType= 'datepickeredit' :edit='dpParams'></e-column>
          <e-column field='DateEnd' headerText='עד תאריך' textAlign='Right' width=150 :format='formatOptions' type='date' editType= 'datepickeredit' :edit='dpParams'></e-column>
          <e-column field='NikudValue' headerText='ניקוד' textAlign='Right' width=150></e-column>
          <e-column field='Machpil' headerText='מכפיל' textAlign='Right' width=150></e-column>
          <e-column field='MathAction' headerText='פעולה חשבונית' textAlign='Right' width=150 foreignKeyField='Code' foreignKeyValue='Description' :dataSource='MathActionList'></e-column>
        </e-columns>
      </ejs-grid>

      <input type="file" ref="NikudFileUploadPTH" style="display: none" v-on:change="UploadNikudFile()">
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
                        dpParams: { params: { } },

                        //---------------------
                        // עמודות תלויות
                         ObjTypeParams: {
                                    create: () => {
                                      ObjTElem = document.createElement('input');
                                      return ObjTElem;
                                    },
                                    read: () => {
                                      return ObjTObj.text;
                                    },
                                    destroy: () => {
                                      ObjTObj.destroy();
                                    },
                                    write: async() => {
                                      ObjTObj = new DropDownList({
                                        dataSource: await GetDataServices.GetFkeyList('NikudObjectList'),
                                        fields: { value: 'Code', text: 'Description' },
                                        change: () => {
                                          ObjObj.enabled = true;
                                          let tempQuery = new Query().where('ObjTypID', 'equal', ObjTObj.value);
                                          ObjObj.query = tempQuery;
                                          ObjObj.text = null;
                                          ObjObj.dataBind();
                                        },
                                        placeholder: 'בחר סוג אובייקט לניקוד',
                                        floatLabelType: 'Never'
                                      });
                                    ObjTObj.appendTo(ObjTElem);
                                    }
                                  },
                          ObjParams: {
                                    create: () => {
                                      ObjElem = document.createElement('input');
                                      return ObjElem;
                                    },
                                    read: () => {
                                      return ObjObj.text;
                                    },
                                    destroy: () => {
                                      ObjObj.destroy();
                                    },
                                    write: async() => {
                                        ObjObj = new DropDownList({
                                        dataSource: await GetDataServices.GetFkeyList('NikudSettingsObjectList'),
                                        fields: { value: 'ObjID', text: 'ObjName' },
                                        enabled: false,
                                        placeholder: 'בחר אובייקט',
                                        floatLabelType: 'Never'
                                      });
                                      ObjObj.appendTo(ObjElem);
                                    }
                                  },

                        //-------------------
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
            },
            async GridCreated() { 
              var gridOj =(this.$refs.MainGrid as GridComponent);  
              GetDataServices.GetDataForGrid(gridOj,'NikudAPI');
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


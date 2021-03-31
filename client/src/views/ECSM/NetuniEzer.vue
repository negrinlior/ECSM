<template>
    <div id='MainDiv' v-if="IsShowMain" >
      <ejs-grid id='MainGrid' ref='MainGrid' height=380  locale='he-IL' :allowFiltering='true' :allowSorting='true' :filterSettings='filterOptions'  :created='GridCreated' :dataSource="dataSource" :toolbar='toolbar'  :editSettings='editSettings' :toolbarClick='toolbarClick'  :allowResizing='true' :allowPaging="true" :pageSettings='pageSettings' :dataBound='dataBound'> </ejs-grid>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { L10n, setCulture } from '@syncfusion/ej2-base';
    import { GridPlugin, Filter, Sort, Edit, Toolbar, ExcelExport, Resize, ForeignKey, created,Page, GridComponent } from '@syncfusion/ej2-vue-grids';
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
                        }), 
                        formatOptions: {type:'date', format:'dd/MM/yyyy'},
                        IsShowMain:false,
                        filterOptions: {
                          type: 'Excel'
                        },
                        toolbar: [
                                 {text: 'לקוחות', tooltipText: 'לקוחות', id: 'Lakochot' , align:'Left'},
                                 {text: 'ענפים', tooltipText: 'ענפים', id: 'Anafim' , align:'Left'},
                                 {text: 'קבלנים', tooltipText: 'קבלנים', id: 'Kablanim' , align:'Left'},
                                 {text: 'רשויות', tooltipText: 'רשויות', id: 'Rashuiot' , align:'Left'},
                                 {text: 'מכרזים', tooltipText: 'מכרזים', id: 'Mechrazim' , align:'Left'},
                                 
                                 {text: 'טעינת נתונים', tooltipText: 'טעינת נתונים', prefixIcon: 'e-icons e-upload', id: 'LoadData' , align:'Right'},
                                 {text: 'נקה הכל', tooltipText: 'נקה הכל', prefixIcon: 'e-icons e-unfilter', id: 'ClearAllFilters' , align:'Right'}
                                 ],
                        editSettings: { },
                        
                         pageSettings: { pageSizes: [25,50,100], pageSize:50  }
                      };
        },
      provide: {
        grid: [Sort,Filter,Edit, Toolbar,ExcelExport,Resize,ForeignKey,Page]       
      },
      methods:{
            dataBound: function() {
              //Set auto width to columns
              (this.$refs.MainGrid as GridComponent).autoFitColumns();
            },
            toolbarClick: async function(args) {
              var gridOj = (this.$refs.MainGrid as GridComponent);
              if (args.item.id === "ClearAllFilters"){
                (this.$refs.MainGrid as GridComponent).clearFiltering();
              }
              if (args.item.id === "Anafim"){
                GetDataServices.RegenrateDataForGrid(gridOj,'NetuniEzerAPI/Anafim');
              }
              if (args.item.id === "Lakochot"){
                GetDataServices.RegenrateDataForGrid(gridOj,'NetuniEzerAPI/Lakochot');
              }
              if (args.item.id === "Kablanim"){
                GetDataServices.RegenrateDataForGrid(gridOj,'NetuniEzerAPI/Kablanim');
              }
              if (args.item.id === "Rashuiot"){
                GetDataServices.RegenrateDataForGrid(gridOj,'NetuniEzerAPI/Rashuiot');
              }
              if (args.item.id === "Mechrazim"){
                GetDataServices.RegenrateDataForGrid(gridOj,'NetuniEzerAPI/Mechrazim');
              }
              if (args.item.id === "LoadData"){
                var x=await GetDataServices.RunSPByGetAPI('NetuniEzerAPI/LoadMetaData');
                alert('בוצע');
                this.GridCreated();

              }
              
            },
            async GridCreated() { 
              var gridOj =this.$refs.MainGrid;  
              GetDataServices.GetDataForGrid(gridOj,'NetuniEzerAPI/Lakochot');

               
            },
      },

      created: async function(){
          this.IsShowMain=true;  //ok can render coponent
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


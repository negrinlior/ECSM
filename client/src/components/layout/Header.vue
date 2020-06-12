<template>
<div>
    <v-layout class="header" wrap style="height: 60px;">
        <v-btn
                    color="#33DDDD"
                    dark
                    icon
                    @click.stop="drawer = !drawer"
        >
        <v-icon>list</v-icon>
        </v-btn>
        
        <H1 class="ECSHEADER">ECS Managment</H1>
        <!-- <H1 class="ECSHEADER">בית - </H1> -->

        <v-spacer/>
        <v-btn
            color="#33DDDD"
            dark
            icon
            left
            @click.stop="LGNF = !LGNF"
        >
            <div v-if="GetUser==''"><v-icon>vpn_key</v-icon></div>
            <div v-else>{{GetUserFirstChar}}</div>
        </v-btn>

        <v-navigation-drawer
            v-model="drawer"
            absolute
            temporary
            >
        <v-list class="pa-1">
            <v-list-tile avatar>
            <v-list-tile-avatar>
                <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>

            <v-list-tile-content>
                <v-list-tile-title>{{GetUser}}</v-list-tile-title>
            </v-list-tile-content>
            </v-list-tile>
        </v-list>

        <v-list class="pt-0" dense>
            <v-divider></v-divider>

            <v-list-tile
                v-for="item in items"
                :key="item.title"
                :to="item.adrs"
            >
                <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>

                  
            </v-list-tile>
        </v-list>
        </v-navigation-drawer>
    </v-layout>
    <v-container fluid class="lgin" v-if="LGNF" >
        <v-card class="card--flex-toolbar" height="250">
            <LI/>
        </v-card>
    </v-container>

    
</div>
</template>


<script>
import LI from '../../views/Login';
import {mapGetters} from 'vuex';

export default {
    data () {
      return {
        drawer: null,
        LGNF: null,
        items: [
            { title: 'בית', icon: 'dashboard', adrs: '/' },
        //   { title: 'התחברות', icon: 'dashboard', adrs: '/login' },
            { title: 'משתמשים', icon: 'face', adrs: '/UsersGrid' },
            { title: 'הקצאת בדיקות', icon: 'how_to_reg', adrs: '/HaktzaatBdikot' },
            { title: 'ניהול בדיקות', icon: 'book', adrs: '/Bdikot' },
            { title: 'ניקוד', icon: 'pending_actions', adrs: '/Nikud' },
            { title: 'ניהול תאריכי בדיקות', icon: 'date_range', adrs: '/TarichiBdika' },
            { title: 'ניהול שלבי בדיקה ללקוח', icon: 'polymer', adrs: '/NihulShlavimToClient' },
            { title: 'אודות', icon: 'question_answer', adrs: '/about' }
        ]
      }
    },
    computed: mapGetters(['GetUserFirstChar','GetUser']),
    components:{
        LI
    }
    
}

</script>

<style scoped>
    .header {
        background: #333;
        color: #fff;
    }

    .lgin{
        float: right;
        width: 400px;
        margin: 10;
        }
    
    .ECSHEADER{
        padding-left: 15px;
        padding-top: 10px;
    }
    
</style>

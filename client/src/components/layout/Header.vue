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
        <v-btn
                    color="#33DDDD"
                    dark
                    icon
        >
        <div v-if="UserName==''"><v-icon>vpn_key</v-icon></div>
        <div v-else>{{GetUserFirstChar}}</div>
        </v-btn>
        <H1>ECS Managment</H1>
       
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
                <v-list-tile-title>User</v-list-tile-title>
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
</div>
</template>


<script>
import {mapState,mapGetters} from 'vuex'
export default {
    data () {
      return {
        drawer: null,
        items: [
          { title: 'בית', icon: 'dashboard', adrs: '/' },
          { title: 'התחברות', icon: 'dashboard', adrs: '/login' },
          { title: 'אודות', icon: 'question_answer', adrs: '/about' }
        ]
      }
    },
    computed: mapState({
        UserName: 'user'
    }),
    ...mapGetters(['GetUserFirstChar'])
}

</script>

<style scoped>
    .header {
        background: #333;
        color: #fff;
    }
    
</style>

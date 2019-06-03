<template>
<div>
    
    <v-layout wrap style="height: 80px;">
        <v-container>
            <v-layout>
                <v-btn
                    color="pink"
                    dark
                    @click.stop="drawer = !drawer"
                >
                תפריט
                </v-btn>
                <H1>ECSM</H1>
            </v-layout>       
        </v-container>

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
                @click=""
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
    }
}

</script>

<style scoped>
    .header {
        background: #333;
        color: #fff;
        text-align: center;
        padding: 10px;
    }

    .header a{
        color: #fff;
        padding-right: 5px;
    }
</style>

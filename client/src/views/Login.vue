<template>
    <div>
        <!-- LogIN -->
        <div id="LogInDiv" v-if="UserName==''">
            <H1 >התחברות</H1>
            <v-form>
                <v-flex xs12 sm6 md3>
                    <v-text-field
                        type="username"
                        v-model="username"
                        label="שם משתמש"
                        clearable
                    ></v-text-field>
                    <v-text-field
                        type="password"
                        v-model="password"
                        label="סיסמא"
                    ></v-text-field>
                </v-flex>
                <v-btn depressed small v-on:click="DoLogin()">התחבר</v-btn>
            
            </v-form>
        </div>
        
        <!-- LogOUT -->
        <div id="Loggout" v-else>
            <H1 style="color:#33DDDD">&nbsp;{{UserName}}</H1><BR/>
            <v-btn depressed small v-on:click="DoLogout()">התנתק</v-btn>
        </div>

        <!-- Notification -->
        <v-snackbar
            v-model="snackbarLoginSuccess"
            :color="snackbarColor"
            :timeout="snackbarTimeout"
            :top="true"
        >
            <B>{{ snackbarText }}</B>
        </v-snackbar>
    </div>
</template>

<script>
import LoginService from '../services/LoginService.js';
import {mapMutations,mapState} from 'vuex';

export default {
    data () {
      return {
        snackbarLoginSuccess: false,
        snackbarColor: '',
        snackbarTimeout: 1500,        
      }
    },
    computed: mapState({
        UserName: 'user'
    }),
    methods: {
        ...mapMutations(['SetUser','SetJWT']),

        async DoLogin(){
            var ANS=await LoginService.postUser(this.username,this.password);
            this.snackbarLoginSuccess=true;
            if (ANS.status==200){
                // notify user
                this.snackbarText='ההתחברות הצליחה' + ' ' + ANS.data.user;
                this.snackbarColor='#3bcc28';

                // update store with values
                this.SetUser(ANS.data.user);
                this.SetJWT(ANS.data.token);
            }
            else{
                this.snackbarText='ההתחברות נכשלה';
                this.snackbarColor='#ce4040';
            }
        },

        async DoLogout(){
            this.SetUser('');
            this.SetJWT('');
        }
    }
};

</script>

<style scoped>

</style>

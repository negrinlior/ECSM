<template>
    <div>
        <H1 align="center">התחברות</H1>
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
export default {
    data () {
      return {
        snackbarLoginSuccess: false,
        snackbarColor: '',
        snackbarTimeout: 1500,        
      }
    },
    methods: {
        async DoLogin(){
            var ANS=await LoginService.postUser(this.username,this.password);
            this.snackbarLoginSuccess=true;
            if (ANS.status==200){
                alert( JSON.stringify(ANS));
                this.snackbarText='ההתחברות הצליחה' + ' ' ;
                this.snackbarColor='#3bcc28';
            }
            else{
                this.snackbarText='ההתחברות נכשלה';
                this.snackbarColor='#ce4040';
            }
        }
    }
};

</script>

<style scoped>

</style>

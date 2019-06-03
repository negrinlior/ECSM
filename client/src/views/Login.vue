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
           
            <v-btn depressed small @click="Login">התחבר</v-btn>
        
        </v-form>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>

</style>

<template>
    <md-app>
        <md-app-toolbar class="md-primary">
            <Navbar @toggleNav='showNavigation = !showNavigation'/>
        </md-app-toolbar>
        <md-app-drawer md-permanent="clipped" :md-active.sync="showNavigation">
            <Drawer/>
        </md-app-drawer>
        <md-app-content>
            <div class="md-layout md-alignment-center-center" v-if="!success">
                <form novalidate>
                    <md-card class="md-layout-item">
                        <md-card-header>
                            <span class="md-display-2"><strong>Enter Token Number</strong></span>
                        </md-card-header>
                        <md-card-content class="md-layout md-alignment-space-around-center">
                            <md-field v-bind:class="{'md-invalid': error.tokenErr}" class="md-layout-item">
                                <label for="token">Token</label>
                                <md-input type="text" name="token" id="token" autocomplete="token" v-model="form.token"/>
                                <span class="md-error" >{{ error.tokenErrMsg }}</span>
                            </md-field>
                        </md-card-content>
                        <md-card-actions md-alignment="space-between">
                            <md-button  @click="submit" class="md-dense md-raised md-primary">Submit</md-button>
                        </md-card-actions>
                    </md-card>
                </form>
            </div>
             <md-card v-if="success">
                    <md-card-header>
                        <span class="md-headline">{{ data.title }}</span>
                    </md-card-header>
                    <md-card-content>
                        <span class="md-body-1">Status: {{ data.status }}</span>
                    </md-card-content>
                </md-card>
        </md-app-content>
    </md-app>
</template>

<script>
import axios from 'axios'
import Navbar from '@/components/dashboard/Navbar'
import Drawer from '@/components/dashboard/Drawer'
export default {
    name: 'StatusForm',
    components:{
        Navbar,
        Drawer
    },
    data:function(){
        return {
            form:{
                token:null
            },
            error:{
                tokenErr: false,
                tokenErrMsg: null
            },
            showNavigation: false,
            success: false,
            data: null
        }
    },
    methods:{
        submit:function(){
            this.tokenErr = null
            this.tokenErrMsg = null
            var self = this
            if(this.form.token === null){
                this.error.tokenErr = true;
                this.error.tokenErrMsg = "Enter valid token"
                console.log("null error");
            }
            else{
                axios.get('http://localhost:3000/grievance/token',{
                    params:{
                        token:this.form.token
                    },
                    headers: { 
                        Authorization: "Bearer " + this.$store.getters.bearerToken 
                    }
                })
                .then((res) => {
                    console.log(res);                
                    if(res.data.info === null || res.data.info === undefined){
                        self.error.tokenErr = true;
                        self.error.tokenErrMsg = "invalid token"
                        return
                    }
                    self.success = true
                    self.data = res.data.info
                })
                .catch((err) => {
                    console.log(err);            
                })
            }
        }
    }

}
</script>

<style lang="scss" scoped>
.md-app{
    height: inherit;
}
</style>

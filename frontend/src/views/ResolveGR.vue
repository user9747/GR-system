<template>
    <md-app>
        <md-app-toolbar class="md-primary">
            <Navbar @toggleNav = "showNavigation = !showNavigation"/>
        </md-app-toolbar>
        <md-app-drawer md-permanent="clipped" :md-active.sync="showNavigation">
            <Drawer />
        </md-app-drawer>
        <md-app-content>
            <div class="md-layout md-alignment-center-center">
            <md-card class="md-layout-item md-size-70">
                <md-card-header>
                    <div class="md-title">{{ data.title }}</div>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout md-gutter md-alignment-center-center">
                        <div class="md-layout-item md-size-70 md-small-size-100">
                            <p class="md-body-2">
                                {{ data.description }}
                            </p>
                        </div>
                        <div class="md-layout-item md-size-70 md-small-size-100">
                            Submitted by : {{ data.username }}
                        </div>
                        <div class="md-layout-item md-size-70 md-small-size-100">
                            <md-field>
                                <label for="remark">Remarks</label>
                                <md-input name="remark" id="remark" v-model="response.remark" />
                            </md-field>
                        </div>
                    </div>
                </md-card-content>
                <md-card-actions>
                    <md-button type = "submit" @click="resolve()">Resolve</md-button>
                </md-card-actions>
            </md-card>

        </div>

        </md-app-content>
  </md-app>
</template>

<script>
import axios from 'axios'
import Navbar from '@/components/dashboard/Navbar'
import Drawer from '@/components/dashboard/Drawer'
export default {
    name: "ResolveGR",
    components:{
        Navbar,
        Drawer
    },
    props:['id'],
    data:function(){
        return {
            data:null,
            response:{
                remark:null
            },
            showNavigation:false
        }
    },
    methods:{
        resolve(){
            console.log(this.response);
            if(this.response.remark === null)
                this.response.remark = 'No remarks'
            var data = {
                grievance_id: this.id,
                remark: this.response.remark
            }
            console.log(data);
            
            var self = this
            var config = {
                headers: { 
                    Authorization: "Bearer " + this.$store.getters.bearerToken 
                }
            }
            axios.post(process.env.VUE_APP_ROOT_API+'grievance/cell/resolve',data,config)
            .then((res) => {
                if(res.data.success){
                    alert('Successfully resolved grievance')
                    self.$router.push('/dashboard')
                }
                else{
                    console.log(res.data.error);
                    
                }
            })
            .catch((err) => {
                console.log(err.message);
                
            })
        }
    },
    mounted(){
        var self = this
        var config = {
            params: {
                grievance_id: this.id
            },
            headers: { 
                Authorization: "Bearer " + this.$store.getters.bearerToken 
            }
        }
        console.log(this.$props.id);
        console.log(config.params);
        
        axios.get(process.env.VUE_APP_ROOT_API+'grievance/cell/single',config)
        .then((res) => {
            console.log(res.data);  
            self.data = res.data.data          
        })
        .catch((err) => {
            console.log(err);
            
        })

    }
}
</script>

<style>

</style>

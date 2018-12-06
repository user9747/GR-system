<template>
    <md-app>
        <md-app-toolbar class="md-primary">
            <Navbar @toggleNav='showNavigation = !showNavigation'/>
        </md-app-toolbar>
        <md-app-drawer md-permanent="clipped" :md-active.sync="showNavigation">
            <Drawer/>
        </md-app-drawer>
        <md-app-content>
            <md-table v-model="data" md-card v-if="data.length != 0">
                <md-table-toolbar>
                    <md-table-toolbar>
                        <h1 class="md-title">Pending Grievances</h1>
                    </md-table-toolbar>
                </md-table-toolbar>
                    <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="Sl no" md-numeric>{{item.id}}</md-table-cell>
                    <md-table-cell md-label="Title">{{item.title}}</md-table-cell>
                    <md-table-cell md-label="Status">{{item.status}}</md-table-cell>
                    <md-table-cell md-label="Accept"><md-button class="md-raised md-primary" @click="accept(item.gr_id)">Accept</md-button></md-table-cell>                    
                </md-table-row>
            </md-table>
            <md-empty-state
                md-icon="access_time"
                md-label="No Pending Grievances"
                md-description="No pending grievances to be resolved"
                v-else>
            </md-empty-state>
        </md-app-content>
    </md-app>
</template>

<script>
import axios from 'axios'
import Navbar from '@/components/dashboard/Navbar'
import Drawer from '@/components/dashboard/Drawer'
export default {
    name:'PendingCell',
    components:{
        Navbar,
        Drawer
    },
    data:function(){
        return {
            showNavigation: false,
            data: null
        }
    },
    methods:{
        accept(grievance_id){
            console.log("inside accept of pending");
            
            console.log(grievance_id);
            var self = this
            var data = {
                username: this.$store.getters.userName,
                grievance_id: grievance_id
            }
            console.log(data);
            var config = {
                headers:{
                    Authorization: "Bearer " + this.$store.getters.bearerToken 
                }
            }
            axios.post(process.env.VUE_APP_ROOT_API+'grievance/cell/accept',data,config)
            .then((res) => {
                if(res.data.success){
                    console.log("Succesfully accepted")
                    self.$router.push("/accepted")
                }
                else{
                    console.log("err")
                    console.log(res.data);                    
                }
            })
            .catch((err) => {
                console.log("err");
                console.log(err);
                
            })
        }
    },
    mounted(){
        var self = this
        console.log(process.env.VUE_APP_ROOT_API)
        axios.get(process.env.VUE_APP_ROOT_API+'grievance/cell/pending/all',{
            headers: { 
                Authorization: "Bearer " + this.$store.getters.bearerToken 
            }                
        })
        .then((res) => {
            console.log(res.data);
            if(res.data.success){
                self.data = res.data.info
            }
            else{
                console.log("ERR "+res.data.error)
            }
        })
        .catch((err) => {
            console.log("ERR "+err);
            
        })
    }
}
</script>

<style>

.md-app{
    height: inherit;
}

 .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
    color: antiquewhite;
  }

  .md-content {
    padding: 16px;
  }

.md-table-cell{
    text-align: left;
}

</style>

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
                        <h1 class="md-title">Accepted Grievances</h1>
                    </md-table-toolbar>
                </md-table-toolbar>
                    <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="Sl no" md-numeric>{{item.id}}</md-table-cell>
                    <md-table-cell md-label="Title">{{item.title}}</md-table-cell>
                    <md-table-cell md-label="Status">{{item.status}}</md-table-cell>
                    <md-table-cell md-label="Accept"><md-button class="md-raised md-primary" @click="complete(item.gr_id)">Resolve</md-button></md-table-cell>                    
                </md-table-row>
            </md-table>
            <md-empty-state
                md-icon="access_time"
                md-label="No Accepted Grievances"
                md-description="You can accept grievances by clicking on Pending Grievance Tab in Dashboard"
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
    name:'AcceptedGR',
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
        complete(gr_id){
            console.log("demo");
            
            console.log(gr_id);
            this.$router.push({name:'resolve',params:{id: gr_id}})
            /* axios.post('http://localhost:3000/grievance/cell/accept',data,config)
            .then((res) => {
                if(res.data.success){
                    console.log("Succesfully accepted")
                }
                else{
                    console.log("err")
                    console.log(res.data);                    
                }
            })
            .catch((err) => {
                console.log("err");
                console.log(err);
                
            }) */
        }
    },
    mounted(){
        var self = this
        var config = {
            headers: { 
                Authorization: "Bearer " + this.$store.getters.bearerToken 
            },
            params:{
                username: this.$store.getters.userName
            }                
        }
        axios.get(process.env.VUE_APP_ROOT_API+'grievance/cell/accepted',config)
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
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
                <h1>poda bilale {{ id }}</h1>
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
            showNavigation:false
        }
    },
    methods:{

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
        console.log(config.params);
        
        axios.get('http://localhost:3000/grievance/cell/single',config)
        .then((res) => {
            console.log(res.data);            
        })
        .catch((err) => {
            console.log(err);
            
        })

    }
}
</script>

<style>

</style>

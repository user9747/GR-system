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
                    <div class="md-title">Create new Grievance</div>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout md-gutter md-alignment-center-center">
                        <div class="md-layout-item md-size-70 md-small-size-100">
                            <md-field>
                                <label for="title">Title</label>
                                <md-input name="title" id="title" v-model="form.title" />
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-70 md-small-size-100">
                            <md-field>
                                <label for="description">Description</label>
                                <md-input name="description" id="description" v-model="form.description" />
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-70 md-small-size-100">
                            <md-field>
                                <label for="remark">Remarks</label>
                                <md-input name="remark" id="remark" v-model="form.remark" />
                            </md-field>
                        </div>
                    </div>
                </md-card-content>
                        <md-card-actions>
                            <md-button type="submit" class="md-raised md-primary" @click="save">Save</md-button>
                            <md-button type="submit" class="md-raised md-accent" @click="submit">Submit</md-button>
                        </md-card-actions>

            </md-card>

        </div>

        </md-app-content>
        
    </md-app>
</template>

<script>
import Navbar from '@/components/dashboard/Navbar'
import Drawer from'@/components/dashboard/Drawer'
import axios from 'axios'
export default {
    name: 'NewGrievance',
    components: {
        Navbar,
        Drawer
    },
    data(){
        return{
            form:{
                title: null,
                description: null,
                remark: null
            },
            showNavigation: false
        }
    },
    methods:{
        submit(){
            var self=this;
            var data=self.form
            data.user_name=this.$store.getters.userName;
            var config={
              headers: { Authorization: "Bearer " + this.$store.getters.bearerToken }
            }
            console.log(config)
            axios.post('http://localhost:3000/grievance/submit',data,config)
            .then((res)=>{
                console.log("Submitted "+res);
                self.$router.push('submitted')
            })
            .catch((err)=>{
                console.log(err);
            })            
        },
        save(){
            console.log("save");
            var self=this;
            if(this.form.remark === null){
                this.form.remark = "No remarks"
            }
            var data=self.form
            data.user_name=this.$store.getters.userName;
            var config={
              headers: { Authorization: "Bearer " + this.$store.getters.bearerToken }
            }
            console.log(config)
            axios.post('http://localhost:3000/grievance/save',data,config)
            .then((res)=>{
                console.log("saved ");
                console.log(res);
                
                self.$router.push('submitted')
            })
            .catch((err)=>{
                console.log(err);
            })
            
        }
    },
    mounted(){
        console.log("Retrieving saved grievance");
        var self = this;
        axios.get('http://localhost:3000/grievance/saved',{
            params: {
                user_name:this.$store.getters.userName
            },
            headers: { 
                Authorization: "Bearer " + this.$store.getters.bearerToken 
            }                
        })
        .then((res) => {
            console.log(res);
            
            if(res.data.success){
                self.form.title = res.data.info.title
                self.form.description = res.data.info.description
                self.form.remark = res.data.info.remark
            }
            else{
                console.log("ERR "+res.data.error)
            }
        })
        .catch((err) => {
            console.log("ERR "+ err);            
        })
        
    }
}
</script>

<style lang="scss" scoped>
.md-app{
    height: inherit;
  }

   // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
    color: antiquewhite;
  }

  .md-content {
    padding: 16px;
  }

  .md-layout{
    padding-top: 20px;
  }
</style>

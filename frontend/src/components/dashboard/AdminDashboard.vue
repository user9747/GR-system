<template>
    <div>
        <div class="md-layout md-alignment-center-center">
            <md-card class="md-layout-item md-size-70">
                <md-card-header>
                    <div class="md-title">Change Password</div>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout md-gutter md-alignment-center-center">
                        <div class="md-layout-item md-size-70 md-small-size-100">
                            <md-field>
                                <label for="username">Username</label>
                                <md-input name="username" id="username" v-model="form.username" />
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-70 md-small-size-100">
                            <md-field>
                                <label for="name">Password</label>
                                <md-input type="password" name="name" id="name" v-model="form.password" />
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-70 md-small-size-100">
                            <md-field>
                                <label for="type">Type</label>
                                <md-select v-model="form.type" name="type" id="type">
                                    <md-option value="user">User</md-option>
                                    <md-option value="cell">Cell Member</md-option>
                                </md-select>
                            </md-field>
                        </div>

                    </div>
                </md-card-content>
                <md-card-actions>
                    <md-button type="submit" class="md-raised md-primary" @click="submit">Change Password</md-button>
                </md-card-actions> 

            </md-card>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'AdminDashboard',
    data: function(){
        return {
            form:{
                username:"",
                password:"",
                type:""
            }
        }
    },
    methods:{
        submit: function(){
            console.log("changing.....")
            var self = this
            var data = {
                username: this.form.username,
                password: this.form.password,
                type: this.form.type
            }
            var config={
                headers: { Authorization: "Bearer " + this.$store.getters.bearerToken }
            }
            axios.post(process.env.VUE_APP_ROOT_API+'admin/changepwd',data,config)
                .then((res)=>{
                    console.log(res.data)
                    alert("Password Changed Successfully")
                    self.$router.push('/')
                })
                .catch((err)=>{
                    alert("Error encountered : "+err)
                    console.log(err);
                })  
            },
        route:function(r){
            console.log("routing....");
            this.$router.push('/'+r);
        },
        logout:function(){
        console.log("logging out...");
        this.$store.dispatch('logout')
        this.$router.push('/')
        },
    }
}


</script>

<style lang="scss" scoped>
.md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
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
    padding-top: 16px;
  }
</style>

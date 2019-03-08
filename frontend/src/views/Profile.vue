<template>
  <md-app >
      sfafaefae
    <md-app-toolbar class="md-primary" >
      <Navbar @toggleNav = "showNavigation = !showNavigation" />
    </md-app-toolbar>
    <md-app-drawer md-permanent="clipped" :md-active.sync="showNavigation">
      <Drawer />
    </md-app-drawer>
    <md-app-content>
            <div class="md-layout md-alignment-center-center">
            <md-card class="md-layout-item md-size-70">
                <md-card-header>
                    <div class="md-title">Profile</div>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout md-gutter md-alignment-center-center">
                        <div class="md-layout-item md-size-70 md-small-size-100">
                            <md-field>
                                <md-input disabled="true" name="username" id="username" v-model="form.username" />
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-70 md-small-size-100">
                            <md-field>
                                <label for="name">Name</label>
                                <md-input  name="name" id="name" v-model="form.name" />
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-70 md-small-size-100">
                            <md-field>
                                <label for="email">Email</label>
                                <md-input name="email" id="email" v-model="form.email" />
                            </md-field>
                        </div>
                         <div class="md-layout-item md-size-70 md-small-size-100">
                            <md-field>
                                <label for="phone">Phone</label>
                                <md-input name="phone" id="phone" v-model="form.phone" />
                            </md-field>
                        </div>

                    </div>


  <!--  Modal -->

                    <div>
                     <md-card class="md-layout-item md-size-70">
                         
                        <md-dialog :md-active.sync="showDialog">
                        <md-dialog-title>Change Password</md-dialog-title>
                        
                        <div style="padding:1.5vh">
                            <md-field>  
                                <label for="oldpassword">Old Password</label>
                                <md-input name="oldpassword" id="oldpassword" v-model="form.oldpassword" />   
                            </md-field>
                        
                            <md-field>  
                                <label for="newpassword">New Password</label>
                                <md-input name="newpassword" id="newpassword" v-model="form.newpassword" />   
                            </md-field>
                         </div>
                        <md-dialog-actions>
                            <md-button class="md-primary" @click="showDialog = false">Close</md-button>
                            <md-button ref="uploadBtn" class="md-primary" @click="changePassword">Confirm</md-button>
                        </md-dialog-actions>
                        </md-dialog>  
                         
                     </md-card>
                    </div>
   <!--  Modal Ends -->

             </md-card-content>
                        <md-card-actions>
                            <md-button type="submit" class="md-raised md-primary" @click="updateProfile">Update Profile</md-button>
                            <md-button type="submit" class="md-raised md-primary" @click="showDialog = true">Change Password</md-button>
                        </md-card-actions> 

            </md-card>

        </div>
    </md-app-content>
  </md-app>
</template>

<style lang="scss" scoped>
  @import "~vue-material/src/theme/engine";

  @include md-register-theme("green-card", (
    primary: md-get-palette-color(green, 300)
  ));

  @include md-register-theme("black-card", (
    primary: md-get-palette-color(black, 500)
  ));

  @include md-register-theme("purple-card", (
    primary: md-get-palette-color(purple, 500)
  ));

  @include md-register-theme("orange-card", (
    primary: md-get-palette-color(orange, 200)
  ));

  @import "~vue-material/src/base/theme";
  @import "~vue-material/src/components/MdCard/theme";
.md-app{
    height: inherit;
  }
  


</style>

<script>
  import Navbar from '@/components/dashboard/Navbar'
  import Drawer from '@/components/dashboard/Drawer'
  import axios from 'axios'
export default {
  name: 'dashboard',
  components:{
    Navbar,
    Drawer,
  },
  data: function(){
    return {
      form:{
          username:this.$store.getters.userName,
          name:"hello",
          email:"email@email.com",
          phone:"7034240550",
          oldpassword:"",
          newpassword:""
      },
      showDialog:false,
      showNavigation: false
    }
  },
  methods:{
      updateProfile:function(){
          console.log("updating.....")
          var self=this
          var data=self.form
          var config={
              headers: { 
                  Authorization: "Bearer " + this.$store.getters.bearerToken
               }
            }
            axios.post(process.env.VUE_APP_ROOT_API+'profile/cell/updateProfile',{data:data},config)
            .then((res)=>{
                console.log("saved ");
                console.log(res);              
                alert("Successfully saved");
            })
            .catch((err)=>{
                console.log(err);
            })
      },
      changePassword:function(){
        console.log("changing.....")
        var self = this
        var data = {
            username: this.$store.getters.userName,
            old: this.form.oldpassword,
            password: this.form.newpassword
        }
        var config={
            headers: { Authorization: "Bearer " + this.$store.getters.bearerToken }
        }
        axios.post(process.env.VUE_APP_ROOT_API+'profile/cell/updatepwd',data,config)
            .then((res)=>{
                console.log(res.data)
                self.$router.push('/')
            })
            .catch((err)=>{
                console.log(err);
            })  
      }
  },
  mounted(){
      console.log("Retrieving profile");
        var self = this;
        axios.get(process.env.VUE_APP_ROOT_API+'profile/cell/getProfile',{
            params: {
                username:this.$store.getters.userName
            },
            headers: { 
                Authorization: "Bearer " + this.$store.getters.bearerToken 
            }                
        })
        .then((res) => {
            console.log(res.data);
            
            if(res.data.success){
                self.form.name = res.data.name
                self.form.email = res.data.email
                self.form.phone = res.data.phone
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

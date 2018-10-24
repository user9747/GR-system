<template>
  <div>
    <Navbar/>
    <form novalidate class="md-layout md-alignment-space-around-center" style="padding-top: 3vh">
      <md-card class="md-layout-item md-size-70  ">
        <md-card-header>
          <div class="md-title">Log In</div>
        </md-card-header>

        <md-card-content class="md-layout md-alignment-space-around-center">
          <md-field class="md-layout-item md-size-70  ">
            <label for="email">User Name</label>
            <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.userName"/>
           <!--  <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span> -->
          </md-field>
        </md-card-content>

        <md-card-content class="md-layout md-alignment-space-around-center">
          <md-field class="md-layout-item md-size-70 ">
            <label for="email">Password</label>
            <md-input type="password" name="email" id="email" autocomplete="email" v-model="form.password"/>
           <!--  <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span> -->
          </md-field>
        </md-card-content>




        <md-card-actions>
          <md-button  @click="submit" class="md-dense md-raised md-primary">Log In</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
  import Navbar from '@/components/dashboard/Navbar'
  import axios from 'axios'
  export default {
    name: 'LogIn',
    components:{
      Navbar
    },
    data: () => ({
      form: {
        userName:null,
        password:null,
      },

    }),
    methods: {
       submit:function(){
        // console.log(this.form);
        var self=this;
        axios({
          method:'post',
          url:'http://localhost:3000',
          data:{
            userName:this.form.userName,
            password:this.form.password,
          }
        }).then(function(res){
            console.log(res);
            self.$router.push('/dashboard');
          }).catch((err)=>{
            console.log(err);
          })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
</style>

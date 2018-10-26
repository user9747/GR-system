<template>
  <div>
    <Navbar/>
    <form novalidate class="md-layout md-alignment-space-around-center" style="padding-top: 3vh">
      <md-card class="md-layout-item md-size-70  ">
        <md-card-header>
          <div class="md-title">Log In</div>
        </md-card-header>

        <md-card-content class="md-layout md-alignment-space-around-center">
          <md-field v-bind:class="{'md-invalid': error.userErr}" class="md-layout-item md-size-70 ">
            <label for="email">User Name</label>
            <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.userName"/>
            <span class="md-error" >{{ error.userMsg }}</span>
          </md-field>
        </md-card-content>

        <md-card-content class="md-layout md-alignment-space-around-center">
          <md-field v-bind:class="{'md-invalid': error.passErr}" class="md-layout-item md-size-70 ">
            <label for="email">Password</label>
            <md-input type="password" name="email" id="email" autocomplete="email" v-model="form.password"/>
            <span class="md-error">{{ error.passMsg }}</span>
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
        password:null
      },
      error: {
        userErr: false,
        userMsg: null,
        passErr: false,
        passMsg: null
      }

    }),
    methods: {
       submit:function(){
        // console.log(this.form);
        this.error.userErr = this.error.passErr = false
        this.error.userMsg = this.error.passMsg = null
        var self=this;
        this.$store.dispatch('login', {
          userName: this.form.userName,
          password: this.form.password
        })
        .then(() => {
          self.$router.push('/dashboard')
        })
        .catch((err) => {
          self.userName = null
          self.password= null
          console.log(err.message);
          if(err.message == 'no such username'){
            self.error.userErr = true
            self.error.userMsg = "Username is incorrect"
          }else if(err.message == 'incorrect password'){
            self.error.passErr = true
            self.error.passMsg = "Password is incorrect"
          }
          else if(err.message == 'Missing credentials'){
            if(self.userName == null){
              self.error.userErr = true
              self.error.userMsg = "njangal entha pottanmaar ennano vicharam"
            }
            if(self.password == null){
              self.error.passErr = true
              self.error.passMsg = "njangal entha pottanmaar ennano vicharam"
            }
          }
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

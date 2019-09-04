<template>
<!--   <div class="home">
    <Dashboard />
  </div> -->
  <div class="md-layout md-alignment-center-center home ">
    <div class="md-layout-item md-size-35 md-xsmall-size-100 md-small-size-100 image-header">
      <img :src="images.cet" />
      <h1> College of Engineering Trivandrum </h1>
      <h2> Online Grievance Redressal System </h2>
    </div>
    <div class="md-layout-item md-size-35 md-xsmall-size-90 md-small-size-90 signup-form">
        <form novalidate class="md-layout md-alignment-space-around-center" style="padding-top: 3vh">
            <md-card class="md-layout-item">
                <md-card-header>
                <div class="md-title"><strong>Grievance Cell Log In</strong></div>
                </md-card-header>

                <md-card-content class="md-layout md-alignment-space-around-center">
                <md-field v-bind:class="{'md-invalid': error.userErr}" class="md-layout-item">
                    <label for="email">User Name</label>
                    <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.userName"/>
                    <span class="md-error" >{{ error.userMsg }}</span>
                </md-field>
                </md-card-content>

                <md-card-content class="md-layout md-alignment-space-around-center">
                <md-field v-bind:class="{'md-invalid': error.passErr}" class="md-layout-item">
                    <label for="email">Password</label>
                    <md-input type="password" name="email" id="email" autocomplete="email" v-model="form.password"/>
                    <span class="md-error">{{ error.passMsg }}</span>
                </md-field>
                </md-card-content>
                <md-card-actions md-alignment="space-between">
                    <md-button  @click="submit" class="md-dense md-raised md-primary">Log In</md-button>
                </md-card-actions>
            </md-card>
        </form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'CellLogin',
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
      },
      images:{
      cet: require('../../assets/cet-logo.png')
      }
    }),
    methods: {
       submit:function(){
        // console.log(this.form);
        this.error.userErr = this.error.passErr = false
        this.error.userMsg = this.error.passMsg = null
        var self=this;
        this.$store.dispatch('celllogin', {
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
              self.error.userMsg = "Missing credentials"
            }
            if(self.password == null){
              self.error.passErr = true
              self.error.passMsg = "Missing credentials"
            }
          }
        })
      },
    }
  }
</script>

<style>

</style>

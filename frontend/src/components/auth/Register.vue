<template>
  <div>
    <form novalidate class="md-layout md-alignment-space-around-center" style="padding-top: 3vh">
      <md-card class="md-layout-item ">
        <md-card-header>
          <div class="md-title"><strong>Register</strong></div>
        </md-card-header>

        <md-card-content class="md-layout md-alignment-space-around-center">
          <md-field v-bind:class="{ 'md-invalid': error.userErr }" class="md-layout-item ">
            <label for="email">User Name</label>
            <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.userName"/>
           <!--  <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span> -->
              <span class="md-error">{{ error.userErrMsg }}</span>

          </md-field>
        </md-card-content>

        <md-card-content class="md-layout md-alignment-space-around-center" >
          <md-field  v-bind:class="{ 'md-invalid': error.admNumErr}" class="md-layout-item "><!--  class="md-layout-item md-size-70 " -->
            <label for="email">Admission Number</label>
            <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.admNum"/>
           <!--  <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span> -->
            <span class="md-error">{{ error.admNumErrMsg }}</span>
          </md-field>
        </md-card-content>

        <md-card-content class="md-layout md-alignment-space-around-center">
          <md-field class="md-layout-item ">
            <label for="email">Password</label>
            <md-input type="password" name="email" id="email" autocomplete="email" v-model="form.password"/>
           <!--  <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span> -->
          </md-field>
        </md-card-content>

        <md-card-content class="md-layout md-alignment-space-around-center">
          <md-field class="md-layout-item">
          <label for="userType">User Type</label>
          <md-select v-model="form.type" name="type" id="type">
            <md-option value="student">Student</md-option>
            <md-option value="teacher" disabled>Teacher</md-option>
            <md-option value="other" disabled>Other</md-option>
          </md-select>
      
            
            
           <!--  <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span> -->
          </md-field> 
        </md-card-content>
<!-- TEST COMMENT
 -->


        <md-card-actions md-alignment="space-between">
          <a @click="toggle">Registered? Sign in</a>
          <md-button @click="submit" class="md-dense md-raised md-primary">Register</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'SignUp',
    data: () => ({
      form: {
        userName:null,
        password:null,
        admNum:null,
        type:null
      },
      error: {
        admNumErr: false,
        admNumErrMsg: null,
        userErr: false,
        userErrMsg: null
      }

    }),
    computed: {
      hasAdmissionErr(){
        return {
          
          'md-invalid': this.error.admNumErr
        }
      }
    },
    methods: {
      submit:function(){
        // console.log(this.form);
        this.error.admNumErr = false
        this.error.userErr = false
        var self=this;
        axios({
          method:'post',
          url:'http://localhost:3000/auth/register',
          data:{
            username:this.form.userName,
            password:this.form.password,
            admission_number:this.form.admNum,
            type:this.form.type
          }
        }).then(function(res){
            if(res.data.success){
              console.log(res);
              self.$emit('toggle')
            }
            else{
              self.form.userName = null
              self.form.password = null
              self.form.admNum = null
              self.form.type = null
              if(res.data.message == "Incorrect admission number"){
                console.log("Invalid admno");
                self.error.admNumErr = true
                self.error.admNumErrMsg = "Enter correct admission number"
              }else if(res.data.message == "username already taken"){
                self.error.userErr = true
                self.error.userErrMsg = res.data.message 
              }else if(res.data.message == "Account exists for the admission number"){
                self.error.admNumErr = true
                self.error.admNumErrMsg = "Account exists for the admission number"
              }
              console.log(res);
            }            
          }).catch((err)=>{
            console.log(err);
          })
      },
      toggle:function(){
          this.$emit('toggle')
      }
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

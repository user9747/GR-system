<template>
  <div>
    <form novalidate class="md-layout md-alignment-space-around-center" style="padding-top: 3vh">
      <md-card class="md-layout-item ">
        <md-card-header>
          <div class="md-title"><strong>Register</strong></div>
        </md-card-header>
        <md-card-content class="md-layout md-alignment-space-around-center">
          <md-field class="md-layout-item ">
            <label for="email">Name</label>
            <md-input type="text" name="name" id="name" v-model="form.name"/>
           <!--  <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span> -->

          </md-field>
        </md-card-content>
        <md-card-content class="md-layout md-alignment-space-around-center">
          <md-field v-bind:class="{ 'md-invalid': error.userErr }" class="md-layout-item ">
            <label for="email">User Name</label>
            <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.userName"/>
           <!--  <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span> -->
          <span class="md-error">{{ error.userErrMsg }}</span>
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
          <md-field v-bind:class="{ 'md-invalid': error.emailErr }" class="md-layout-item ">
            <label for="email">Email</label>
            <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email"/>
           <!--  <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span> -->
            <span class="md-error">{{ error.emailErrMsg }}</span>
          </md-field>
        </md-card-content>

        <md-card-content class="md-layout md-alignment-space-around-center">
          <md-field class="md-layout-item ">
            <label for="email">Phone Number</label>
            <md-input type="number" name="phone" id="phone" autocomplete="email" v-model="form.phone"/>
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
        email:null,
        phone:null,
        name:null
      },
      error: {
        userErr: false,
        userErrMsg: null,
        emailErr: false,
        emailErrMsg:null
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
        this.error.emailErr = false
        this.error.userErr = false
        var self=this;
        axios({
          method:'post',
          url:process.env.VUE_APP_ROOT_API+'auth/join',
          data:{
            username:this.form.userName,
            name:this.form.name,
            password:this.form.password,
            email:this.form.email,
            phone:this.form.phone
          }
        }).then(function(res){
          console.log(res.data);
          
            if(res.data.Success){
              //console.log(res);
              self.$emit('toggle')
              self.$router.push({name:'verify',params:{username:res.data.username}})
            }
            else{
              self.form.userName = null
              self.form.password = null
              self.form.email = null
              self.form.phone = null
              self.form.name = null
              console.log(res.data.error)
              if(res.data.error == "username already in use"){
                console.log("Username already in use");
                self.error.userErr = true
                self.error.userErrMsg = res.data.error
              }else if(res.data.error == "Email already in use"){
                console.log("Email already in use");                
                self.error.emailErr = true
                self.error.emailErrMsg = res.data.error 
              }
              //console.log(res);
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

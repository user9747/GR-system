<template>
    <md-app>
        <md-app-content>
            <div class="md-layout md-alignment-center-center" v-if="first">
                <form novalidate>
                    <md-card class="md-layout-item">
                        <md-card-header>
                            <span class="md-display-2"><strong>Verification Code</strong></span>
                        </md-card-header>
                        <md-card-content class="md-layout md-alignment-space-around-center">
                            <md-field v-bind:class="{'md-invalid': error.tokenErr}" class="md-layout-item">
                                <label for="token">Token</label>
                                <md-input type="text" name="token" id="token" autocomplete="token" v-model="form.token"/>
                                <span class="md-error" >{{ error.tokenErrMsg }}</span>
                            </md-field>
                        </md-card-content>
                        <md-card-actions md-alignment="space-between">
                            <md-button  @click="submit" class="md-dense md-raised md-primary">Submit</md-button>
                        </md-card-actions>
                    </md-card>
                </form>
                <div class="md-layout-item md-size-100">
                    <md-content class="md-accent">
                        A verification token has been sent to your registered e-mail. Please enter it below
                    </md-content>
                </div>
            </div>
            <div class="md-layout md-alignment-center-center" v-else-if="second">
                <md-card class="md-layout-item">
                    <md-card-header>
                        Are you a ...
                    </md-card-header>
                    <md-card-content class="md-layout md-alignment-space-around-center">
                        <md-card class="md-layout-item" >
                            <md-card-header>
                                <md-button class="md-raised md-primary" @click="setType('student')">
                                    STUDENT
                                </md-button>
                            </md-card-header>
                        </md-card>
                        <md-card class="md-layout-item" >
                            <md-card-header>
                                <md-button class="md-raised md-primary" @click="setType('teacher')">
                                    Teacher
                                </md-button>
                            </md-card-header>
                        </md-card>
                        <md-card class="md-layout-item" >
                            <md-card-header>
                                <md-button class="md-raised md-primary" @click="setType('other')">
                                    Other Users
                                </md-button>
                            </md-card-header>
                        </md-card>                        
                    </md-card-content>
                </md-card>
            </div>
            <div v-else-if="third">
                <form novalidate class="md-layout md-alignment-space-around-center" style="padding-top: 3vh" v-if="type == 'student'">
                <md-card class="md-layout-item">
                    <md-card-header>
                    <div class="md-title"><strong>Enter Student Details</strong></div>
                    </md-card-header>
                    <md-card-content class="md-layout md-alignment-space-around-center">
                    <md-field class="md-layout-item ">
                        <label for="admNo">Admission Number</label>
                        <md-input type="text" name="admNo" id="admNo" v-model="form.admNo"/>
                    <!--  <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
                        <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span> -->

                    </md-field>
                    </md-card-content>
                    <md-card-content class="md-layout md-alignment-space-around-center">
                    <md-field class="md-layout-item ">
                        <label for="department">Department</label>
                        <md-input type="department" name="department" id="department" autocomplete="email" v-model="form.department"/>
                    <!--  <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
                        <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span> -->
                    </md-field>
                    </md-card-content>

                    <md-card-content class="md-layout md-alignment-space-around-center">
                    <md-field class="md-layout-item ">
                        <label for="date">Date of Join</label>
                        <md-input type="date" name="date" id="date" autocomplete="email" v-model="form.date"/>
                    <!--  <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
                        <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span> -->
                    </md-field>
                    </md-card-content>

                    <md-card-content class="md-layout md-alignment-space-around-center">
                    <md-field class="md-layout-item ">
                        <label for="course">Course</label>
                        <md-input type="text" name="course" id="course" autocomplete="email" v-model="form.course"/>
                    <!--  <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
                        <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span> -->
                    </md-field>
                    </md-card-content>                  
                    <md-card-actions md-alignment="space-between">
                    <md-button @click="submitDetails()" class="md-dense md-raised md-primary">Submit</md-button>
                    </md-card-actions>
                </md-card>
                </form>
                <form novalidate class="md-layout md-alignment-space-around-center" style="padding-top: 3vh" v-if="type == 'teacher'">
                <md-card class="md-layout-item">
                    <md-card-header>
                    <div class="md-title"><strong>Enter Teacher Details</strong></div>
                    </md-card-header>
                    <md-card-content class="md-layout md-alignment-space-around-center">
                    <md-field class="md-layout-item ">
                        <label for="admNo">Designation</label>
                        <md-input type="text" name="admNo" id="admNo" v-model="form.designation"/>
                    <!--  <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
                        <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span> -->

                    </md-field>
                    </md-card-content>
                    <md-card-content class="md-layout md-alignment-space-around-center">
                    <md-field class="md-layout-item ">
                        <label for="department">Department</label>
                        <md-input type="department" name="department" id="department" autocomplete="email" v-model="form.department"/>
                    <!--  <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
                        <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span> -->
                    </md-field>
                    </md-card-content>               
                    <md-card-actions md-alignment="space-between">
                    <md-button @click="submitDetails()" class="md-dense md-raised md-primary">Register</md-button>
                    </md-card-actions>
                </md-card>
                </form>
                <form novalidate class="md-layout md-alignment-space-around-center" style="padding-top: 3vh" v-if="type == 'other'">
                <md-card class="md-layout-item">
                    <md-card-header>
                    <div class="md-title"><strong>Enter Details</strong></div>
                    </md-card-header>
                    <md-card-content class="md-layout md-alignment-space-around-center">
                    <md-field class="md-layout-item ">
                        <label for="admNo">Address</label>
                        <md-input type="textarea" name="admNo" id="admNo" v-model="form.address"/>
                    <!--  <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
                        <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span> -->

                    </md-field>
                    </md-card-content>
                    <md-card-content class="md-layout md-alignment-space-around-center">
                    <md-field class="md-layout-item ">
                        <label for="department">Relation with college</label>
                        <md-input type="department" name="department" id="department" autocomplete="email" v-model="form.relation"/>
                    <!--  <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
                        <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span> -->
                    </md-field>
                    </md-card-content>                  
                    <md-card-actions md-alignment="space-between">
                    <md-button @click="submitDetails()" class="md-dense md-raised md-primary">Submit</md-button>
                    </md-card-actions>
                </md-card>
                </form>
            </div>          
        </md-app-content>
    </md-app>
</template>

<script>
import Navbar from '@/components/dashboard/Navbar'
import Drawer from '@/components/dashboard/Drawer'
import axios from 'axios'
export default {
  name: 'verification',
  components:{
    Navbar,
    Drawer
  },
  props:['username'],
  data: function(){
      return {
          showNavigation: true,
          form:{
              token:null,
              admNo:null,
              department:null,
              date:null,
              course:null,
              designation:null,
              address:null,
              relation:null
          },
          error:{
              tokenErr:false,
              tokenErrMsg:null
          },
          first:true,
          second:false,
          third:false,
          type:null
      }
  },
  methods:{
      submit:function(){
        this.tokenErr = false
        this.tokenErrMsg = null
        var self = this
        console.log(this.$props.username);
        
        var info = {
            verification_token: this.form.token,
            username: this.$props.username
        }
        axios.post(process.env.VUE_APP_ROOT_API+'auth/verify',info)
        .then((res)=>{
            console.log(res.data);
            if(res.data.Success){
                console.log("Token Correct");
                self.first = false
                self.second = true
            }
            else if(res.data.error == "Incorrect verification token"){
                self.error.tokenErr = true
                self.error.tokenErrMsg = res.data.error
            }
        })
        .catch((err)=>{
            console.log(err);
        })
      },
      setType(typeSelected){
          this.type = typeSelected
          this.second = false
          this.third = true
      },
      submitDetails: function(){
          if(this.type == 'student'){
              var info = {
                  username: this.$props.username,
                  admission_no: this.form.admNo,
                  department: this.form.department,
                  date:this.form.date,
                  course:this.form.course
              }
              var self = this
              axios.post(process.env.VUE_APP_ROOT_API+'auth/studentinfo',info)
              .then((res) => {
                  console.log(res.data)
                  console.log("Submitted")
                  self.$router.push('/')
              })
              .catch((err) => {
                  console.log(err.message)
              })

          }
      }
  }
}
</script>

<style>

</style>

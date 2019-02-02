<template>
    <div>
        <div class="md-layout md-gutter md-alignment-top-center">
          <a @click="route('pending')">
            <md-card md-with-hover>
              <md-ripple>
                <md-card-header>
                  <div class="md-title">Pending Grievances</div>
                </md-card-header>

                <md-card-content>
                  <md-icon class="md-size-3x">info</md-icon>
                </md-card-content>
              </md-ripple>
            </md-card>
          </a>
          <a @click="route('accepted')">
            <md-card md-with-hover>
              <md-ripple>
                <md-card-header>
                  <div class="md-title">Accepted Grievances</div>
                </md-card-header>

                <md-card-content>
                  <md-icon class="md-size-3x">error_outline</md-icon>
                </md-card-content>
                
              </md-ripple>
            </md-card>
          </a>
           <md-button class="md-primary md-raised" @click="showDialog = true">Print Report</md-button>
        </div>   

        <div>
           <md-dialog :md-active.sync="showDialog"> 
                <md-field>
                  <md-datepicker v-model="selectedDate" :md-disabled-dates="disabledDates">
                    <label>Select month and year</label>
                  </md-datepicker>
                </md-field>
                <md-dialog-actions>
                   <md-button class="md-primary" @click="showDialog = false">Close</md-button>
                   <md-button class="md-primary md-raised" @click="printReport">Print</md-button>
                </md-dialog-actions>
             </md-dialog>  
         </div>   
    </div>
    
</template>

<script>
import axios from 'axios'
export default {
    name:"CellDashboard",
    data(){
      return{
        showDialog:false,
        selectedDate: new Date('2019/01/01'),
        disabledDates: date => {
          const day = date.getDate()

          return day >1 
        }
      }
    },
    methods:{
			newGr(){
			this.$router.push('createGR')
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
      printReport:function(){
        console.log("printing report");         
        var self = this
        var data = {
            "selectedDate":this.selectedDate
        }
        // console.log(data);
        var config = {
            headers:{
                Authorization: "Bearer " + this.$store.getters.bearerToken,
                'Accept': 'application/pdf' 
            },
            responseType: "blob"
        }
        axios.post(process.env.VUE_APP_ROOT_API+'grievance/cell/print/report',data,config)
        .then((response) => {
            this.showDialog=false;
            console.log("yoyo")
            console.log(response)
            const blob = new Blob([response.data], { type: 'application/pdf' })
            const objectUrl = window.URL.createObjectURL(blob)
            window.open(objectUrl)
            
        })
        .catch((err) => {
            console.log("hellooooooo");
            // console.log(err);
            
        })
      }
      	
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

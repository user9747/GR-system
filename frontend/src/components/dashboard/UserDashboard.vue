<template>
    <div>
        <div class="md-layout md-gutter md-alignment-top-center">
          <a @click="route('status')">
            <md-card md-with-hover>
              <md-ripple>
                <md-card-header>
                  <div class="md-title">Check Grievance Status</div>
                </md-card-header>

                <md-card-content>
                  <md-icon class="md-size-3x">info</md-icon>
                </md-card-content>
              </md-ripple>
            </md-card>
          </a>
          <a @click="route('submitted')">
            <md-card md-with-hover>
              <md-ripple>
                <md-card-header>
                  <div class="md-title">View Ongoing Grievances</div>
                </md-card-header>

                <md-card-content>
                  <md-icon class="md-size-3x">error_outline</md-icon>
                </md-card-content>
              </md-ripple>
            </md-card>
          </a>
        </div>
        <div class="md-layout md-gutter md-alignment-top-center">
          <a @click="route('closed')">
          <md-card md-with-hover>
            <md-ripple>
              <md-card-header>
                <div class="md-title">View Resolved Grievances</div>
              </md-card-header>

              <md-card-content>
                <md-icon class="md-size-3x">history</md-icon>
              </md-card-content>
            </md-ripple>
          </md-card>
          </a>
          <a @click="route('createGR')">
            <md-card md-with-hover>
        <md-ripple>
          <md-card-header>
          <div class="md-title">Submit a Grievance</div>
          </md-card-header>

          <md-card-content>
          <md-icon class="md-size-3x">check_circle_outline</md-icon>
          </md-card-content>
        </md-ripple>
            </md-card>
          </a>
        </div>
      
      </div>
</template>

<script>
export default {
    name: 'UserDashboard',
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

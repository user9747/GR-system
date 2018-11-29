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
        </div>      
    </div>
</template>

<script>
export default {
    name:"CellDashboard",
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
			}			
    }
}
</script>

<style>

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

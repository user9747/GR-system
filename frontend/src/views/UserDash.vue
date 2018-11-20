<template>
  <md-app >
    <md-app-toolbar class="md-primary" >
      <Navbar @toggleNav = "showNavigation = !showNavigation" />
    </md-app-toolbar>
    <md-app-drawer md-permanent="clipped" :md-active.sync="showNavigation">
      <Drawer />
    </md-app-drawer>
    <md-app-content>
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
        <a @click="route('pending')">
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

  .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }

  .md-app{
    height: inherit;
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

<script>
  import Navbar from '@/components/dashboard/Navbar'
  import Drawer from '@/components/dashboard/Drawer'
export default {
  name: 'dashboard',
  components:{
    Navbar,
    Drawer
  },
  data: function(){
    return {
      showNavigation: false
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
  	}
  }
}
</script>

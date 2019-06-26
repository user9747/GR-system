<template>
  <md-app >
    <md-app-toolbar class="md-primary" >
      <Navbar @toggleNav = "showNavigation = !showNavigation" />
    </md-app-toolbar>
    <md-app-drawer md-permanent="clipped" :md-active.sync="showNavigation">
      <Drawer />
    </md-app-drawer>
    <md-app-content>
      <UserDashboard v-if="$store.getters.usertype == 'user' " />
      <CellDashboard v-else-if="$store.getters.usertype == 'cell'" />
      <AdminDashboard v-else-if="$store.getters.usertype == 'admin'" />
      <div v-else>
        <h1>
          Somethings Wrong. Please logout and login again
        </h1>
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
.md-app{
    height: inherit;
  }
  


</style>

<script>
  import Navbar from '@/components/dashboard/Navbar'
  import Drawer from '@/components/dashboard/Drawer'
  import UserDashboard from '@/components/dashboard/UserDashboard'
  import CellDashboard from '@/components/dashboard/CellDashboard'
  import AdminDashboard from '@/components/dashboard/AdminDashboard'
export default {
  name: 'dashboard',
  components:{
    Navbar,
    Drawer,
    UserDashboard,
    CellDashboard,
    AdminDashboard
  },
  data: function(){
    return {
      showNavigation: false
    }
  },
  methods:{

  }
}
</script>

<template>
    <div>
      <md-toolbar class="md-transparent drawer-toolbar" md-elevation = 0>
        <md-avatar class="md-large">
          <img :src="images.cet">
        </md-avatar>
      </md-toolbar>
      <md-list>
          <a href="/#/dashboard" >
            <md-list-item>
              <md-icon>home</md-icon>
              <span class="md-list-item-text">Dashboard</span>
            </md-list-item>          
          </a>
          <a href="/#/profile"  >
          <md-list-item>
            <md-icon>account_circle</md-icon>
            <span class="md-list-item-text">Profile</span>
          </md-list-item>
          </a>

          <a href="/#/contact" >
            <md-list-item>
            <md-icon>help</md-icon>
            <span class="md-list-item-text">Contact Us</span>
          </md-list-item>
          </a>
          
        </md-list>
    </div>
</template>

<script>
export default {
    name: "Drawer",
    data: function(){
      return {
        images:{
          cet: require('../../assets/cet-logo.png')
        }
      }
    },
    methods:{
      route: function(r){
        console.log("routing....");
  		  this.$router.push('/'+r);
      }
    }
}
</script>

<style>

</style>

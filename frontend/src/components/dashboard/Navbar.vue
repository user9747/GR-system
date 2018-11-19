<template>
      <div class="md-toolbar-row">
        <div class="md-toolbar-section-start" @click="toggleNav">
          <md-button class="md-icon-button">
            <md-icon>menu</md-icon>
          </md-button>
        </div>

        <div class="md-toolbar-section-end">
          <md-button v-if="!$store.getters.isLoggedIn" @click="route('login')">
            Login
          </md-button>

          <md-button v-if="!$store.getters.isLoggedIn" @click="route('signup')">
            Sign Up
          </md-button>

          <md-button v-if="$store.getters.isLoggedIn" @click="logout">
            Logout
          </md-button>

        </div>
      </div>
</template>

<style lang="scss" scoped>
  .md-toolbar + .md-toolbar {
    margin-top: 16px;
  }
</style>

<style lang="scss" scoped>
  .md-toolbar + .md-toolbar {
    margin-top: 16px;
  }
  .md-drawer{
    height: 400vh;
  }
</style>

<script>
export default {
  name: 'Navbar',
  data: function(){
    return {
      showNavigation: false
    }
  },
  methods:{
  	route:function(r){
  		console.log("routing....");
  		this.$router.push('/'+r);
  	},
  	logout:function(){
      console.log("logging out...");
      this.$store.dispatch('logout')
      this.$router.push('/')
    },
    toggleNav(){
      this.$emit('toggleNav')
    }
  }
}
</script>

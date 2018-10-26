<template>
  <div>
    <md-toolbar class="md-primary">
      <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
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
    </md-toolbar>
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
</style>

<script>
export default {
  name: 'Navbar',
  methods:{
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

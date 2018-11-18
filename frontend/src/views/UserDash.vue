<template>
  <div>
    <Navbar/>

    <div class="md-layout md-gutter md-alignment-top-center">
    <md-card class="md-primary" md-theme="orange-card" md-with-hover >
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">Closed Grievances</div>
          <div class="md-subhead">3</div>
        </md-card-header-text>

        <md-card-media md-medium>
          <img src="/assets/examples/card-weather.png" alt="People">
        </md-card-media>
      </md-card-header>

      <md-card-actions>
        <md-button>View</md-button>
      </md-card-actions>
    </md-card>

    <md-card class="md-primary" md-theme="orange-card" md-with-hover >
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">Ongoing Grievances</div>
          <div class="md-subhead">1</div>
        </md-card-header-text>

        <md-card-media md-medium>
          <img src="/assets/examples/card-weather.png" alt="People">
        </md-card-media>
      </md-card-header>

      <md-card-actions>
        <md-button>View</md-button>
      </md-card-actions>
    </md-card>
  </div>
    <div class="md-layout md-gutter md-alignment-top-center">
    <md-card class="md-primary" md-theme="green-card" md-with-hover>
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">Submit New Grievance</div>
        </md-card-header-text>
      </md-card-header>

      <md-card-actions>
        <md-button class="md-fab md-primary" @click="newGr" >
          <md-icon>add</md-icon>
        </md-button>
      </md-card-actions>
    </md-card>
  </div>



  </div>
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
</style>

<script>
  import Navbar from '@/components/dashboard/Navbar'
export default {
  name: 'dashboard',
  components:{
    Navbar
  },
  methods:{
    newGr(){
      this.$router.push('createGR')
    }
  }
}
</script>

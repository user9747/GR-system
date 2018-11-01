<template>
    <div>
        <Navbar />
        <div class="md-layout md-alignment-center-center">
            <md-card class="md-layout-item md-size-70">
                <md-card-header>
                    <div class="md-title">Create new Grievance</div>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout md-gutter">
                        <md-field>
                            <label for="title">Title</label>
                            <md-input name="title" id="title" v-model="form.title" />
                        </md-field>
                    </div>
                </md-card-content>

            </md-card>

        </div>
    </div>
</template>

<script>
import Navbar from '@components/dashboard/Navbar.vue'
export default {

}
</script>

<style>

</style>

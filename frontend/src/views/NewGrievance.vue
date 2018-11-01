<template>
    <div>
        <Navbar />
        <div class="md-layout md-alignment-center-center">
            <md-card class="md-layout-item md-size-70">
                <md-card-header>
                    <div class="md-title">Create new Grievance</div>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout md-gutter md-alignment-center-center">
                        <div class="md-layout-item md-size-70 md-small-size-100">
                            <md-field>
                                <label for="title">Title</label>
                                <md-input name="title" id="title" v-model="form.title" />
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-70 md-small-size-100">
                            <md-field>
                                <label for="description">Description</label>
                                <md-input name="description" id="description" v-model="form.description" />
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-70 md-small-size-100">
                            <md-field>
                                <label for="remark">Remarks</label>
                                <md-input name="remark" id="remark" v-model="form.remark" />
                            </md-field>
                        </div>
                    </div>
                </md-card-content>
                        <md-card-actions>
                            <md-button type="submit" class="md-raised md-primary" @click="save">Save</md-button>
                            <md-button type="submit" class="md-raised md-accent" @click="submit">Submit</md-button>
                        </md-card-actions>

            </md-card>

        </div>
    </div>
</template>

<script>
import Navbar from '@/components/dashboard/Navbar'
export default {
    name: 'NewGrievance',
    components: {
        Navbar
    },
    data(){
        return{
            form:{
                title: null,
                description: null,
                remark: null
            }
        }
    },
    methods:{
        submit(){
            console.log("Submitted");
            
        },
        save(){
            console.log("save");
            
        }
    }
}
</script>

<style>

</style>

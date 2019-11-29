<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">New Point</p>
            <a href="#" class="card-header-icon" aria-label="more options">
                <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
            </a>
        </header>
        <div class="card-content">
            <form>
                <!-- TAB BUTTONS -->

                <b-field position="is-centered">
                    <b-radio-button v-model="pointType" native-value="Load" type="is-primary">
                        <b-icon pack="fas" icon="arrow-down"></b-icon>
                        <span>Load</span>
                    </b-radio-button>

                    <b-radio-button v-model="pointType" native-value="Distload" type="is-primary">
                        <b-icon pack="fas" icon="arrow-down"></b-icon>
                        <b-icon pack="fas" icon="arrow-down"></b-icon>
                        <!-- <span>Dist. Load</span> -->
                    </b-radio-button>

                    <b-radio-button v-model="pointType" native-value="Momentum" type="is-primary">
                        <b-icon pack="fas" icon="redo-alt"></b-icon>
                        <span>Mom</span>
                    </b-radio-button>

                    <b-radio-button v-model="pointType" native-value="Defenition" type="is-primary">
                        <b-icon pack="fas" icon="align-center"></b-icon>
                        <span>Def</span>
                    </b-radio-button>
                </b-field>

                <!-- DEFENITIONS -->

                <b-field v-show="pointType == 'Defenition'" position="is-centered">
                    <b-radio v-model="defenitionType" native-value="1" type="is-danger">
                        <span>Fixed</span>
                        <!-- [1, 1, 1]-->
                    </b-radio>

                    <b-radio v-model="defenitionType" native-value="2" type="is-success">
                        <span>Pin</span>
                        <!-- [1, 1, 0]-->
                    </b-radio>

                    <b-radio v-model="defenitionType" native-value="3" type="is-primary">
                        <span>Roller</span>
                        <!-- [0, 1, 0]-->
                    </b-radio>

                    <b-radio v-model="defenitionType" native-value="4" type="is-primary">
                        <span>Shar</span>
                        <!-- [0, 1, 0]-->
                    </b-radio>
                </b-field>

                <!-- LOAD -->

                <b-field
                    :type="{'is-danger': $v.$anyError}"
                    :message="{'Enter X offset': $v.$anyError}"
                    v-show="pointType !== 'Distload'"
                    label="Position"
                    horizontal
                >
                    <b-input
                        v-model="$v.xCoordinate.$model"
                        v-show="pointType !== 'Distload'"
                        placeholder="X-coordinate"
                        type="number"
                    ></b-input>
                </b-field>

                <b-field
                    v-show="pointType != 'Defenition' && pointType != 'Distload'"
                    label="Load"
                    horizontal
                >
                    <b-input v-model="load" placeholder="Load" type="number"></b-input>
                </b-field>

                <!-- DISTRIBUTED LOAD -->

                <b-field v-show="pointType == 'Distload'" label="Start" horizontal>
                    <b-input v-model="x1" placeholder="Start position" type="number"></b-input>
                </b-field>

                <b-field v-show="pointType == 'Distload'" label="End" horizontal>
                    <b-input v-model="x2" placeholder="End position" type="number"></b-input>
                </b-field>

                <b-field v-show="pointType == 'Distload'" label="Y1" horizontal>
                    <b-input v-model="y1" placeholder="Y1" type="number"></b-input>
                </b-field>

                <b-field v-show="pointType == 'Distload'" label="Y2" horizontal>
                    <b-input v-model="y2" placeholder="Y2" type="number"></b-input>
                </b-field>

                <hr />

                <!-- CONTROL BUTTONS -->

                <div class="buttons is-centered">
                    <!-- <button type="submit" class="button is-primary">Submit</button> -->
                    <b-button
                        @click="addPoint"
                        :disabled="isProcessing"
                        type="is-primary"
                        icon-pack="fas"
                        icon-left="plus"
                    >Add Point</b-button>
                    <b-button
                        @click="analyse"
                        :disabled="isProcessing"
                        type="is-light"
                        icon-pack="fas"
                        icon-right="calculator"
                        class="has-text-weight-medium"
                    >Analyse Beam</b-button>
                    <!-- <b-button
        @click="test"
        type="is-primary"
        icon-pack="fas"
        icon-right="calculator"
        outlined
                    >Test</b-button>-->
                    <b-button
                        @click="generator"
                        type="is-success"
                        icon-pack="fas"
                        icon-right="smile"
                    ></b-button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { required, minLength, between } from "vuelidate/lib/validators";
import BeamService from "../services/BeamService.js";

export default {
    mounted() {
        this.$store.dispatch("generator", 5);
    },
    data() {
        return {
            pointType: "Load",
            defenitionType: "1",
            xCoordinate: 0,
            angle: 90,
            load: 0,
            // Distributed load
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 0
        };
    },
    computed: {
        ...mapGetters(["getPoints"]),
        isProcessing() {
            return this.$store.getters.getProcessing;
        }
    },
    methods: {
        test() {
            this.$store.commit("SET_PROCESSING", true);
            fetch(
                "http://slowwly.robertomurray.co.uk/delay/3000/url/https://jsonplaceholder.typicode.com/todos"
            )
                // fetch("http://127.0.0.1:8081/points")
                .then(response => response.json())
                .then(json => {
                    this.$store.commit("SET_PROCESSING", false);
                    console.log(json);
                });
        },

        addPoint() {
            const {
                pointType,
                xCoordinate,
                load,
                angle,
                defenitionType,
                x1,
                x2,
                y1,
                y2
            } = this;

            let newPoint;

            if (pointType == "Load") {
                newPoint = {
                    type: 1,
                    x: [Number(xCoordinate)],
                    value: [Number(load), Number(angle)]
                };
                console.log(newPoint);
            } else if (pointType == "Momentum") {
                newPoint = {
                    type: 2,
                    x: [Number(xCoordinate)],
                    value: [Number(load)]
                };
            } else if (pointType == "Defenition") {
                newPoint = {
                    type: 3,
                    x: [Number(xCoordinate)],
                    value: [Number(defenitionType)]
                };
            } else if (pointType == "Distload") {
                newPoint = {
                    type: 4,
                    x: [Number(x1), Number(x2)],
                    value: [Number(y1), Number(y2)]
                };
            }
            // } else if (pointType == "Material") {
            //     newPoint = {
            //         type: 5,
            //         x: [Number(x1), Number(x2)],
            //         value: [Number(E), Number(J), Number(A)]
            //         // Number(A) == undefined
            //     };
            // }

            console.log(newPoint);

            this.$store.commit("ADD_POINT", newPoint);
            this.$buefy.toast.open({
                message: "New point added",
                type: "is-success",
                position: "is-bottom",
                duration: 1500,
                actionText: null
            });
        },

        analyse() {
            this.$store.dispatch("calculate");
        },
        generator() {
            this.$store.dispatch("generator", 5);
        }
    },
    validations: {
        xCoordinate: {
            required,
            minLength: minLength(1)
        }
    }
};
</script>
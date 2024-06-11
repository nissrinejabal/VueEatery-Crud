<template>
  <div>
    <HeaderRestComp />
    <div class="crud-section">
      <div class="container">
        <div class="form-card | padding-block-700">
          <h1 class="fs-secondary-heading | text-center">add new restaurant</h1>
          <form @submit.prevent="add">
            <p>Restaurant name</p>

            <input
              type="text"
              placeholder="Restaurant name"
              v-model.trim.trim="state.restname"
            />

            <span class="error-message" v-if="v$.restname.$error">
              {{ v$.restname.$errors[0].$message }}
            </span>
            <p>Phone number</p>

            <input
              type="number"
              placeholder="phone number"
              v-model.trim.trim="state.phone"
            />

            <span class="error-message" v-if="v$.phone.$error">
              {{ v$.phone.$errors[0].$message }}
            </span>
            <p>address</p>

            <input
              type="text"
              placeholder="address"
              v-model.trim.trim="state.address"
            />

            <span class="error-message" v-if="v$.address.$error">
              {{ v$.address.$errors[0].$message }}
            </span>
            <br />
            <span class="error-message"
              >{{ errorMessage }} {{ successMessage }}</span
            >

            <div class="button-container">
              <button class="button" type="submit" @click="addrest()">
                add
              </button>
              <button class="button" @click="gobackMenu">home</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <FooterComp />
  </div>
</template>

<script>
import HeaderRestComp from "../header/HeaderRestComp.vue";
import FooterComp from "../header/FooterComp.vue";
import { mapActions } from "vuex";
import useValidate from "@vuelidate/core";
import { required, phone, minLength } from "@vuelidate/validators";
import axios from "axios";
import { computed, reactive } from "vue";

export default {
  components: { HeaderRestComp, FooterComp },
  setup() {
    const state = reactive({
      restname: "",
      phone: "",
      address: "",
      errorMessage: "",
      successMessage: "",
    });
    const rules = computed(() => {
      return {
        restname: { required, minLength: minLength(3) },
        address: { required, minLength: minLength(2) },
        phone: { required, minLength: minLength(2) },
      };
    });
    const v$ = useValidate(rules, state);
    return {
      v$,
      state,
    };
  },
  data() {
    return {
      userId: "",
      errorMessage: "",
      successMessage: "",
    };
  },
  validations() {},

  mounted() {
    let user = localStorage.getItem("user-info");
    console.log("User data from local storage:", user);
    if (!user) {
      console.log("User not found. Redirecting to Signup.");
      this.redirectTo({ val: "Signup" });
    } else {
      const userData = JSON.parse(user);
      console.log("User ID from user data:", userData.id);
      this.userId = userData.id;
    }
  },

  methods: {
    ...mapActions(["redirectTo"]),
    async addrest() {
      this.v$.$validate();
      if (!this.v$.$error) {
        try {
          const existingRestaurants = await axios.get(
            `http://localhost:3000/restaurants`
          );
          const existingRestaurant = existingRestaurants.data.find(
            (rest) => rest.restname === this.state.restname
          );

          if (!existingRestaurant) {
            const newId =
              existingRestaurants.data.length > 0
                ? parseInt(
                    existingRestaurants.data[
                      existingRestaurants.data.length - 1
                    ].id
                  ) + 1
                : 1;

            const result = await axios.post(
              `http://localhost:3000/restaurants`,
              {
                id: newId.toString(),
                restname: this.state.restname,
                phone: this.state.phone,
                address: this.state.address,
                userId: this.userId,
              }
            );

            if (result.status === 201) {
              this.errorMessage = "";
              this.successMessage = "Restaurant added successfully.";

              setTimeout(() => {
                this.redirectTo({ val: "home" });
                this.errorMessage = "";
                this.successMessage = "";
                this.state.restname = "";
                this.state.phone = "";
                this.state.address = "";
                this.v$.restname.$errors[0] = "";
                this.v$.phone.$errors[0] = "";
                this.v$.address.$errors[0] = "";
              }, 2000);
            } else {
              this.errorMessage = "Failed to add restaurant.";
              this.successMessage = "";
            }
          } else {
            this.errorMessage = "Restaurant already exists.";
            this.successMessage = "";
          }
        } catch (error) {
          console.error("Error adding restaurant:", error);
          this.errorMessage = "Failed to add restaurant.";
          this.successMessage = "";
        }
      } else {
        console.log("Form validation failed.");
        this.errorMessage = "Try again, refresh all fields.";
        this.successMessage = "";
      }
    },

    gobackMenu() {
      this.redirectTo({ val: "home" });
    },
  },
};
</script>

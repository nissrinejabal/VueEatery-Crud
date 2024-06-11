<template>
  <div>
    <HeaderRestComp />
    <div class="crud-section">
      <div class="container">
        <div class="form-card | padding-block-700">
          <h1 class="fs-secondary-heading | text-center">add new Category</h1>
          <form @submit.prevent="addCategory">
            <p>
              Restaurant id : <span>{{ RestId }}</span>
            </p>
            <p>
              Restname : <span>{{ restname }}</span>
            </p>

            <input
              type="text"
              placeholder="Category name"
              v-model.trim="categorieName"
            />

            <span class="error-message" v-if="v$.categorieName.$error">
              {{ v$.categorieName.$errors[0].$message }} </span
            ><br />
            <span class="error-message"
              >{{ errorMessage }} {{ successMessage }}</span
            >
          </form>
          <div class="button-container">
            <button class="button" type="submit" @click="addCategory()">
              add
            </button>
            <button class="button" @click="gobackhome">Go back home</button>
            <button class="button" @click="gobackMenu">Menu</button>
          </div>
        </div>
      </div>
      <!-- <div v-if="showaddrestForm" class="sign-up"></div> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import HeaderRestComp from "@/components/header/HeaderRestComp.vue";
import { mapActions, mapMutations, mapState } from "vuex";
import useValidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
export default {
  components: { HeaderRestComp },

  data() {
    return {
      v$: useValidate(),
      RestId: this.$route.params.RestId,
      restname: "",
      userId: "",
      address: "",
      categorieName: "",
      errorMessage: "",
      successMessage: "",
      ListOfUserCategories: [],
    };
  },
  validations() {
    return {
      categorieName: {
        required,
        minLength: minLength(4),
        maxlength: maxLength(15),
      },
    };
  },
  async mounted() {
    let user = localStorage.getItem("user-info");
    console.log("User data from local storage:", user);
    if (!user) {
      console.log("User not found. Redirecting to Signup.");
      this.redirectTo({ val: "Signup" });
    } else {
      const userData = JSON.parse(user);
      this.restname = userData.restname;
      this.userId = userData.id;
      this.setIsUserloggedIn();
      this.displayAllCategories({
        theUserId: this.userId,
        theRestId: this.RestId,
      });
      this.canUserAccessThisRestaurant({
        theUserId: this.userId,
        theRestId: this.RestId,
        redirectToPage: "home",
      });
      this.getRestInfo(this.userId, this.RestId);
      this.DisplayUserCategories(this.userId, this.RestId);
      console.log("User ID from user data:", userData.id);
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    ...mapMutations([
      "setIsUserloggedIn",
      "displayAllCategories",
      "canUserAccessThisRestaurant",
    ]),

    async DisplayUserCategories(userId, restaurantId) {
      let result = await axios.get(
        `http://localhost:3000/categories?userId=${userId}&RestId=${restaurantId}`
      );
      if (result.status == 200) {
        this.ListOfUserCategories = result.data;
        console.log(result.data);
      }
    },
    async getRestInfo(userId, restaurantId) {
      let result = await axios.get(
        `http://localhost:3000/restaurants?userId=${userId}&id=${restaurantId}`
      );
      let RestDetails = [];
      if (result.status == 200) {
        console.log("hehe");
        RestDetails = result.data;
        this.restname = RestDetails[0].restname;
        this.address = RestDetails[0].address;
      }
    },
    async addCategory() {
      this.v$.$validate();
      let filterCategoryName = this.ListOfUserCategories.filter(
        (v) =>
          v.categorieName.toLowerCase() === this.categorieName.toLowerCase()
      );

      console.table(filterCategoryName);

      if (!this.v$.$error) {
        if (filterCategoryName.length > 0) {
          this.errorMessage = "The category name already exists.";
          this.successMessage = "";
        } else {
          try {
            const existingCategories = await axios.get(
              `http://localhost:3000/categories`
            );
            const newId =
              existingCategories.data.length > 0
                ? parseInt(
                    existingCategories.data[existingCategories.data.length - 1]
                      .id
                  ) + 1
                : 1;
            let result = await axios.post(`http://localhost:3000/categories`, {
              id: newId.toString(),
              categorieName: this.categorieName,
              userId: parseInt(this.userId, 10),
              RestId: parseInt(this.RestId),
            });

            if (result.status == 201) {
              this.errorMessage = "";
              this.successMessage = "Category added successfully.";

              setTimeout(() => {
                this.$router.push({
                  name: "ShowListCatgoriesComp",
                  params: { RestId: this.RestId },
                });
              }, 2000);
            } else {
              this.errorMessage = "Failed to add category.";
              this.successMessage = "";
            }
          } catch (error) {
            console.error("Error adding category:", error);
            this.errorMessage = "Failed to add category.";
            this.successMessage = "";
          }
        }
      } else {
        this.errorMessage = "Please enter a category name.";
        this.successMessage = "";
      }
    },

    gobackMenu() {
      this.$router.push({ name: "Menu", params: { RestId: this.RestId } });
    },
    gobackhome() {
      this.$router.push({ name: "home", params: { RestId: this.RestId } });
    },
  },
};
</script>


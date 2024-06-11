<template>
  <div>
    <HeaderRestComp />
    <div class="container | margin-top-500 padding-block-400">
      <div class="update-delete-form">
        <h1 class="fs-secondary-heading-h2 fw-bold">
          Delete Restaurant : <span>{{ deleteRestaurant }}</span>
        </h1>
        <div class="Delete-inputs-form">
          <input
            class="input-update-delete-form"
            type="text"
            v-model.trim="restname"
            placeholder="Restaurant Name"
            disabled
          />
          <input
            class="input-update-delete-form"
            type="text"
            v-model.trim="phone"
            placeholder="Phone"
            disabled
          />
          <input
            class="input-update-delete-form"
            type="text"
            v-model.trim="address"
            placeholder="Address"
            disabled
          />
          <input
            class="input-update-delete-form"
            type="text"
            v-model.trim="userId"
            placeholder="User ID"
            disabled
          />

          <div class="error-feedback" v-if="successMessage.length > 0">
            {{ successMessage }}
          </div>
          <div class="error-feedback" v-if="errorMessage.length > 0">
            {{ errorMessage }}
          </div>
        </div>
        <div class="delete-verif">
          <p>Are you sure you want to delete?(this rest its cat its items)</p>
          <button class="button | delete-btn" @click="deleteRest">
            Delete
          </button>
          <button class="button" @click="goback">Go Back</button>
        </div>
      </div>
    </div>
    <FooterComp />
  </div>
</template>

<script>
import HeaderRestComp from "../header/HeaderRestComp.vue";
import FooterComp from "../header/FooterComp.vue";

import axios from "axios";
import { mapActions } from "vuex";

export default {
  components: { HeaderRestComp, FooterComp },
  data() {
    return {
      phone: "",
      address: "",
      userId: "",
      restname: "",
      deleteRestaurant: "",
      RestaurantData: [],
      AllItemsIdIs: [],
      AllICatgoriesIdIs: [],
      successMessage: "",
      errorMessage: "",
    };
  },
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "home" });
    } else {
      const userData = JSON.parse(user);
      this.deleteRestaurant = this.$route.params.RestId;
      this.userId = userData.id;
      this.AccessRestaurantuser();
      let itemsResult = await axios.get(
        `http://localhost:3000/items?restaurantId=${this.deleteRestaurant}`
      );
      let itemsData = itemsResult.data;
      for (var i = 0; i < itemsData.length; i++) {
        this.AllItemsIdIs.push(itemsData[i].id);
      }
      let categoriesResult = await axios.get(
        `http://localhost:3000/categories?RestId=${this.deleteRestaurant}`
      );
      let categoriesData = categoriesResult.data;
      for (var y = 0; y < categoriesData.length; y++) {
        this.AllICatgoriesIdIs.push(categoriesData[y].id);
      }
    }
  },

  methods: {
    ...mapActions(["redirectTo"]),
    goback() {
      this.redirectTo({ val: "home" });
    },
    async AccessRestaurantuser() {
      let result = await axios.get(
        `http://localhost:3000/restaurants?id=${this.deleteRestaurant}&userId=${this.userId}`
      );
      if (result.status == 200 && result.data.length > 0) {
        this.RestaurantData = result.data;
        this.phone = this.RestaurantData[0].phone;
        this.address = this.RestaurantData[0].address;
        this.restname = this.RestaurantData[0].restname;
        console.log("Restaurant data loaded successfully.");
      } else {
        this.redirectTo({ val: "home" });
        console.log("Restaurant data not found.");
      }
    },
    async deleteRest() {
      let result = await axios.delete(
        `http://localhost:3000/restaurants/${this.deleteRestaurant}`
      );
      let allCatsResult = [];
      for (var x = 0; x < this.AllICatgoriesIdIs.length; x++) {
        let catResult = await axios.delete(
          `http://localhost:3000/categories/${this.AllICatgoriesIdIs[x]}`
        );
        if (catResult.status == 200) {
          allCatsResult.push(true);
        } else {
          allCatsResult.push(false);
        }
        console.table(allCatsResult);
      }
      let allItemsResult = [];
      for (var z = 0; z < this.AllItemsIdIs.length; z++) {
        let itemResult = await axios.delete(
          `http://localhost:3000/items/${this.AllItemsIdIs[z]}`
        );
        if (itemResult.status == 200) {
          allItemsResult.push(true);
        } else {
          allItemsResult.push(false);
        }
        console.table(allItemsResult);
      }
      if (
        result.status == 200 &&
        !allCatsResult.includes(false) &&
        !allItemsResult.includes(false)
      ) {
        this.errorMessage = "";
       this.successMessage = "Restaurant successfully deleted";
        setTimeout(() => {
          this.redirectTo({ val: "home" });
        }, 2000);
      } else {
        this.successMessage = "";
         this.errorMessage = "An error occurred while deleting the restaurant and its data.";
        console.log("Something went wrong");
      }
    },
  },
};
</script>

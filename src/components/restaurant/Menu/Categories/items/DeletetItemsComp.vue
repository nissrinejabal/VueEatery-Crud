<template>
  <div>
    <HeaderRestComp />
    <div class="container | margin-top-500 padding-block-400">
      <div class="update-delete-form">
        <h1 class="fs-secondary-heading-h2 fw-bold">
          Delete Product item name : <span> {{ restname }} </span> #
          <span>{{ address }} </span>
          <br />
        </h1>
        <div class="Delete-inputs-form">
          <input
            class="input-update-delete-form"
            type="text"
            v-model.trim="itemsId"
            disabled
          />

          <input
            class="input-update-delete-form"
            type="text"
            v-model.trim="itemname"
            disabled
          />

          <div class="error-message" v-if="successMessage.length > 0">
            {{ successMessage }}
          </div>
          <div class="error-message" v-if="errorMessage.length > 0">
            {{ errorMessage }}
          </div>
        </div>
        <div class="delete-verif">
          <p>Are you sure you want to delete?</p>
          <button class="button | delete-btn" @click="deleteCategory">
            Delete
          </button>
          <button class="button-restaurant | Menu-btn" @click="gobackHome">
            menu
          </button>
          <button class="button" @click="gobackHomelistcat">
            list categories
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import HeaderRestComp from "../../../../header/HeaderRestComp.vue";
import { mapActions, mapMutations } from "vuex";

export default {
  components: { HeaderRestComp },

  data() {
    return {
      RestId: this.$route.params.RestId,
      CatId: this.$route.params.CatId,
      itemsId: this.$route.params.itemsId,
      userId: "",
      address: "",
      restname: "",
      categorieName: "",
      itemname: "",
      errorMessage: "",
      successMessage: "",
      AllItemsIdIs: [],
    };
  },

  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "Signup" });
    } else {
      const userData = JSON.parse(user);
      this.userId = userData.id;
      this.AccessRestaurantuser();
      this.canUserAccessThisItem({
        theUserId: this.userId,
        theRestId: this.RestId,
        itemsIdIs: this.itemsId,
        redirectToPage: "home",
      });
      this.getCategoryInfo(this.userId, this.RestId, this.CatId);
      let result = await axios.get(
        `http://localhost:3000/items?CatId=${this.CatId}`
      );
      console.log(result.data.length);
      let ResultLen = result.data.length;
      for (var i = 0; i < ResultLen; i++) {
        this.AllItemsIdIs.push(result.data[i].id);
      }
      this.getItemInfo(this.userId, this.RestId, this.itemsId);
    }
  },

  methods: {
    ...mapActions(["redirectTo"]),
    ...mapMutations(["canUserAccessThisCategory", "canUserAccessThisItem"]),
    gobackHome() {
      this.$router.push({
        name: "Menu",
        params: { RestId: this.RestId },
      });
    },
    gobackHomelistcat() {
      this.$router.push({
        name: "ShowListCatgoriesComp",
        params: { RestId: this.RestId },
      });
    },
    async AccessRestaurantuser() {
      let result = await axios.get(
        `http://localhost:3000/restaurants?id=${this.RestId}&userId=${this.userId}`
      );
      if (result.status == 200 && result.data.length > 0) {
        this.RestaurantData = result.data;
        this.address = this.RestaurantData[0].address;
        this.restname = this.RestaurantData[0].restname;
        console.log("Restaurant data loaded successfully.");
      } else {
        this.redirectTo({ val: "home" });
        console.log("Restaurant data not found.");
      }
    },
    async getCategoryInfo(userId, restaurantId, CatId) {
      let result = await axios.get(
        `http://localhost:3000/categories?userId=${userId}&RestId=${restaurantId}&id=${CatId}`
      );
      if (result.status == 200) {
        this.categoryInfo = result.data;
        if (this.categoryInfo.length > 0) {
          this.categorieName = this.categoryInfo[0].categorieName;
        }
      }
    },
    async getItemInfo(userId, RestId, itemsId) {
      let result = await axios.get(
        `http://localhost:3000/items?userId=${userId}&RestId=${RestId}&id=${itemsId}`
      );
      let resultData = result.data[0];
      if (result.status == 200) {
        this.itemname = resultData.itemname;
        this.price = resultData.price;
        this.description = resultData.description;
        this.Quantity = resultData.Quantity;
        this.pickedCategory = resultData.CatId;
      }
    },
    async deleteCategory() {
      let result = await axios.delete(
        `http://localhost:3000/items/${this.itemsId}`
      );
      if (result.status == 200) {
        this.errorMessage = "";
        this.successMessage = "item deleted successfully.";
        setTimeout(() => {
          this.$router.push({
            name: "Menu",
            params: { RestId: this.RestId },
          });
        }, 2000);
      } else {
        this.errorMessage = "Failed to delete item.";
        this.successMessage = "";
      }
    },
  },
};
</script>

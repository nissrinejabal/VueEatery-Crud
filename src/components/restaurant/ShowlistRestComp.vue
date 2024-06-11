<template>
  <div>
    <section class="margin-top-900 padding-block-400">
      <div class="container">
        <div class="rest-card">
          <h1 class="fs-secondary-heading fw-bold">Restaurant List</h1>
          <div class="header-table | padding-block-400">
            <p v-if="allRestaurant.length > 0">
              list of restaurant ({{ allRestaurant.length }})
            </p>
            <div v-else class="empty-message"><p>no categories added</p></div>
            <div>
              <button
                v-if="allRestaurant.length > 0"
                @click="showDeleteConfirmation"
                class="button | delete-btn"
              >
                Delete All restaurant
              </button>
              <div v-if="showPopup" class="popup-container">
                <div class="padding-block-500 | popup">
                  <p>
                    Are you sure you want to delete all restaurants ?
                    (rest,cat,items)
                  </p>

                  <br />
                  <button class="button" @click="deleteAllItems">OK</button>
                  <button class="button" @click="cancelDeletion">No</button>
                </div>
              </div>
            </div>
          </div>
          <!-- <p>{{ allRestaurant }}</p> -->
          <ul>
            <li
              v-for="rest in allRestaurant"
              :key="rest.id"
              class="table-container"
            >
              <div class="global-info">
                <h2 class="fs-secondary-heading-h2 fw-bold">
                  {{ rest.restname }}
                </h2>
                <p>
                  <strong>phone:</strong><br />
                  {{ rest.phone }}
                </p>
                <p><strong>address:</strong> <br />{{ rest.address }}</p>
                <p>
                  <strong>user id:</strong><br />
                  {{ rest.userId }}
                </p>
                <!-- <p><strong>rest id:</strong> {{ rest.id }}</p> -->
              </div>

              <div class="button-container">
                <router-link
                  :to="{
                    name: 'DeleteRestaurant',
                    params: { RestId: rest.id },
                  }"
                >
                  <button class="button-restaurant | delete-btn">delete</button>
                </router-link>
                <router-link
                  :to="{
                    name: 'Updaterestaurant',
                    params: { RestId: rest.id },
                  }"
                >
                  <button class="button-restaurant | update-btn">Update</button>
                </router-link>
                <router-link
                  :to="{
                    name: 'Menu',
                    params: { RestId: rest.id },
                  }"
                >
                  <button class="button-restaurant | Menu-btn">Menu</button>
                </router-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section
      class="cta | margin-top-900 padding-block-900 bg-accent-400 text-neutral-100"
    >
      <div class="container">
        <div class="even-columns-column vertical-align-center">
          <div>
            <p class="fs-secondary-heading fw-bold fw-bold">
              Start elevating your restaurant experience today.
            </p>
          </div>
          <div class="justify-self-end-md">
            <button class="button" data-type="inverted">Get Started</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["allRestaurant"],
  data() {
    return {
      restaurants: [],
      showPopup: false,
      userId: "",
      AllRestaurantId: [],
      AllItemsIdIs: [],
      AllICatgoriesIdIs: [],
    };
  },
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "home" });
    } else {
      this.userId = JSON.parse(user).id;
      let result = await axios.get(
        `http://localhost:3000/restaurants?userId=${this.userId}`
      );
      console.log(result.data.length);
      let ResultLen = result.data.length;
      for (var i = 0; i < ResultLen; i++) {
        this.AllRestaurantId.push(result.data[i].id);
      }
      for (let restaurantId of this.AllRestaurantId) {
        let categoriesResult = await axios.get(
          `http://localhost:3000/categories?RestId=${restaurantId}`
        );
        let categoriesData = categoriesResult.data;
        for (var y = 0; y < categoriesData.length; y++) {
          this.AllICatgoriesIdIs.push(categoriesData[y].id);
        }
        let itemsResult = await axios.get(
          `http://localhost:3000/items?restaurantId=${restaurantId}`
        );
        let itemsData = itemsResult.data;
        for (var i = 0; i < itemsData.length; i++) {
          this.AllItemsIdIs.push(itemsData[i].id);
        }
      }
      console.log(this.AllRestaurantId.length);
      console.table(this.AllRestaurantId);
    }
  },
  methods: {
    showDeleteConfirmation() {
      this.showPopup = true;
    },
    async deleteAllItems() {
      let allResult = [];
      for (var i = 0; i < this.AllRestaurantId.length; i++) {
        let result = await axios.delete(
          `http://localhost:3000/restaurants/${this.AllRestaurantId[i]}`
        );
        if (result.status == 200) {
          allResult.push(true);
        } else {
          allResult.push(false);
        }
      }
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

      console.table(allResult);
      if (
        !allResult.includes(false) &&
        !allCatsResult.includes(false) &&
        !allItemsResult.includes(false)
      ) {
        console.log("All items have been deleted.");
        setTimeout(() => {
          this.showPopup = false;
          window.location.reload();
        }, 1000);
      } else {
        console.log("Please try again later");
      }
    },

    cancelDeletion() {
      this.showPopup = false;
    },
  },
};
</script>

<template>
  <div>
    <HeaderRestComp />
    <section class="margin-top-300 padding-block-400">
      <div class="container">
        <div class="rest-card">
          <div class="rest-card">
            <div class="margin-top-300 padding-block-400 | rule">
              <router-link
                :to="{ name: 'AddItemsComp', params: { RestId: RestId } }"
              >
                <button class="button" v-if="numOfCategories > 0">
                  add new item
                </button>
              </router-link>
              <router-link
                :to="{
                  name: 'ShowListCatgoriesComp',
                  params: { RestId: RestId },
                }"
              >
                <button class="button" @click="viewAllCategories">
                  View Categories
                </button>
              </router-link>
            </div>
            <h2 class="fs-secondary-heading-h2">products List</h2>

            <div class="header-table">
              <div v-if="ListOfUserCategories.length > 0">
                <p>
                  list of categories
                  <span>({{ ListOfUserCategories.length }})</span>
                </p>
              </div>

              <div v-else class="empty-message"><p>No Products added</p></div>
              <p v-if="ListOfUserCategories.length > 0">
                Restaurant :<span class="w-bold">{{ restname }}</span> <br />
                Adress : <span>{{ address }}</span>
              </p>

              <div>
                <button
                  class="button | delete-btn"
                  v-if="ListOfUserCategories.length > 0"
                  @click="showDeleteConfirmation"
                >
                  Delete All items
                </button>
                <div v-if="showPopup" class="popup-container">
                  <div class="padding-block-500 | popup">
                    <p>
                      Are you sure you want to delete all items/products ?
                      (rest,cat,items)
                    </p>
                    <br />

                    <button class="button" @click="deleteAllItems">OK</button>
                    <button class="button" @click="cancelDeletion">No</button>
                  </div>
                </div>
              </div>
            </div>
            <ul>
              <li
                v-for="Cat in ListOfUserCategories"
                :key="Cat.id"
                class="table-container"
              >
                <div class="global-info">
                  <h2 class="fs-secondary-heading-h2">
                    {{ Cat.categorieName }}
                  </h2>
                  <div v-for="(item, h) in ListOfUserItems" :key="h">
                    <div
                      v-show="Cat.id == item.CatId"
                      :class="{ showitems: Cat.id == item.CatId }"
                    >
                      <div
                        v-if="Cat.id == item.CatId"
                        :class="{ showitems: Cat.id == item.CatId }"
                      >
                        <p>
                          Name item: <span>{{ item.itemname }}</span>
                        </p>
                        <p>
                          item ID: <span>{{ item.id }}</span>
                        </p>
                        <p>
                          item description: <span>{{ item.description }}</span>
                        </p>
                        <div class="price-qty-container">
                          <p>
                            Price:<span>
                              {{ numberWithCommas(item.price) }}</span
                            >
                          </p>
                          <p>
                            Qty:
                            <span> {{ numberWithCommas(item.Quantity) }}</span>
                          </p>
                        </div>

                        <hr />
                        <div class="padding-block-400 | rule">
                          <router-link
                            :to="{
                              name: 'UpadteItemsComp',
                              params: { itemsId: item.id, RestId: RestId },
                            }"
                          >
                            <button class="button-restaurant | update-btn">
                              Update
                            </button>
                          </router-link>
                          <router-link
                            :to="{
                              name: 'DeletetItemsComp',
                              params: { itemsId: item.id, RestId: RestId },
                            }"
                          >
                            <button class="button-restaurant | delete-btn">
                              delete
                            </button>
                          </router-link>
                        </div>

                        <hr />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations, mapActions } from "vuex";
import HeaderRestComp from "@/components/header/HeaderRestComp.vue";
export default {
  components: { HeaderRestComp },

  data() {
    return {
      itemsId: this.$route.params.itemsId,
      RestId: this.$route.params.RestId,
      CatId: "",
      userId: "",
      userName: "",
      address: "",
      restname: "",
      categorieName: "",
      itemname: "",
      showPopup: false,
      ListOfUserCategories: [],
      ListOfUserItems: [],
      AllItemsIdIs: [],
      myResult: "",
    };
  },
  computed: {
    ...mapState([
      "IsUserloggedIn",
      "LoggedInUserId",
      "numOfCategories",
      "numOfItems",
      "ListOfCategories",
      "ListOfItems",
    ]),
  },

  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "Signup" });
    } else {
      const userData = JSON.parse(user);
      this.userId = userData.id;
      this.name = userData.name;
      this.displayAllCategories({
        theUserId: this.userId,
        theRestId: this.RestId,
      });
      this.canUserAccessThisRestaurant({
        theUserId: this.userId,
        theRestId: this.RestId,
      });
      this.getRestInfo(this.userId, this.RestId);
      this.getCategoryInfo(this.userId, this.RestId);
      this.getItemInfo(this.userId, this.RestId);
      let result = await axios.get(
        `http://localhost:3000/items?userId=${this.userId}&RestId=${this.RestId}`
      );
      this.myResult = result.data;
      let ResultLen = this.myResult.length;
      for (var i = 0; i < ResultLen; i++) {
        this.AllItemsIdIs.push(result.data[i].id);
      }
      this.getItemInfo(this.userId, this.RestId, this.itemsId);
    }
  },
  methods: {
    ...mapMutations([
      "setIsUserloggedIn",
      "displayAllCategories",
      "displayAllItems",
      "canUserAccessThisRestaurant",
    ]),
    ...mapActions(["redirectTo"]),

    viewCategory() {},
    gobackhome() {
      this.redirectTo({ val: "home" });
    },

    async getRestInfo(userId, restaurantId) {
      let result = await axios.get(
        `http://localhost:3000/restaurants?userId=${userId}&id=${restaurantId}`
      );
      let RestDetails = [];
      if (result.status == 200) {
        RestDetails = result.data;
        this.restname = RestDetails[0].restname;
        this.address = RestDetails[0].address;
      }
    },
    async getCategoryInfo(userId, RestId) {
      let result = await axios.get(
        `http://localhost:3000/categories?userId=${userId}&RestId=${RestId}`
      );
      if (result.status == 200) {
        this.ListOfUserCategories = result.data;
      }
    },
    async getItemInfo(userId, RestId) {
      let result = await axios.get(
        `http://localhost:3000/items?userId=${userId}&RestId=${RestId}`
      );
      if (result.status == 200) {
        this.ListOfUserItems = result.data;
      }
    },
    numberWithCommas(n) {
      return n.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    },
    async deleteAllItems() {
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
      }
      if (!allItemsResult.includes(false)) {
        this.successMessage = "All items deleted successfully.";
        window.location.reload();
        await this.getItemInfo(this.userId, this.RestId);
      } else {
        this.errorMessage = "Failed to delete all items.";
      }
      this.showPopup = false;
    },

    showDeleteConfirmation() {
      this.showPopup = true;
    },
    cancelDeletion() {
      this.showPopup = false;
    },
  },
};
</script>
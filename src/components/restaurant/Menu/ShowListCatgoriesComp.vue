<template>
  <HeaderRestComp />
  <section class="margin-top-900 padding-block-400">
    <div class="container">
      <div class="rest-card">
        <h1 class="fs-secondary-heading fw-bold">Categories List</h1>
        <div class="header-table | padding-block-400">
          <div class="margin-top-300 padding-block-400 | rule">
            <router-link
              :to="{ name: 'AddNewCatgoryComp', params: { RestId: RestId } }"
            >
              <button class="button" @click="viewAllCategories">
                add Category
              </button>
            </router-link>
          </div>
          <div v-if="numOfCategories > 0">
            <p>list of Categories ({{ numOfCategories }})</p>
          </div>
          <div v-else class="empty-message"><p>no categories added</p></div>
          <router-link
            v-if="numOfCategories > 0"
            :to="{
              name: 'DeleteCategoryALL',
              params: { RestId: RestId },
            }"
          >
            <button class="button | delete-btn">Delete all</button>
          </router-link>
        </div>

        <ul>
          <li
            v-for="Cat in ListOfCategories"
            :key="Cat.id"
            class="table-container"
          >
            <div class="global-info">
              <h2>{{ Cat.categorieName }}</h2>
            </div>
            <div class="button-container">
              <router-link
                :to="{
                  name: 'DeleteCategory',
                  params: { CatId: Cat.id, RestId: Cat.RestId },
                }"
              >
                <button class="button | delete-btn">delete</button>
              </router-link>
              <router-link
                :to="{
                  name: 'UpdateCategory',
                  params: { CatId: Cat.id, RestId: Cat.RestId },
                }"
              >
                <button class="button | update-btn">Update</button>
              </router-link>

              <router-link
                :to="{ name: 'Menu', params: { RestId: Cat.RestId } }"
              >
                <button class="button | Menu-btn">menu</button>
              </router-link>
            </div>
          </li>
        </ul>
        <p v-if="numOfCategories > 0">
          ps: delete categories and related items
        </p>
        <div class="rule">
          <router-link :to="{ name: 'home', params: { RestId: RestId } }">
            <button class="button" @click="gobackMenu">home</button>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import HeaderRestComp from "@/components/header/HeaderRestComp.vue";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  components: { HeaderRestComp },
  data() {
    return {
      RestId: this.$route.params.RestId,
      CatId: this.$route.params.CatId,
      userId: "",
      categorieName: "",
      restname: "",
      showPopup: false,
      AllRestaurantId: [],
      AllItemsIdIs: [],
      AllICateIdIs: [],
    };
  },
  computed: {
    ...mapState([
      "IsUserloggedIn",
      "LoggedInUserId",
      "numOfCategories",
      "ListOfCategories",
    ]),
  },
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "Signup" });
    } else {
      const userData = JSON.parse(user);
      this.userId = userData.id;
      this.canUserAccessThisRestaurant({
        theUserId: this.userId,
        theRestId: this.RestId,
        redirectToPage: "home",
      });
      this.displayAllCategories({
        theUserId: this.userId,
        theRestId: this.RestId,
      });
      this.getRestInfo(this.userId, this.RestId);
      this.getCategoryInfo(this.userId, this.RestId, this.CatId);
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    ...mapMutations(["canUserAccessThisRestaurant", "displayAllCategories"]),

    showDeleteConfirmation() {
      this.showPopup = true;
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
    deleteAllItems() {
      console.log("all deteled");
    },
    cancelDeletion() {
      this.showPopup = false;
    },
  },
};
</script>

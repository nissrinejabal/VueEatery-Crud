<template>
  <div>
    <HeaderRestComp />
    <div class="crud-section">
      <div class="container">
        <div class="form-card | padding-block-700">
          <h1 class="fs-secondary-heading | text-center">add new item</h1>
          <form @submit.prevent="addItem">
            <p>
              Restaurant id : <span>{{ RestId }}</span
              ><br />restname :
              <span>{{ restname }}</span>
            </p>
            <p>Item Name:</p>

            <input type="text" v-model="itemname" placeholder="itemname" />

            <span class="error-message" v-if="v$?.itemname?.$error">
              {{ v$?.itemname?.$errors[0]?.$message }}
            </span>
            <p>Description:</p>

            <textarea
              type="text"
              v-model="description"
              placeholder="description"
            ></textarea>

            <span class="error-message" v-if="v$?.description?.$error">
              {{ v$?.description?.$errors[0]?.$message }}
            </span>
            <p>Price:</p>

            <input type="text" v-model="price" placeholder="Price" />

            <span class="error-message" v-if="v$?.price?.$error">
              {{ v$?.price?.$errors[0]?.$message }}
            </span>
            <p>Quantity:</p>

            <input
              type="number"
              v-model.trim="Quantity"
              placeholder="Quantity"
              step="1"
            />

            <span class="error-message" v-if="v$?.Quantity?.$error">
              {{ v$?.Quantity?.$errors[0]?.$message }}
            </span>
            <p>Select Category:</p>

            <select
              selected
              class="selected-items input-field"
              v-model.trim="pickedCategory"
              placeholder="Quantity"
            >
              <option disabled>Please select a category</option>
              <option
                v-for="(Cat, i) in ListOfCategories"
                :key="i"
                :value="Cat.id"
              >
                {{ Cat.categorieName }}
                <!-- <h1>hhh id{{ pickedCategory }}</h1> -->
              </option>
            </select>

            <span class="error-message" v-if="v$?.pickedCategory?.$error">
              {{ v$?.pickedCategory?.$errors[0]?.$message }}
            </span>
            <span class="error-message"
              >{{ errorMessage }} {{ successMessage }}</span
            >
            <div class="button-container">
              <button class="button" type="submit">Add item</button>
              <button class="button" @click="gobackMenu">Menu</button>
              <button class="button" @click="gobackhome">home</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import HeaderRestComp from "@/components/header/HeaderRestComp.vue";
import { mapActions, mapMutations, mapState } from "vuex";
import useValidate from "@vuelidate/core";
import {
  required,
  minLength,
  maxLength,
  number,
  minValue,
  integer,
  between,
} from "@vuelidate/validators";
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
      itemname: "",
      pickedCategory: "",
      price: 1,
      description: "",
      Quantity: 1,
      errorMessage: "",
      successMessage: "",
      ListOfUserCategories: [],
    };
  },

  validations() {
    return {
      itemname: {
        required,
        minLength: minLength(4),
        maxlength: maxLength(15),
      },

      price: {
        required,
        min: minValue(0),
        minLength: minLength(4),
        maxlength: maxLength(15),
      },
      description: {
        required,
        minLength: minLength(4),
        maxlength: maxLength(15),
      },
      Quantity: {
        required,
        between: between(1, 1000),
      },
      pickedCategory: { required },
    };
  },
  computed: {
    ...mapState([
      "ListOfCategories",
      "IsUserloggedIn",
      "numOfCategories",
      "ListOfRestaurants",
    ]),
  },
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
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
    }
  },

  methods: {
    ...mapActions(["redirectTo"]),
    ...mapMutations([
      "setIsUserloggedIn",
      "ListOfCategories",
      "displayAllCategories",
      "canUserAccessThisRestaurant",
    ]),

    async DisplayUserCategories(userId, RestId) {
      let result = await axios.get(
        `http://localhost:3000/categories?userId=${userId}&RestId=${RestId}`
      );
      if (result.status == 200) {
        this.ListOfUserCategories = result.data;
        console.log(result.data);
      }
    },
    async getRestInfo(userId, RestId) {
      let result = await axios.get(
        `http://localhost:3000/restaurants?userId=${userId}&id=${RestId}`
      );
      let RestDetails = [];
      if (result.status == 200) {
        console.log("hehe");
        RestDetails = result.data;
        this.restname = RestDetails[0].restname;
        this.address = RestDetails[0].address;
      }
    },
    gobackhome() {
      this.$router.push({ name: "home", params: { RestId: this.RestId } });
    },
    gobackMenu() {
      this.$router.push({ name: "Menu", params: { RestId: this.RestId } });
    },
    async addItem() {
      this.v$.$validate();
      if (!this.v$.$error) {
        try {
          const existingItems = await axios.get(`http://localhost:3000/items`);
          const existingItem = existingItems.data.find(
            (item) =>
              item.itemname.toLowerCase() === this.itemname.toLowerCase()
          );

          if (!existingItem) {
            const newId =
              existingItems.data.length > 0
                ? parseInt(
                    existingItems.data[existingItems.data.length - 1].id
                  ) + 1
                : 1;
            let result = await axios.post(`http://localhost:3000/items`, {
              id: newId.toString(),
              itemname: this.itemname,
              price: parseFloat(this.price).toFixed(2),
              description: this.description,
              Quantity: this.Quantity,
              phone: this.phone,
              userId: parseInt(this.userId, 10),
              RestId: parseInt(this.RestId),
              CatId: parseInt(this.pickedCategory),
            });

            if (result.status == 201) {
              this.errorMessage = "";
              this.successMessage = "Item added successfully.";

              setTimeout(() => {
                this.$router.push({
                  name: "Menu",
                  params: { RestId: this.RestId },
                });
              }, 2000);
            } else {
              this.errorMessage = "Failed to add item.";
              this.successMessage = "";
            }
          } else {
            this.errorMessage = "Item already exists.";
            this.successMessage = "";
          }
        } catch (error) {
          console.error("Error adding item:", error);
          this.errorMessage = "Failed to add item.";
          this.successMessage = "";
        }
      } else {
        this.errorMessage = "Try again, refresh all fields.";
        this.successMessage = "";
      }
    },
  },
};
</script>

<template>
  <div class="home">
    <HeaderRestComp />
    <ShowlistComp :allRestaurant="listOfRestaurant" />
    <FooterComp />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import HeaderRestComp from "../../components/header/HeaderRestComp.vue";
import ShowlistComp from "@/components/restaurant/ShowlistRestComp.vue";
import axios from "axios";
import FooterComp from "../../components/header/FooterComp.vue";

export default {
  components: { HeaderRestComp, ShowlistComp, FooterComp },
  data() {
    return {
      name: "",
      password: "",
      role: "",
      userId: "",
      listOfRestaurant: [],
    };
  },

  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "Signup" });
      console.log("User not found in localStorage");
    } else {
      const userData = JSON.parse(user);
      this.name = userData.name;
      this.password = userData.password;
      this.role = userData.role;
      this.userId = userData.id;
    }
    let result = await axios.get(
      `http://localhost:3000/restaurants?userId=${this.userId}`
    );
    if (result.status == 200 && result.data.length > 0) {
      console.log(result);
      this.listOfRestaurant = result.data;
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
  },
};
</script>

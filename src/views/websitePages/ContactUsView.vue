<template>
  <navbar-comp />
  <section class="contact-section | text-justify">
    <div class="container">
      <h2 class="fs-secondary-heading fw-bold">Contact Us</h2>
      <p>
        Discover the finest cuisines with VueEatery. VueEatery simplifies
        showcasing menus, managing orders, and ensuring customer satisfaction
        for restaurant owners.
      </p>
      <button class="button">Learn More</button>
    </div>
  </section>
  <section class="text-center-sm-only padding-block-300">
    <div class="container">
      <div class="contact-page">
        <div class="image-section">
          <img src="@/assets/images/svg/Hidden person-pana.svg" alt="Contact" />
        </div>
        <div class="form-section">
          <h1 class="fs-secondary-heading | text-center">Information</h1>
          <div class="padding-block-300">
            <form @submit.prevent="update">
              <p class="text-center">Nom</p>
              <p>
                <input type="text" placeholder="Name" v-model.trim="name" />
                <br />
                <br />
                <span class="error-feedback" v-if="v$.name.$error">
                  {{ v$.name.$errors[0].$message }}
                </span>
              </p>
              <p class="text-center">Email</p>
              <p>
                <input type="email" placeholder="Email" v-model.trim="email" />
                <br />
                <br />
                <span class="error-feedback" v-if="v$.email.$error">
                  {{ v$.email.$errors[0].$message }}
                </span>
              </p>
              <p class="text-center">Password</p>
              <p>
                <input
                  type="password"
                  placeholder="Password"
                  v-model.trim="password"
                />
                <br />
                <br />
                <span class="error-feedback" v-if="v$.password.$error">
                  {{ v$.password.$errors[0].$message }}
                </span>
                <br />
                <span class="error-feedback"
                  >{{ errorMessage }} {{ successMessage }}</span
                >
              </p>
              <div class="rule">
                <button class="button" type="submit" @click="update()">
                  Update
                </button>
                <button class="button" @click="goback">go back home</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  <SliderLogoComp />
  <FooterCompVue />
</template>

<script>
import SliderLogoComp from "@/components/sliders/SliderLogoComp.vue";
import NavbarComp from "@/components/header/NavbarComp.vue";
import CardsComp from "@/components/cards/CardsComp.vue";
import FooterCompVue from "@/components/header/FooterComp.vue";
import { mapActions } from "vuex";
import useValidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

export default {
  data() {
    return {
      v$: useValidate(),
      name: "",
      email: "",
      password: "",
      avatar: "",
      showUpdateForm: false,
      userId: "",
      errorMessage: "",
      successMessage: "",
    };
  },
  validations() {
    return {
      name: { required, minLength: minLength(3) },
      password: { required, minLength: minLength(2) },
      email: { required, email },
    };
  },
  components: { NavbarComp, FooterCompVue, CardsComp, SliderLogoComp },
  mounted() {
    let user = localStorage.getItem("user-info");
  },
  methods: {
    ...mapActions(["redirectTo"]),
    goback() {
      this.redirectTo({ val: "home" });
    },
  },
};
</script>

<style scoped>
.contact-section {
  position: relative;
}
.contact-section::before {
  content: "";
  top: 41%;
  left: 113%;
  zoom: 65%;
  transform: translateX(-50%);
  width: 100%;
  height: 21rem;
  position: absolute;
  z-index: 999;
  /* background: url(file:///C:/Users/HP/Downloads/lif-up.svg); */
  background-image: url(@/assets/images/svg/lif-up.svg);
  background-repeat: no-repeat;
}
.contact-page {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
}

.image-section {
  flex: 1;
  text-align: center;
  padding: 50px 0;
}

.image-section img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.form-section {
  flex: 1;
  padding: 1rem;
}
</style>

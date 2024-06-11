<template>
  <div>
    <HeaderRestComp />
    <section class="hero | text-center-sm-only padding-block-300">
      <div class="container">
        <div class="even-columns">
          <div class="hero__image | flex-2">
            <h1 class="fs-secondary-heading | text-center">
              Update Information
            </h1>
            <div class="profile-form | padding-block-300">
              <form @submit.prevent="update">
                <p>Nom</p>
                <p>
                  <input type="text" placeholder="Name" v-model.trim="name" />
                  <br />
                  <br />
                  <span class="error-message" v-if="v$.name.$error">
                    {{ v$.name.$errors[0].$message }}
                  </span>
                </p>
                <p>Email</p>
                <p>
                  <input
                    type="email"
                    placeholder="Email"
                    v-model.trim="email"
                  />
                  <br />
                  <br />
                  <span class="error-message" v-if="v$.email.$error">
                    {{ v$.email.$errors[0].$message }}
                  </span>
                </p>
                <p>Password</p>
                <p>
                  <input
                    type="password"
                    placeholder="Password"
                    v-model.trim="password"
                  />
                  <br />
                  <br />
                  <span class="error-message" v-if="v$.password.$error">
                    {{ v$.password.$errors[0].$message }}
                  </span>
                  <br />
                  <span class="error-message"
                    >{{ errorMessage }} {{ successMessage }}</span
                  >
                </p>
                <div class="button-group">
                  <button class="button" type="submit" @click="update()">
                    Update
                  </button>
                  <button class="button" @click="goback">go back home</button>
                </div>
              </form>
            </div>
          </div>
          <div class="flex-2">
            <h1 class="fs-secondary-heading fw-bold">Profile</h1>
            <div class="profile-info">
              <div class="avatar">
                <img :src="avatar" alt="User Avatar" />
              </div>
              <div class="user-details">
                <p><strong>Name:</strong> {{ name }}</p>
                <p><strong>Email:</strong> {{ email }}</p>
                <p><strong>Password:</strong> {{ password }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <FooterCompVue />
  </div>
</template>

<script>
import HeaderRestComp from "@/components/header/HeaderRestComp.vue";
import FooterCompVue from "@/components/header/FooterComp.vue";
import { mapActions } from "vuex";
import useValidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import axios from "axios";

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
  components: { HeaderRestComp, FooterCompVue },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "Signup" });
      console.log("User not found");
    } else {
      const userData = JSON.parse(user);
      this.name = userData.name;
      this.email = userData.email;
      this.password = userData.password;
      this.avatar = require("../../../src/assets/images/1.jpg");
      this.userId = userData.id;
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    goback() {
      this.redirectTo({ val: "home" });
    },
    async update() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let result = await axios.put(
          `http://localhost:3000/users/${this.userId}`,
          {
            name: this.name,
            password: this.password,
            email: this.email,
          }
        );
        if (result.status === 200) {
          localStorage.setItem("user-info", JSON.stringify(result.data));

          window.location.reload();
        } else {
          console.log("profile not updated");
          this.errorMessage = "user not updated";
          this.successMessage = "";
        }
      } else {
        console.log("Form validation failed.");
        this.errorMessage = "try again";
        this.successMessage = "";
      }
    },
  },
};
</script>
<style scoped>

.profile-info {
  margin: var(--size-100);
  display: flex;
  align-items: center;
}
.button-group {
  display: flex;
  gap: var(--size-100);
  justify-content: space-between;
}

.avatar img {
  width: 100px;
  border-radius: 50%;
  margin-right: 20px;
}

.profile-form {
  padding: 2rem;
  background: #eff5fe;
  border-radius: 0% 55% 0% 55%;
  transform: rotate(0deg);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
input[type="text"],
[type="email"],
[type="password"] {
  border: solid 1px;
}
@media (max-width: 47em) {
  .hero__image {
    order: 1;
  }
}

@media screen and (max-width: 992px) {
  .profile-info {
    justify-content: center;
    text-align: justify;
  }
}
</style>

<template>
  <section class="hero | text-center-sm-only padding-block-500">
    <div class="container">
      <div class="even-columns">
        <div class="flex-2">
          <div class="card-authentification">
            <h2 class="fs-secondary-heading fw-bold">Sign up</h2>
            <form @submit.prevent="signUp">
              <p>Nom</p>
              <p>
                <input
                  type="text"
                  placeholder="Name"
                  v-model.trim="name"
                />
              </p>
              <span class="error-message" v-if="v$.name.$error">
                {{ v$.name.$errors[0].$message }}
              </span>
              <span class="error-message">{{ errorMessage }}</span>
              <p>Email</p>
              <p>
                <input
                  type="email"
                  placeholder="Email"
                  v-model.trim="email"
                />
              </p>
              <span class="error-message" v-if="v$.email.$error">
                {{ v$.email.$errors[0].$message }} </span
              ><span class="error-message">{{ errorMessage }}</span>
              <p>Password</p>
              <p>
                <input
                  type="password"
                  placeholder="Password"
                  v-model.trim="password"
                />
              </p>
              <span class="error-message" v-if="v$.password.$error">
                {{ v$.password.$errors[0].$message }}
              </span>
              <span class="error-message">{{ errorMessage }}</span>
              <br />
              <button class="button | margin-bottom-300" type="submit">
                Sign Up
              </button>
              <span class="loading-mexssage" v-if="loading">Loading...</span>
              <p class="or">OR</p>
              <button
                class="button | margin-bottom-300"
                @click="redirectToLogin"
              >
                Log in with your account
              </button>

              <p>Have an account? <a href="#" class="terms">Sign in</a></p>
            </form>
          </div>
        </div>
        <div class="hero__image | flex-2">
          <img class="mx-auto" src="@/assets/images/svg/Signup2.svg" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import useValidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import axios from "axios";

export default {
  name: "SignUp",
  data() {
    return {
      v$: useValidate(),
      name: "",
      email: "",
      password: "",
      errorMessage: "",
      loading: false,
      usersFetshData: [],
    };
  },
  validations() {
    return {
      name: { required, minLength: minLength(1) },
      password: { required, minLength: minLength(1) },
      email: { required, email },
    };
  },
  async mounted() {
    const response = await axios.get("http://localhost:3000/users");
    this.usersFetshData = response.data;
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async signUp() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.loading = true;
        const existingUser = this.usersFetshData.find(
          (user) => user.email === this.email
        );
        if (!existingUser) {
          const id =
            this.usersFetshData.length > 0
              ? parseInt(
                  this.usersFetshData[this.usersFetshData.length - 1].id
                ) + 1
              : 1;
          const result = await axios.post("http://localhost:3000/users", {
            id: id.toString(),
            name: this.name,
            password: this.password,
            email: this.email,
          });
          if (result.status == 201) {
            console.log("User successfully registered:", result.data);
            localStorage.setItem("user-info", JSON.stringify(result.data));
            console.log(result);
            this.redirectTo({ val: "home" });
          } else {
            this.errorMessage = "";
            this.loading = false;
          }
        } else {
          this.errorMessage = "User already exists.";
          this.loading = false;
        }
      } else {
        console.error("Form validation failed.");
      }
    },
    redirectToLogin() {
      this.redirectTo({ val: "Login" });
    },
  },
};
</script>

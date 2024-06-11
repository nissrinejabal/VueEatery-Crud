<template>
  <section class="hero | text-center-sm-only padding-block-500">
    <div class="container">
      <div class="even-columns">
        <div class="flex-2">
          <div class="card-authentification">
            <h2 class="fs-secondary-heading fw-bold">Login</h2>
            <form @submit.prevent="login">
              <p>Email</p>
              <p>
                <input
                  type="email"
                  placeholder="Email"
                  v-model.trim="state.email"
                />
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
                  v-model.trim="state.password"
                />
                <br />
                <span class="error-message" v-if="v$.password.$error">
                  {{ v$.password.$errors[0].$message }}
                </span>
                <br />
                <span class="error-message">{{ userNotfoundErr }}</span>
              </p>
              <p>
                <input type="checkbox" v-model="state.agreeToTerms" /> I agree
                to the
                <a href="#" class="terms">terms</a>
                <span
                  class="error-message"
                  v-if="!state.agreeToTerms && state.showTermsError"
                >
                  *
                </span>
              </p>

              <a href="#">
                <button class="button | margin-bottom-300" type="submit">
                  Login
                </button>
              </a>

              <p class="or">OR</p>
              <a href="#">
                <button
                  class="button | margin-bottom-300"
                  @click="redirectTo({ val: 'Signup' })"
                >
                  Create your account
                </button>
              </a>
              <p>
                Don't have an account?<a href="#" class="terms"> Sign in</a>
              </p>
            </form>
          </div>
        </div>
        <div class="hero__image | flex-2">
          <img
            class="mx-auto"
            src="@/assets/images/svg/Login-icon.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { mapActions } from "vuex";
import { required, email } from "@vuelidate/validators";
import { computed, reactive } from "vue";
import axios from "axios";

export default {
  setup() {
    const state = reactive({
      email: "",
      password: "",
      agreeToTerms: false,
      showTermsError: false,
    });

    const rules = computed(() => {
      return {
        email: { required, email },
        password: { required },
      };
    });

    const v$ = useVuelidate(rules, state);

    return {
      state,
      v$,
    };
  },
  data() {
    return {
      userNotfoundErr: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.redirectTo({ val: "home" });
      console.log("user home");
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async login() {
      this.state.showTermsError = !this.state.agreeToTerms;

      this.v$.$validate();
      if (!this.v$.$error && this.state.agreeToTerms) {
        const result = await axios.get(
          `http://localhost:3000/users?email=${this.state.email}`
        );
        if (result.status === 200 && result.data.length > 0) {
          const user = result.data[0];
          if (user.password === this.state.password) {
            localStorage.setItem("user-info", JSON.stringify(user));
            this.redirectTo({ val: "home" });
          } else {
            this.userNotfoundErr = "Password is incorrect";
          }
        } else {
          this.userNotfoundErr = "User not found.";
        }
      }
    },
  },
};
</script>


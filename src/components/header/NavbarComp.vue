<template>
  <body>
    <header class="primary-header" :data-overlay="isMenuOpen">
      <div class="container">
        <div class="nav-wrapper">
          <a href="#" aria-label="home">
            <router-link
              :to="{ name: 'HomeWebView', params: { pageTitle: 'HomeWebView page' } }"
            >
              <img :src="logo" alt="Logo" class="logo-image" />
            </router-link>
          </a>

          <button
            class="mobile-nav-toggle"
            :aria-controls="'primary-navigation'"
            :aria-expanded="isMenuOpen.toString()"
            @click="toggleMenu"
          >
            <!-- src="@/assets/images/svg/icon-hamburger.svg" -->
            <img
              v-if="!isMenuOpen"
              class="icon-hamburger"
              alt=""
              aria-hidden="true"
            />
            <img
              v-if="isMenuOpen"
              class="icon-close"
              alt=""
              src="@/assets/images/svg/icon-close.svg"
              aria-hidden="true"
            />
            <span class="visually-hidden">Menu</span>
          </button>

          <nav
            class="primary-navigation"
            id="primary-navigation"
            :data-visible="isMenuOpen"
          >
            <ul aria-label="Primary" role="list" class="nav-list">
              <!-- <li>
                <router-link
                  :to="{ name: 'home', params: { pageTitle: 'home page' } }"
                >
                  <a type="button">Home</a>
                </router-link>
              </li> -->

              <li>
                <router-link
                  :to="{
                    name: 'HomeWebView',
                    params: { pageTitle: 'home page' },
                  }"
                >
                  <a type="button">HomeWebView</a>
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'AboutUsView' }">
                  <a type="button">AboutUsView</a>
                </router-link>
              </li>

              <li>
                <router-link :to="{ name: 'ServicesView' }">
                  <a type="button">ServicesView</a>
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'ContactUsView' }">
                  <a type="button">ContactUs</a>
                </router-link>
              </li>
            </ul>
          </nav>

          <button
            v-if="IsUserloggedIn"
            class="button display-sm-none display-md-inline-flex"
            @click="logout"
          >
            Logout
          </button>
          <button
            v-else
            class="button display-sm-none display-md-inline-flex"
            @click="Signup"
          >
            Signup
          </button>
        </div>
      </div>
    </header>
  </body>
</template>
<script>
import logo from "@/assets/logovueEtery.png";
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      logo: logo,
      isMenuOpen: false,
    };
  },
  async mounted() {
    this.setIsUserloggedIn();
  },
  computed: {
    ...mapState(["IsUserloggedIn"]),
  },
  methods: {
    ...mapActions(["redirectTo"]),
    ...mapMutations(["setIsUserloggedIn"]),
    logout() {
      localStorage.removeItem("user-info");
      this.setIsUserloggedIn();
      window.location.reload();
    },
    Signup() {
      this.redirectTo({ val: "Signup" });
    },
    toggleMenu() {
      // Toggle the menu state
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

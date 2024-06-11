<template>
  <body>
    <header
      class="primary-header"
      :data-overlay="isMenuOpen"
      v-if="IsUserloggedIn"
    >
      <div class="container">
        <div class="nav-wrapper">
          <a href="#" aria-label="home">
            <router-link
              :to="{ name: 'home', params: { pageTitle: 'home page' } }"
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
              <li>
                <router-link
                  tag="li"
                  :to="{ name: 'home', params: { pageTitle: 'home page' } }"
                >
                  <a>Home</a>
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'addres' }">
                  <a type="button">add new restauarant</a>
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'Profile' }">
                  <a type="button">Profile</a>
                </router-link>
              </li>
            </ul>
          </nav>
          <!--  ///////////////////////////////////////////////////////////// -->
          <div v-if="$route.name === 'ShowItemsComp'">
            <div class="margin-top-300 padding-block-400 | rule">
              <router-link
                :to="{ name: 'AddItemsComp', params: { RestId: RestId } }"
                v-if="numOfCategories > 0"
              >
                <button class="button">add new item</button>
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
          </div>
          <!-- ///////////////////////////////////////////////////////////// -->
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
<style>
/* navigation */
.rule {
  display: flex;
  justify-content: space-between;
}
.nav-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mobile-nav-toggle {
  display: none;
}

.nav-list {
  font-size: var(--fs-nav);
}

.nav-list {
  display: flex;
  gap: clamp(var(--size-400), 5vw, var(--size-700));
  font-weight: var(--fw-semi-bold);
}

.nav-list a {
  text-decoration: none;
  color: var(--clr-primary-400);
}

.nav-list a:hover,
.nav-list a:focus {
  color: var(--clr-accent-400);
}

@media (max-width: 47em) {
  .primary-header[data-overlay] {
    position: relative;
    z-index: 999;
  }

  .primary-navigation {
    display: none;
    position: fixed;
    padding: var(--size-700);
    inset: 7rem var(--size-400) auto;
    max-width: 25rem;
    margin-inline: auto;
    background: var(--clr-neutral-100);
    border-radius: var(--size-100);
    box-shadow: 0 0 0.75em rgb(0, 0, 0, 0.05);
  }


  .nav-list {
    display: grid;
    gap: var(--size-600);
    text-align: center;
    font-weight: var(--fw-bold);
  }

  .primary-navigation[data-visible="true"] {
    display: block;
    background: #eff5fe;
  }

  .mobile-nav-toggle {
    display: block;
    position: sticky;
    top: var(--size-600);
    right: var(--size-400);
    cursor: pointer;
    background: transparent;
    border: 0;
    padding: 0.5em;
    width: 1.75rem;
    aspect-ratio: 1;
    background-image: url(@/assets/images/svg/icon-hamburger.svg);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .mobile-nav-toggle[aria-expanded="true"] {
    background-image: url("@/assets/images/svg/icon-close.svg");
  }
}
</style>

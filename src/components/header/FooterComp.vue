<template>
  <footer
    class="primary-footer__wrapper | padding-block-900 bg-neutral-900 text-neutral-100"
  >
    <div class="container">
      <div class="primary-footer | align-items">
        <div class="logo">
          <a class="primary-footer__logo" href="#" aria-label="home">
            <router-link
              tag="li"
              :to="{ name: 'home', params: { pageTitle: 'home page' } }"
            >
              <img :src="logo" alt="Logo" class="logo-image | footer-img" />
            </router-link>
          </a>

          <div class="social-icons" role="list" aria-label="Social links">
            <a href="#" target="_blank"><i class="fab fa-facebook-f"></i></a>
            <a href="#" target="_blank"><i class="fab fa-twitter"></i></a>
            <a href="#" target="_blank"><i class="fab fa-instagram"></i></a>
            <!-- Add more social media icons as needed -->
          </div>
        </div>

        <div class="primary-footer__nav-wrapper">
          <nav class="footer-nav">
            <ul
              class="menu"
              style="--flow-spacer: 1em"
              aria-label="Footer"
              role="list"
            >
              <li><a href="#">Home</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Products</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Community</a></li>
            </ul>
          </nav>
        </div>

        <div class="search">
          <div class="search-bar">
            <input type="email" v-model="searchQuery" placeholder="Search..." />
            <button class="button" @click="search" data-shadow="none">
              Search
            </button>
          </div>
          <div class="copyright">
            <p class="primary-footer__copyright">
              Copyright 2020. All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import logo from "@/assets/logovueEtery.png";
export default {
  data() {
    return {
      logo: logo,
    };
  },
};
</script>

<style scoped>
.primary-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}
.logo {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.menu {
  display: grid;
  grid-template-columns: repeat(2, max-content);
  gap: clamp(1rem, 1vw, 1rem);
  list-style: none;
  padding: 0;
}

.menu a {
  color: white;
  text-decoration: none;
}

.search {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}
.search-bar {
  display: flex;
  gap: var(--size-200);
}
/* .copyright {
  margin-top: 10px;
} */
.align-items {
  align-items: center;
}
/* social list ///////////////////////////////////////////////////////////////////*/

.social-icons {
  /* display: flex;
  gap: var(--size-300);
  aspect-ratio: 1; */
}
.social-icons a {
  color: #fff;
  text-decoration: none;
  font-size: 1.5rem;
  margin: 0 10px;
}

.social-icons a:hover {
  opacity: 0.8;
}
/* footer ///////////////////////////////////////////////////////////////////*/

.primary-footer__copyright {
  opacity: 0.7;
}

.primary-footer__nav-wrapper {
  margin-inline: auto;
}

/* footer navigation */

.footer-nav {
  gap: clamp(4rem, 10vw, 7rem);
}

.footer-nav a {
  color: var(--clr-neutral-100);
  text-decoration: none;
}

.footer-nav a:is(:hover, :focus) {
  color: var(--clr-accent-400);
}

.footer-img {
  border-radius: 3rem;
  width: 85px;
}
@media (max-width: 47em) {
  .primary-footer__wrapper {
    flex-direction: column;
  }
  .primary-footer {
    gap: clamp(3rem, 1vw, 3rem);
    flex-direction: column;
  }

  /* .logo {
    order: 4;
  } */
  /* .menu {
    order: 2;
  }
  .search {
    order: 4;
  } */

  .social-icon {
    width: var(--size-400);
    max-width: revert;
  }
  .primary-footer__wrapper > * {
    margin-inline: auto;
  }
  .search {
    align-items: center;
  }
}
</style>

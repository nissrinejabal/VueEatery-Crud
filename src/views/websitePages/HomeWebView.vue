<template>
  <div class="home">
    <NavbarComp />
    <body>
      <main>
        <section class="hero | text-center-sm-only padding-block-400">
          <div class="container">
            <div class="even-columns">
              <div class="flex-2">
                <h1 class="fs-primary-heading fw-bold">
                  Discover the finest cuisines with VueEatery.
                </h1>
                <p>
                  VueEatery simplifies showcasing menus, managing orders, and
                  ensuring customer satisfaction for restaurant owners.
                </p>
                <button class="button">Get Started</button>
              </div>
              <div class="hero__image | flex-2">
                <img
                  class="mx-auto"
                  src="@/assets/images/svg/home-img.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>

        <section class="sales-points | padding-block-900">
          <div class="container">
            <div class="even-columns-column">
              <div
                class="sales-points__blog | text-center-sm-only"
                style="--flow-spacer: 1.5rem"
              >
                <h2 class="fs-secondary-heading fw-bold">
                  What’s different about VueEatery?
                </h2>
                <p>
                  VueEatery offers all the tools restaurant owners need to excel
                  in the digital age.
                </p>
              </div>
              <div>
                <ul class="numbered-items" role="list">
                  <li>
                    <div style="--flow-spacer: 1em">
                      <h3 class="numbered-items__title | fs-600 fw-bold">
                        Secure user authentication
                      </h3>
                      <p class="numbered-items__body" data-width="wide">
                        Secure sign in and sign up functionality for restaurant
                        owners.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div style="--flow-spacer: 1em">
                      <h3 class="numbered-items__title | fs-600 fw-bold">
                        Restaurant management made easy
                      </h3>
                      <p class="numbered-items__body" data-width="wide">
                        View, add, update, and delete restaurants effortlessly.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div style="--flow-spacer: 1em">
                      <h3 class="numbered-items__title | fs-600 fw-bold">
                        Streamlined product management
                      </h3>
                      <p class="numbered-items__body" data-width="wide">
                        Manage products within each restaurant, including
                        categories and individual items.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <slider-comp />
        <section class="contact | padding-block-200 text-center">
          <div class="container">
            <h2
              class="contact-header | fs-secondary-heading fw-bold padding-block-300"
            >
              Find us
            </h2>
            <div class="maps-section">
              <div class="map-description">
                <div class="container">
                  <h2 class="fs-secondary-heading-h2 fw-bold">
                    What’s different about VueEatery?
                  </h2>
                  <div>
                    <p class="text-justify">
                      Pizza is a savory dish of Italian origin consisting of a
                      usually round, flattened base of leavened wheat-based
                      dough topped with tomatoes, cheese, and often various
                      other ingredients such as anchovies, mushrooms, onions,
                      olives, pineapple, meat, etc.
                    </p>
                    <p class="text-justify">
                      Sushi is a Japanese dish consisting of small balls or
                      rolls of vinegar-flavored cold-cooked rice served with a
                      garnish of raw fish, vegetables, or egg.
                    </p>
                    <p class="text-justify">
                      Tacos are a traditional Mexican dish consisting of a corn
                      or wheat tortilla folded or rolled around a filling,
                      typically including seasoned meat, beans, lettuce, and
                      salsa.
                    </p>
                  </div>
                </div>
              </div>

              <div class="map-embed">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26594.190211134952!2d-7.724901437759419!3d33.57224024775623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d344734ba907%3A0xd854d19c1f7b064e!2sLe%20Studio%20des%20Arts%20Vivants!5e0!3m2!1sfr!2sma!4v1715692610834!5m2!1sfr!2sma"
                  width="100%"
                  height="300px"
                  frameborder="0"
                  style="border: 0"
                  allowfullscreen=""
                  aria-hidden="false"
                  tabindex="0"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
        <section
          class="cta | margin-top-900 padding-block-900 bg-accent-400 text-neutral-100"
        >
          <div class="container">
            <div class="even-columns-column vertical-align-center">
              <div>
                <p class="fs-secondary-heading fw-bold fw-bold">
                  Start elevating your restaurant experience today.
                </p>
              </div>
              <div class="justify-self-end-md">
                <button class="button" data-type="inverted">Get Started</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </body>
    <FooterCompVue />
  </div>
</template>

<script>
import NavbarComp from "@/components/header/NavbarComp.vue";
import ShowlistComp from "@/components/restaurant/ShowlistRestComp.vue";
import SliderComp from "@/components/sliders/SliderComp.vue";
import FooterCompVue from "@/components/header/FooterComp.vue";

export default {
  components: { NavbarComp, ShowlistComp, SliderComp, FooterCompVue },
};
</script>

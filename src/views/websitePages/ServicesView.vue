<template>
  <NavbarComp />
  <section class="hero | text-center-sm-only padding-block-400">
    <div class="container">
      <div class="even-columns">
        <div class="flex-2">
          <h1 class="fs-primary-heading fw-bold">
            Discover the finest cuisines with VueEatery.
          </h1>
          <p>
            VueEatery simplifies showcasing menus, managing orders, and ensuring
            customer satisfaction for restaurant owners.
          </p>
          <button class="button">Get Started</button>
        </div>
        <div class="hero__image | flex-2">
          <img
            class="mx-auto"
            src="@/assets/images/svg/Web-devices-amico.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  </section>
  <section class="card-section">
    <div class="container">
      <div class="card-container">
        <div class="card-row">
          <a href="https://www.guestwaiter.com" target="_blank">
            <div class="card-img">
              <img src="@/assets/images/svg/livecollect.webp" alt="Image 1" />
            </div>
          </a>
          <div class="card-content">
            <h3 class="text-center">Livecollect</h3>
            <p>
              GuestWaiter is an innovative online platform dedicated to
              simplifying food ordering experiences. Offering an extensive array
              of menu options from various restaurants, it enables seamless
              online ordering for users. With swift delivery services, Guest
              Waiter brings the culinary world to your fingertips, ensuring
              delightful dining experiences from the comfort of your home.
            </p>
          </div>
        </div>
        <div class="card-row">
          <a href="https://www.guestwaiter.com" target="_blank">
            <div class="card-img">
              <img src="@/assets/images/svg/guestwaiter.webp" alt="Image 2" />
            </div>
          </a>
          <div class="card-content">
            <h3 class="text-center">VueEatery</h3>
            <p>
              VueEatery is a comprehensive CRUD (Create, Read, Update, Delete)
              application designed as a central dashboard for restaurant users.
              It provides a user-friendly interface for managing restaurant
              operations, including menu creation, order management, and user
              administration. With VueEatery, restaurant owners can efficiently
              oversee and control various aspects of their business, enhancing
              productivity and customer satisfaction.
            </p>
          </div>
        </div>
        <div class="card-row">
          <a href="https://www.guestwaiter.com" target="_blank">
            <div class="card-img">
              <img src="@/assets/images/svg/guestwaiter.webp" alt="Image 3" />
            </div>
          </a>
          <div class="card-content">
            <h3 class="text-center">GuestWaiter</h3>
            <p>
              Livecollect is a dynamic food website offering convenient online
              ordering services. With a diverse selection of culinary delights,
              it provides users with seamless access to a range of delicious
              dishes from local eateries. Enjoy hassle-free ordering and quick
              delivery, bringing delightful dining experiences to your doorstep.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="about-section | text-center-sm-only padding-block-400">
    <div class="container">
      <div class="text-center">
        <div class="container">
          <h2 class="fs-primary-heading fw-bold">Our Food Projects</h2>
          <p class="text-section">
            At VueEatery, we're proud to present three innovative food projects
            that we have developed to elevate your dining experience through
            digital dashboards. Each project is designed to streamline
            operations, enhance menu management, and boost customer
            satisfaction.
            <br />
            Our first project focuses on a seamless order management system,
            ensuring that all customer orders are processed efficiently and
            accurately. This system integrates directly with your kitchen,
            minimizing errors and reducing wait times.
            <br />
            The second project is a dynamic menu management tool. It allows you
            to easily update and customize your menu, highlight special dishes,
            and provide detailed descriptions and images. This ensures your
            customers always have the most up-to-date information about your
            offerings.
            <br />
            Our third project is a customer engagement platform. This tool helps
            you gather valuable feedback, manage reservations, and send
            personalized promotions to your loyal patrons. By leveraging this
            platform, you can build stronger relationships with your customers
            and keep them coming back for more.
            <br />
            With these projects, VueEatery aims to simplify restaurant
            management and create a more enjoyable dining experience for both
            owners and customers.
          </p>

          <button class="button">Learn More</button>
        </div>
      </div>
    </div>
  </section>
  <AnnimatedCardsComp />
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
  <FooterCompVue />
</template>

<script>
import NavbarComp from "@/components/header/NavbarComp.vue";
import AnnimatedCardsComp from "@/components/cards/AnnimatedCardsComp.vue";
import FooterCompVue from "@/components/header/FooterComp.vue";
export default {
  components: { NavbarComp, FooterCompVue, AnnimatedCardsComp },
};
</script>
<style scoped>
.card-row {
  border-radius: 0 0 10rem 0;
  transition: transform 0.3s ease-in-out;
}
.card-row:hover {
  transform: translateY(-5px);
}
.card-img img {
  transition: transform 0.3s ease-in-out;
}
.card-img:hover img {
  transform: scale(1.1);
}
.anim-section {
  background: linear-gradient(#eff5fe, #fff);
}

.about-section {
  background: linear-gradient(#eff5fe, #ffffff);
  position: relative;
}


.about-section::after {
  content: url("@/assets/images/svg/new-product.svg");
  position: absolute;
  zoom: 28%;
  width: 100px;
  opacity: 20%;
}
.about-section::before {
  content: url("@/assets/images/svg/push-button.svg");
  position: absolute;
  zoom: 28%;
  width: 100px;
  opacity: 20%;
}

.about-section::before {
  left: 5%;
  bottom: 10%;
  z-index: 1999;
}

.about-section::after {
  right: 10%;
  top: 10%;
  z-index: 1999;
}
.text-section {
  padding: 25px 0px;
  max-width: 100ch;
  text-align: justify;
}


</style>

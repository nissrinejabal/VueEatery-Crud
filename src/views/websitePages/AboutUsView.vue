<template>
  <NavbarComp />
  <section class="hero | text-center-sm-only padding-block-400">
    <div class="container">
      <div class="even-columns">
        <div class="flex-2 | padding-block-900">
          <h1 class="fs-primary-heading fw-bold">À propos de VueEatery</h1>
          <p>Découvrez l'histoire derrière VueEatery</p>
          <button class="button">Get Started</button>
        </div>
        <div class="hero__image | flex-2">
          <img
            class="mx-auto"
            src="@/assets/images/svg/illustration-intro--test.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  </section>

  <CardsComp />
  <section class="text-about-section | text-center-sm-only padding-block-400">
    <div class="container">
      <div class="text-center">
        <div class="container">
          <h2 class="fs-primary-heading fw-bold">About Us</h2>
          <p class="image-text">
            Discover the finest cuisines with VueEatery. VueEatery simplifies
            showcasing menus, managing orders, and ensuring customer
            satisfaction for restaurant owners. Discover the finest cuisines
            with VueEatery. VueEatery simplifies showcasing menus, managing
            orders, and ensuring customer satisfaction for restaurant owners.
            Discover the finest cuisines with VueEatery. VueEatery simplifies
            showcasing menus, managing orders, and ensuring customer
            satisfaction for restaurant owners. VueEatery simplifies showcasing
            menus, managing orders, and ensuring customer satisfaction for
            restaurant owners.VueEatery simplifies showcasing menus, managing
            orders, and ensuring customer satisfaction for restaurant owners.
          </p>
          <button class="button">Learn More</button>
        </div>
      </div>
    </div>
  </section>

  <section class="text-center-sm-only padding-block-900">
    <div class="container content-wrapper">
      <div class="text-part | flex-2">
        <h2 class="fs-primary-heading fw-bold margin-bottom-900">About Us</h2>
        <p>
          Discover the finest cuisines with VueEatery. VueEatery simplifies
          showcasing menus, managing orders, and ensuring customer satisfaction
          for restaurant owners.
        </p>
        <button class="button">Learn More</button>
      </div>

      <div class="flex-2">
        <div class="cards-row">
          <div class="card-two-part">
            <img src="@/assets/images/svg/Intelligence.svg" alt="Image 4" />
            <div class="card-content">
              <h3>Intelligence</h3>
              <p>
                En travaillant nous suivant toujours la règle : Travailler plus
                intelligemment et pas plus durement. Nous pensons toujours au
                pourquoi de la chose parce que c’est ainsi que nous devenons
                meilleurs, compétitifs et dans des brefs délais.
              </p>
            </div>
          </div>
          <div class="card-two-part | card-description">
            <img src="@/assets/images/svg/durability.svg" alt="Image 4" />
            <div class="card-content">
              <h3>Durabilité</h3>
              <p>
                Nous donnons toujours la priorité à vos relations et nous
                veillons toujours à entretenir des liens réels: c’est notre
                secret pour avancer.
              </p>
            </div>
          </div>
        </div>
        <div class="cards-row">
          <div class="card-two-part">
            <img src="@/assets/images/svg/generosite.svg" alt="Image 4" />
            <div class="card-content">
              <h3>Générosité</h3>
              <p>
                nous vous donnons plus que ce que vous attendez de nous, car
                nous savons que vous aimez recevoir plus que ce qui vous a été
                promis.
              </p>
            </div>
          </div>
          <div class="card-two-part card-description">
            <img src="@/assets/images/svg/trust-icon.svg" alt="Image 4" />

            <div class="card-content">
              <h3>Digne de confiance</h3>
              <p>
                Nous prenons des engagements avec soin, avec l'intention de
                toujours les tenir. Nous apprécions la confiance que vous nous
                accordez et faisons tout notre possible pour l'honorer.
              </p>
              <!-- <button class="button">Learn More</button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <SliderLogoComp />
  <FooterComp />
</template>

<script>
import SliderLogoComp from "@/components/sliders/SliderLogoComp.vue";
import CardsComp from "@/components/cards/CardsComp.vue";
import FooterComp from "@/components/header/FooterComp.vue";
import NavbarComp from "@/components/header/NavbarComp.vue";
export default {
  components: { NavbarComp, SliderLogoComp, FooterComp, CardsComp },
};
</script>

<style scoped>
/* //// */
.text-about-section {
  padding: 50px 0;
}

.text-about-section p {
  text-align: justify;
}
.image-text {
  padding: 25px 0px;
  max-width: 100ch;
  text-align: justify;
}

.content-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.text-part {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.card-two-part {
  width: 50%;
  height: 550px;
  background-image: linear-gradient(163deg, #eff5fe08 47%, #eff5fe 92%);
  border-radius: 20px;
  transition: all 0.3s;
  padding: 0px;
  margin: 8% auto 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.cards-row {
  display: flex;
}
.card-description {
  position: relative;
  bottom: 7rem;
  margin-left: 2rem;
}

.card-two-part:last-child {
  margin-right: 0;
}

.card-two-part img {
  width: 100%;
  height: auto;
}
.text-about-section {
  background: linear-gradient(#eff5fe, #ffffff);
  position: relative;
}

.text-about-section::before,
.text-about-section::after {
  content: url("@/assets/images/svg/set-up-svgrepo-com.svg");
  position: absolute;
  zoom: 77%;
  width: 100px;
  opacity: 20%;
}

.text-about-section::before {
  left: 5%;
  bottom: 10%;
  z-index: 1999;
}

.text-about-section::after {
  right: 10%;
  top: 10%;
  z-index: 1999;
}
.card-content {
  padding: 1rem;
}

@media (max-width: 47em) {
  .text-part {
    align-items: center;
  }
}
@media (max-width: 480px) {
  .card-two-part {
    width: 100%;
  }
  .cards-row {
    display: flex;
    flex-direction: column;
  }
  .card-description {
    position: relative;
    bottom: 0;
    margin-left: 0;
  }
}
.text-about-section::before,
.text-about-section::after {
  content: url("@/assets/images/svg/set-up-svgrepo-com.svg");
  position: absolute;
  zoom: 77%;
  width: 100px;
  opacity: 20%;
  animation: rotate 10s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

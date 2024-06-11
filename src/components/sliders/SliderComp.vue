<template>
  <section class="carousel | padding-block-900 text-center">
    <h2 class="fs-secondary-heading fw-bold">What they've said</h2>
    <ul class="owl-carousel">
      <li v-for="(item, index) in carouselItems" :key="index" class="item">
        <img :src="item.image" />
        <div class="owl-carousel-content" style="--flow-spacer: 1rem">
          <h3 class="fw-bold">{{ item.title }}</h3>
          <p data-width="wide">
            {{ item.description }}
          </p>
        </div>
      </li>
    </ul>
    <div class="owl-nav">
      <button class="owl-prev" @click="prev">
        <i class="fa fa-angle-left"></i>
      </button>
      <button class="owl-next | margin-500" @click="next">
        <i class="fa fa-angle-right"></i>
      </button>
    </div>
  </section>
</template>

<script>
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel";

export default {
  data() {
    return {
      owlCarousel: null,
      carouselItems: [
        {
          title: "Samantha Pierce",
          description:
            "“VueEatery has revolutionized our restaurant's operations. It's like having a dedicated team member managing orders ”",
          image: "http://localhost:8080/img/avatar-anisha.1950e610.png",
        },
        {
          title: "Ryan Patel",
          description:
            "“With VueEatery, we've seen a significant increase in customer satisfaction. Managing our menu and orders has never been easier.”",
          image: "http://localhost:8080/img/avatar-anisha.1950e610.png",
        },
        {
          title: "Linda Nguyen",
          description:
            "“VueEatery has helped us streamline our restaurant management process. It's intuitive and easy to use, making our lives much simpler.”",
          image: "http://localhost:8080/img/avatar-anisha.1950e610.png",
        },
      ],
    };
  },
  mounted() {
    this.owlCarousel = $(".owl-carousel").owlCarousel({
      loop: true,
      margin: 10,
      nav: false,
      dots: true,
      // autoplay: true,
      // autoplayTimeout: 5000,
      onChanged: this.updateCurrentSlide,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 2,
        },
        768: {
          items: 3,
        },
      },
    });
  },
  methods: {
    prev() {
      this.owlCarousel.trigger("prev.owl.carousel");
    },
    next() {
      this.owlCarousel.trigger("next.owl.carousel");
    },
  },
};
</script>

<style scoped>
.owl-prev,
.owl-next {
  background: #fff;
  border: none;
  color: #000;
  font-size: 24px;
  cursor: pointer;
  padding: 5px 10px;
}
.owl-carousel {
  list-style: none;
}
.owl-carousel > * {
  position: relative;
  flex: 0 0 auto;
  width: 100%;
}
.owl-carousel-content {
  border-radius: var(--size-100);
  padding: var(--size-700) var(--size-600) var(--size-600);
  background: var(--clr-neutral-200);
}
.owl-carousel img {
  width: var(--size-800);
  position: relative;
  top: calc(var(--size-800) / 2);
  margin-inline: auto;
}

@media (min-width: 480px) {
  .owl-carousel {
    scroll-padding-inline: 25px;
  }

  .owl-carousel > * {
    width: 50%;
  }
}
@media (min-width: 47em) {
  .owl-carousel > * {
    width: 35%;
  }
}
@media (max-width: 480px) {
  .owl-carousel {
    gap: 0;
  }
}
</style>

<template>
  <section class="carousel | text-center">
    <h2 class="fs-secondary-heading fw-bold margin-bottom-700">Clients</h2>
    <ul class="owl-carousel">
      <li v-for="(item, index) in carouselItems" :key="index" class="item">
        <img :src="item.image" />
      </li>
    </ul>
    <div class="owl-nav">
      <button class="owl-prev" @click="prev">
        <i class="fa fa-angle-left"></i>
      </button>
      <button class="owl-next | margin-700" @click="next">
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
            "“VueEatery has revolutionized our restaurant's operations. It's like having a dedicated team member managing orders and ensuring everything runs smoothly.”",
          image: "https://reactivux.com/wp-content/uploads/2022/03/client2.png",
        },
        {
          title: "Ryan Patel",
          description:
            "“With VueEatery, we've seen a significant increase in customer satisfaction. Managing our menu and orders has never been easier.”",
          image: "https://reactivux.com/wp-content/uploads/2022/03/client1.png",
        },
        {
          title: "Linda Nguyen",
          description:
            "“VueEatery has helped us streamline our restaurant management process. It's intuitive and easy to use, making our lives much simpler.”",
          image: "https://reactivux.com/wp-content/uploads/2022/03/client2.png",
        },
        {
          title: "Samantha Pierce",
          description:
            "“VueEatery has revolutionized our restaurant's operations. It's like having a dedicated team member managing orders and ensuring everything runs smoothly.”",
          image: "https://reactivux.com/wp-content/uploads/2022/03/client1.png",
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
      autoplay: true,
      autoplayTimeout: 5000,
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
        800: {
          items: 4,
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
  display: none;
}
.owl-carousel {
  list-style: none;
}

.owl-carousel {
  background-color: #eff5fe;
  padding: 3rem;
}
.owl-carousel img {
  width: 10rem;
  position: relative;
  top: calc(var(--size-700) / 2);
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

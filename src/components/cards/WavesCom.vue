<template>
  <div class="waves-container">
    <div class="ocean">
      <div class="wave"></div>
      <div class="wave"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.waves-container {
  position: relative;
  /* height: 200px;
  overflow: hidden; */
}

.ocean {
  height: 5%;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: #cee1fd;
  z-index: -999;
}

.wave {
  background: url(file:///C:/Users/HP/Downloads/6plp8cuezuqlwq7nhse.svg)
    repeat-x;
  position: absolute;
  top: -198px;
  width: 6400px;
  height: 198px;
  animation: wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
  transform: translate3d(0, 0, 0);
}

.wave:nth-of-type(2) {
  top: -175px;
  animation: wave 10s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.125s infinite;
  /* swell 7s ease -1.25s infinite; */
  opacity: 1;
}
/* .hero__image img {
  animation: swell 7s ease -1.25s infinite;
} */

@keyframes wave {
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: -1600px;
  }
}

/* @keyframes swell {
  0%,
  100% {
    transform: translate3d(0, -25px, 0);
  }
  50% {
    transform: translate3d(0, 5px, 0);
  }
} */
</style>

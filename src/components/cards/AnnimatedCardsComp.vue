<template>
  <section class="padding-block-900">
    <div class="anim-section">
      <div class="anim-section-card top">
        <img src="@/assets/images/svg/Generating-new-leads.svg" alt="Icon 1" />
        <div class="hover-text">Generosity</div>
      </div>
      <div class="anim-section-card top-right">
        <img src="@/assets/images/svg/Generating-new-leads.svg" alt="Image 5" />
        <div class="hover-text">Innovation</div>
      </div>
      <div class="anim-section-card right">
        <img src="@/assets/images/svg/Businessmerger-pana.svg" alt="Icon 2" />
        <div class="hover-text">Excellence</div>
      </div>
      <div class="anim-section-card right-bottom">
        <img src="@/assets/images/svg/Generating-new-leads.svg" alt="Image 6" />
        <div class="hover-text">Collaboration</div>
      </div>
      <p>Vueteury</p>
      <div class="anim-section-card left">
        <img src="@/assets/images/svg/Creativity.svg" alt="Icon 3" />
        <div class="hover-text">Sustainability</div>
      </div>
      <div class="anim-section-card left-bottom">
        <img src="@/assets/images/svg/Generating-new-leads.svg" alt="Image 7" />
        <div class="hover-text">Integrity</div>
      </div>
      <div class="anim-section-card bottom">
        <img src="@/assets/images/svg/Team-team.svg" alt="Icon 4" />
        <div class="hover-text">Community</div>
      </div>
      <div class="anim-section-card bottom-left">
        <img src="@/assets/images/svg/Generating-new-leads.svg" alt="Image 8" />
        <div class="hover-text">Creativity</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.anim-section {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.anim-section-card {
  position: absolute;
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eff5fe;
  color: #060606;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.anim-section-card img {
  width: 80%;
  height: 80%;
  border-radius: 50%;
}

.anim-section-card .hover-text {
  display: none;
  position: absolute;
  bottom: -30px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  white-space: nowrap;
}

.anim-section-card:hover .hover-text {
  display: block;
}

.anim-section-card:hover {
  transform: scale(1.1);
}

.anim-section-card::before {
  content: "";
  position: absolute;
  width: 2px;
  height: 50%;
  background-color: #d0dff5;
}

.top {
  top: 1%;
}

.top::before {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.top-right {
  bottom: 84%;
  right: 24%;
}

.top-right::before {
  top: 82%;
  left: 0%;
  transform: translateX(-50%) rotate(45deg);
}

.right {
  right: 26%;
}

.right::before {
  left: -50%;
  top: 50%;
  transform: translateY(-50%) rotate(90deg);
}

.right-bottom {
  top: 84%;
  right: 24%;
}

.right-bottom::before {
  right: 102%;
  bottom: 54%;
  transform: translateY(-50%) rotate(135deg);
}

.left {
  left: 26%;
}

.left::before {
  right: -50%;
  top: 50%;
  transform: translateY(-50%) rotate(90deg);
}

.left-bottom {
  top: 84%;
  left: 24%;
}

.left-bottom::before {
  left: 102%;
  bottom: 54%;
  transform: translateY(-50%) rotate(45deg);
}

.bottom {
  bottom: 0%;
}

.bottom::before {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.bottom-left {
  bottom: 84%;
  left: 24%;
}

.bottom-left::before {
  top: 82%;
  right: 0%;
  transform: translateX(-50%) rotate(135deg); /* Adjusted rotation angle */
}

/* For small laptop */
@media (max-width: 1024px) {
  .bottom-left {
    bottom: 66%;
    left: 4%;
  }
  .left-bottom {
    top: 68%;
    left: 3%;
  }
  .top-right {
    bottom: 66%;
    right: 3%;
  }
  .right-bottom {
    top: 66%;
    right: 3%;
  }
  .right {
    z-index: 999;
    right: 16%;
  }
  .left {
    z-index: 999;
    left: 16%;
  }
  .left::before {
    display: none;
  }
  .right::before {
    display: none;
  }
  .anim-section-card {
    width: 100px;
    height: 100px;
  }
}
/* For mobile only (480px and below) */
@media (max-width: 480px) {
  .bottom-left,
  .top-right,
  .bottom-left,
  .right-bottom,
  .left-bottom {
    display: none;
  }
  .top {
    top: 20%;
  }

  .bottom {
    bottom: 20%;
  }

  .right {
    right: 10%;
  }

  .left {
    left: 10%;
  }
  .padding-block-900 {
    padding-block: var(--size-500);
  }
}

/* Responsive styles */
@media (max-width: 1200px) {
  .anim-section-card {
    width: 120px;
    height: 120px;
  }

  .top {
    top: 12%;
  }

  .bottom {
    bottom: 12%;
  }

  .right {
    right: 20%;
  }

  .left {
    left: 20%;
  }
}

@media (max-width: 992px) {
  .anim-section-card {
    width: 100px;
    height: 100px;
  }

  .top {
    top: 15%;
  }

  .bottom {
    bottom: 15%;
  }

  .right {
    right: 18%;
  }

  .left {
    left: 18%;
  }
}

@media (max-width: 768px) {
  .anim-section-card {
    width: 80px;
    height: 80px;
  }

  .top {
    top: 18%;
  }

  .bottom {
    bottom: 18%;
  }

  .right {
    right: 15%;
  }

  .left {
    left: 15%;
  }
}

@media (max-width: 576px) {
}
</style>

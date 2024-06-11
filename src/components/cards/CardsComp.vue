<template>
  <section class="card-section">
    <div class="container">
      <div class="card-container">
        <div class="card-row">
          <img src="@/assets/images/svg/Team-work-amico.svg" alt="Image 1" />
          <div class="card-content | text-justify">
            <h3 class="text-center">Travail d'équipe</h3>
            <p>
              Chez VueEatery, le travail d'équipe est la clé du succès. Nous
              unissons nos forces pour offrir des expériences culinaires
              exceptionnelles à nos clients.
            </p>
            <button class="button text-center">Learn More</button>
          </div>
        </div>
        <div class="card-row">
          <img src="@/assets/images/svg/marketing.svg" alt="Image 2" />
          <div class="card-content | text-justify">
            <h3 class="text-center">SEO</h3>
            <p>
              Optimisez votre présence en ligne avec VueEatery. Notre expertise
              en SEO vous permet d'atteindre un public plus large et d'augmenter
              votre visibilité sur le web.
            </p>
            <button class="button">Learn More</button>
          </div>
        </div>
        <div class="card-row">
          <img src="@/assets/images/svg/Paid-idea.svg" alt="Image 3" />
          <div class="card-content | text-justify">
            <h3 class="text-center">Nouvelles idées</h3>
            <p>
              Innovation constante chez VueEatery. Nous sommes toujours à la
              recherche de nouvelles idées pour améliorer votre expérience
              culinaire.
            </p>
            <button class="button">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style >
.card-section {
  padding: 50px 0;
  background: linear-gradient(#ffffff, #eff5fe);
}

.card-container {
  display: flex;
  justify-content: space-between;
}

.card-row {
  width: calc(33.33% - 20px); /* Adjust card-row width as needed */
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-row img {
  width: 100%;
  height: auto;
  border-bottom: 1px solid #ddd;
  left: 10%;
  position: relative;
  width: 82%;
  height: auto;
  border-bottom: 1px solid #ddd;
}

.card-content {
  display: flex;
  padding: 34px;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 480px) {
  .card-row {
    width: 100%;
  }
  .card-container {
    display: flex;
    /* justify-content: space-between; */
    flex-direction: column;
  }
  .card-content p {
    padding: 10px;
  }
}
</style>

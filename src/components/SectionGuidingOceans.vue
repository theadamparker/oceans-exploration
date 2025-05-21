<template>
  <section>
    <div class="grid-container">
      <div class="grid-x">
        <div class="small-12 large-8 cell">
          <h2 class="h3">Guiding oceans back to health</h2>
          <p>This year a concerted push is being made to change the trajectory of ocean health.</p>
          <p>The UN Ocean Conference (UNOC3) will be hosted by France and Costa Rica in Nice, from 9-13 June with the
            theme, &ldquo;Accelerating action and mobilizing all actors to conserve and sustainably use the
            ocean&rdquo;.</p>
          <p>It will build on the results of the preceding United Nations Ocean Conferences, held in New York in 2017
            and in Lisbon in 2022, and will galvanize innovation, spark new and expanded commitments, and increase
            financing.</p>
          <p>We must close the $175 billion annual ocean finance gap. Financial instruments, including blue bonds and
            debt-for-nature swaps, and public-private partnerships are unlocking funds.</p>
          <p>Investing in oceans is not just conservation&mdash;healthy oceans contribute to climate resilience, food
            security and jobs&mdash;especially in Small Island Developing States.</p>
        </div>
      </div>
      <div class="grid-x">
        <div class="small-12 large-8 large-offset-4 cell large-text">
          <p>Investing in oceans is not just conservation—<strong>healthy oceans contribute to climate resilience, food security and jobs</strong>—especially in Small Island Developing States.</p>
        </div>
      </div>
      <div class="grid-x">
        <figure>
          <div>
            <img src="../assets/img/photo-timor.webp" alt="" />
          </div>
          <figcaption>
            <p>
              A woman farms seaweed in Timor-Leste, where ocean-based livelihoods support food security and climate resilience. As the United Nations Ocean Conference approaches, global efforts aim to boost ocean health and close the $175B financing gap.
            </p>
            <div class="credits">
              <strong>Photo:</strong> UNDP Timor-Leste
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
@use '../assets/scss/breakpoints' as bp;
section {
  background: white;
  padding: 150px 12px;
  margin: 0;
  position: relative;

  @include bp.devicebreak(medium) {
    padding: 300px 24px;
  }
}

.large-text {
  margin-top: 120px;
  margin-bottom: 120px;

  p {
    font-size: 35px;
    line-height: 1.142;
  }
}
</style>
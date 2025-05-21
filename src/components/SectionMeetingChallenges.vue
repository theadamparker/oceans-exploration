<template>
  <section>
    <div class="grid-container">
      <div class="grid-x">
        <div class="small-12 large-8 cell">
          <h2 class="h3">Meeting challenges</h2>
          <p>UNDP’s Ocean Innovation Challenge launched in 2020 and is backed by Swedish and Norwegian development agencies. It promotes investment in blue economies, sustainable fisheries and marine biodiversity. Whether it’s recycling coconut husks or extending the lives of fishing nets, successful innovators benefit from capital, mentoring and promotion.</p>
          <p>Small Island Developing States (SIDS) are among the most vulnerable to ocean exploitation. Not only to do economies depend on tourism and fishing, they are pioneering ‘whole of island’ approaches that put their connected land, water and ocean resources at the heart of economic growth.</p>
        </div>
      </div>
      <div class="grid-x">
        <div class="small-12 large-8 large-offset-4 cell large-text">
          <p><strong>SIDS lead the way</strong> in demonstrating solutions for prosperous and transformative development that embeds the true value of the ocean into policy and practice.</p>
        </div>
      </div>
      <div class="grid-x">
        <div class="small-12 large-8 cell">
          <p>Vulnerable to climate-related disasters, Honduras, Belize, Guatemala and Mexico have established repair teams to clear debris from the reefs following tropical storms. This is supported by the Mesoamerican Relief Fund, which provides financial backing for rapid response.</p>
        </div>
      </div>
      <div class="grid-x">
        <figure>
          <div>
            <img src="../assets/img/photo-comoros1.webp" alt="" />
          </div>
          <figcaption>
            <p>
              Fishermen in Comoros, where marine livelihoods depend on rich coastal waters teeming with species found nowhere else on Earth. As part of the Comoros Emerging Plan 2030, the nation is working to protect this biodiversity and become a carbon sink.
            </p>
            <div class="credits">
              <strong>Photo:</strong> UNDP Comoros
            </div>
          </figcaption>
        </figure>
      </div>
      <div class="grid-x">
        <div class="small-12 large-8 large-offset-2 cell">
          <p>Comoros’s unique ecosystems are internationally recognized as a national treasure and a vital heritage for Africa and the world. They serve to bring tourists to these tiny ‘Islands of the Moon’ and provide vital revenues for local communities.</p>
          <p>To address the growing pressures from climate change, deforestation, and unsustainable fishing, the Comorian government has made ambitious commitments through the Comoros Emerging Plan 2030. It plans to reduce greenhouse gases and increase its CO2 absorption by 2030. This ambitious ecological transition, positioning Comoros as a carbon sink, is supported by UNDP, the French Development Agency and the Global Environment Facility.</p>
          <p>In Barbados, “BlueBOT” the brainchild of inventor S. Antonio Hollingsworth is working with UNDP’s Accelerator Lab using underwater robotics, deep machine learning and artificial intelligences to gather data on the health of coral reefs and other sea life.</p>
        </div>
      </div>
      <div class="grid-x">
        <figure>
          <div>
            <img src="../assets/img/photo-comoros2.webp" alt="" />
          </div>
          <figcaption>
            <p>
              Remote monitoring of underwater footage during BlueBOT’s coral reef mapping in Barbados, part of a UNDP-supported initiative using robotics and AI to advance marine biodiversity monitoring and ocean accessibility
            </p>
            <div class="credits">
              <strong>Photo:</strong> UNDP/Jordanna Straker
            </div>
          </figcaption>
        </figure>
      </div>
      <div class="grid-x">
        <div class="small-12 large-8 large-offset-2 cell">
          <p>UNDP Indonesia has taken significant strides to address the challenge of marine debris and promote sustainable waste management. The long-term target is to meet UNEA 5.2 resolution to reduce plastic pollution to near zero in 2040 and support the government’s commitment to 70 percent plastic waste management by 2025. Between 2028 and 2022 there was a 36.35 percent reduction in marine debris. More than 18 ministries and institutions are involved and the initiative is backed by the Embassy of Norway.</p>
        </div>
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

figure {
  margin: 100px auto;
  @include bp.devicebreak(medium) {
    margin: 150px auto;
  }
}
</style>
<template>
  <section>
    <div class="grid-container">
      <div class="grid-x">
        <div class="small-12 medium-8 medium-offset-2 cell">
          <h2>A global emergency</h2>
          <p>Oceans affect us all, no matter where we live. And they are facing a global emergency at the same time as tourism, fisheries and shipping are rapidly expanding. We must ensure a just transition to a sustainable ocean economy, one that thrives within planetary boundaries. SDG14 underpins global economic development. Meeting it will alleviate poverty, promote stable economic growth and social well-being everywhere – especially in Small Island Developing States and Least Developed Countries.</p>
          <p class="h5">This year’s Oceans Conference is a valuable opportunity to build new <strong>partnerships</strong> and showcase the work—large and small—that can bring real change and <strong>safeguard oceans and economies for generations to come.</strong></p>
        </div>
        
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
@use '../assets/scss/breakpoints' as bp;
section {
  background: #008DFF;
  padding: 150px 12px;
  margin: 0;
  position: relative;
  color: white;

  @include bp.devicebreak(medium) {
    padding: 300px 24px;
  }
}
</style>
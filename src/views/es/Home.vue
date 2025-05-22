<script setup lang="ts">
import TheHeader from '../../components/TheHeader.vue';
import SectionHero from '../../components/SectionHero.vue';
import IntroOctopus from '../../components/IntroOctopus.vue';
import SectionFisheries from '../../components/SectionFisheries.vue';
import OceanCards from '../../components/OceanCards.vue';
import SectionFacts from '../../components/SectionFacts.vue';
import SectionGuidingOceans from '../../components/SectionGuidingOceans.vue';
import SectionTurningTide from '../../components/SectionTurningTide.vue';
import SectionMeetingChallenges from '../../components/SectionMeetingChallenges.vue';
import SectionEmergency from '../../components/SectionEmergency.vue';
import TheFooter from '../../components/TheFooter.vue';
import { useI18n } from 'vue-i18n';
import { onMounted } from 'vue';

const { locale } = useI18n();

// Set the locale based on the route
onMounted(() => {
  locale.value = 'es';
});
</script>

<template>
  <div>
    <TheHeader />
    <SectionHero />
    <IntroOctopus />
    <SectionFisheries />
    <OceanCards />
    <SectionFacts />
    <SectionGuidingOceans />
    <SectionTurningTide />
    <SectionMeetingChallenges />
    <SectionEmergency />
    <TheFooter />
  </div>
</template>

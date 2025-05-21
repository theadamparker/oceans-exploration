<template>
  <header class="country-header">
  <section class="header">
    <div class="grid-container fluid">
      <div class="grid-x grid-margin-x align-content-middle">
        <div class="cell small-8 large-2 shrink align-self-middle top-left">
          <a href="#" class="logo" tabindex="0" title="UNDP Logo homepage link">
            <img
              src="https://cdn.jsdelivr.net/npm/@undp/design-system/docs/images/undp-logo-white.svg"
              alt="UNDP Logo"
            />
          </a>
        </div>
        <div class="cell small-3 large-auto top-right">
          <div
            class="dropdown-language"
            data-undpds-component="language-switcher"
          >
            <button
              class="white"
              aria-label="English, Select your language"
              aria-expanded="false"
            >
              English
            </button>
            <ul role="menu">
              <li role="menuitem">
                <a href="#" lang="fr" hreflang="fr" tabindex="-1">Français</a>
              </li>
              <li role="menuitem">
                <a href="#" lang="es" hreflang="es" tabindex="-1">Español</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</header>

</template>
<style>
@import url('https://cdn.jsdelivr.net/npm/@undp/design-system/docs/css/components/country-site-header.min.css');
@import url('https://cdn.jsdelivr.net/npm/@undp/design-system/docs/css/components/language-switcher.min.css');

header {
  position: absolute;
  top: 0;
  width: 100%;
}
.country-header {
  .header {
    background-color: transparent;
    box-shadow: none;
    position: absolute;
    /* top: 0; */
  }
}
</style>
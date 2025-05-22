<template>
    <footer class="footer inverted">
      <div class="grid-x">
        <div class="cell medium-10 medium-offset-1 footer-inner">
          <div class="grid-x footer-top">
            <div class="cell medium-5">
              <div class="footer-logo inverted">
                <a href="https://www.undp.org">
                  <img src="https://cdn.jsdelivr.net/npm/@undp/design-system/docs/images/undp-logo-blue.svg" alt="UNDP Logo" />
                </a>
                <h5 class="" tabindex="0" data-viewport="false">
                  United Nations
                  <br />
                  Development Programme
                </h5>
              </div>
            </div>
            <div class="cell medium-5 show-large">
              <ul class="footer-icons inverted">
                <li><a href="#" class="facebook" title="Facebook">facebook</a></li>
                <li><a href="#" class="linkedin" title="LinkedIn">linkedIn</a></li>
                <li>
                  <a href="#" class="instagram" title="Instagram">instagram</a>
                </li>
                <li><a href="#" class="twitter-x" title="X">twitter</a></li>
                <li><a href="#" class="youtube" title="Youtube">youtube</a></li>
              </ul>
            </div>
          </div>
          <div class="grid-x footer-bottom">
            <div class="cell medium-5">
              <p tabindex="0">© United Nations Development Programme</p>
            </div>
            <div class="cell medium-6">
              <ul class="footer-lists inverted">
                <li><a href="#">Terms Of Use</a></li>
              </ul>
              <div class="show-small">
                <ul class="footer-icons inverted">
                  <li>
                    <a href="#" class="facebook" title="Facebook">facebook</a>
                  </li>
                  <li>
                    <a href="#" class="linkedin" title="LinkedIn">linkedIn</a>
                  </li>
                  <li>
                    <a href="#" class="instagram" title="Instagram">instagram</a>
                  </li>
                  <li><a href="#" class="twitter-x" title="X">twitter</a></li>
                  <li><a href="#" class="youtube" title="Youtube">youtube</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
</template>

<script setup>
import { onMounted } from 'vue';
import { initUndpComponents } from '../assets/js/undp-design-system.js';

// Initialize UNDP components when the footer mounts
onMounted(() => {
  // First load jQuery if it's not already available
  if (typeof window.jQuery === 'undefined') {
    const jqueryScript = document.createElement('script');
    jqueryScript.id = 'jquery-script';
    jqueryScript.src = 'https://code.jquery.com/jquery-3.7.1.min.js';
    jqueryScript.integrity = 'sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=';
    jqueryScript.crossOrigin = 'anonymous';
    
    jqueryScript.onload = () => {
      // Only after jQuery is loaded, load the init script
      const initScript = document.createElement('script');
      initScript.src = 'https://cdn.jsdelivr.net/npm/@undp/design-system/docs/js/init.min.js';
      initScript.onload = () => {
        // Once init script is loaded, initialize components
        if (window.UNDP_JS_INIT) {
          window.UNDP_JS_INIT.init();
        }
      };
      document.body.appendChild(initScript);
    };
    
    document.head.appendChild(jqueryScript);
  } else {
    // jQuery already exists, just load the init script
    const initScript = document.createElement('script');
    initScript.src = 'https://cdn.jsdelivr.net/npm/@undp/design-system/docs/js/init.min.js';
    initScript.onload = () => {
      // Once init script is loaded, initialize components
      if (window.UNDP_JS_INIT) {
        window.UNDP_JS_INIT.init();
      }
    };
    document.body.appendChild(initScript);
  }
});
</script>

<style>
@import url('https://cdn.jsdelivr.net/npm/@undp/design-system/docs/css/components/footer.min.css');
</style>
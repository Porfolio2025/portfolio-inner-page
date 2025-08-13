<script setup lang="ts">
import ResumeDownload from '@/components/showcase/ResumeDownload.vue'
</script>

<template>
  <div class="site-page-content">
    <ResumeDownload />

    <!-- Kettal -->
    <div class="header-container">
      <div class="header">
        <div class="header-row">
          <h1>Kettal</h1>
          <a rel="noreferrer" target="_blank" href="https://www.kettal.com/">
            <h4>www.kettal.com</h4>
          </a>
        </div>
        <div class="header-row">
          <h3>Full Stack Developer</h3>
          <b>
            <p>August 2025 - Present</p>
          </b>
        </div>
      </div>
    </div>
    <div class="text-block">
      <p>
        At Kettal, I continue developing as a Full Stack Developer, working with modern
        technologies. On the Front End, I use JavaScript, TypeScript, and Vue.js, while on the Back
        End I work with .NET, Docker, and MySQL. This role allows me to strengthen my development
        skills while contributing to high-quality projects.
      </p>
    </div>
    <hr class="separator" />
    <!-- Iquadrat -->
    <div class="header-container">
      <div class="header">
        <div class="header-row">
          <h1>Iquadrat</h1>
          <a rel="noreferrer" target="_blank" href="https://hover.gg/">
            <h4>www.iquadrat.com</h4>
          </a>
        </div>
        <div class="header-row">
          <h3>Full Stack Developer</h3>
          <b>
            <p>August 2023 - July 2025</p>
          </b>
        </div>
      </div>
    </div>
    <div class="text-block">
      <p>
        Iquadrat is a company that has helped me grow as a developer and provided me the opportunity
        to learn and work with a wide range of languages and technologies. I have developed in
        JavaScript, TypeScript, Vue.js, and DevExtreme on the Front End, and on the Back End I have
        worked with PHP, Symfony, Docker, and MySQL.
      </p>
    </div>
  </div>
</template>

<style scoped>
.header {
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}

.header-container {
  align-items: flex-end;
  width: 100%;
  justify-content: center;
}

.header-row {
  justify-content: space-between;
  align-items: flex-end;
}

.text-block {
  padding: 16px;
}

.indent {
  margin-left: 24px;
}

.row {
  display: flex;
  justify-content: space-between;
}

.hover-logo {
  height: 32px;
  margin-bottom: 16px;
}

.separator {
  border: none;
  height: 1px;
  background-color: var(--accent-color, #ccc);
  margin: 32px 0;
}
</style>

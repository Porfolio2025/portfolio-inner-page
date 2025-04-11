<script setup lang="ts">
import ResumeDownload from '@/components/showcase/ResumeDownload.vue'
</script>

<template>
  <div class="site-page-content">
    <ResumeDownload />
    <div class="header-container">
      <div class="header">
        <div class="header-row">
          <h1>Iquadrat</h1>
          <a rel="noreferrer" target="_blank" href="https://hover.gg/">
            <h4>www.iquadrat.com</h4>
          </a>
        </div>
        <div class="header-row">
          <h3>Desarrollador Full Stack</h3>
          <b>
            <p>Agosto 2023 - Actualmente</p>
          </b>
        </div>
      </div>
    </div>
    <div class="text-block">
      <p>
        Iquadrat es una empresa que me ha formado como desarrollador y me ha brindado la oportunidad
        de conocer y aprender una gran cantidad de lenguajes. He desarrollado en JavaScript,
        TypeScript, VueJs, DevExtreme en el ambito de Front End y en el ambito de Back End he
        trabajado con PHP, Symfony, Docker y MySQL.
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
</style>

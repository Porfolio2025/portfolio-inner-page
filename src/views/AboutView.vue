<template>
  <div class="site-page-content">
    <h1 style="margin-left: -16px">Bienvenido</h1>
    <h3>Soy Christian Carrasco</h3>
    <br />
    <div class="text-block">
      <p>
        Soy desarrollador Full Staclk y actualmente trabajo en Iquadrat En junio de 2023, me gradué
        de la Academia CEFP Núria con una licenciatura en Desarrollo de Apliaciones Web.
      </p>
      <br />
      <p>
        Gracias por tomarte el tiempo de visitar mi portafolio. Espero que disfrutes explorándolo
        tanto como yo disfruté creándolo. Si tienes alguna pregunta o comentario, no dudes en
        contactarme usando
        <router-link to="/contact">este formulario</router-link> o enviame un mail a
        <a href="mailto:christian@chrisdevstudio.com">christian@chrisdevstudio.com</a>
      </p>
    </div>
    <ResumeDownload />
    <div class="text-block">
      <h3>Sobre mí</h3>
      <br />
      <p>
        Desde muy joven, he sentido curiosidad por cómo funcionan las cosas. Esto me llevó
        naturalmente a obsesionarme con todo lo que tiene que ver con la iformática.
      </p>
      <br />
      <img class="h-[500px] w-[500px]" :src="me" alt="" />
      <p>
        <sub>
          <b class="">Foto 1:</b> Es una foto de mi demostrando lo que es capaz la IA de hacer a dia
          de hoy.
        </sub>
      </p>
      <br /><br />
      <p>
        Comencé a programar de manera más seria en la escuela secundaria, aprendiendo inicialmente a
        hacer web scraping e interactuar con sitios web. Luego, me dediqué a muchos proyectos
        apasionante como desarrollar un bot en la plataforma discord. He trabajado en muchos
        proyectos, incluidos chatbots, varios proyectos de web, aplicaciones y más.
        <br /><br />
        Todo esto se puede ver en
        <router-link to="/projects/">proyectos</router-link>
      </p>
      <br /><br />
      <p>
        ¡Gracias por tomarte el tiempo de leer sobre mí! Espero que disfrutes explorando el resto de
        mi portafolio y todo lo que tiene para ofrecer.
      </p>
      <br />
      <p>
        Si tienes alguna pregunta o comentario, me encantaría escucharlos. Puedes contactarme a
        través de <router-link to="/contact">contacto</router-link>
        o enviarme un correo electrónico a
        <a href="mailto:christian@chrisdevstudio.com">christian@chrisdevstudio.com</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import me from '@/assets/pictures/me.png'
import ResumeDownload from '@/components/showcase/ResumeDownload.vue'
</script>

<style scoped>
.site-page-content {
  padding: 20px;
}
.text-block {
  margin-bottom: 20px;
}
.captioned-image {
  text-align: center;
  margin-top: 20px;
}
</style>

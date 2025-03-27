<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const projectsExpanded = computed(() => route.path.includes('/projects'))
const isHome = computed(() => route.path === '/')

</script>

<template>
  <div v-if="!isHome" class="navbar">
    <div class="header">
      <h1 class="headerText">Christian</h1>
      <h1 class="headerText">Carrasco</h1>
      <h3 class="headerShowcase">Showcase '25</h3>
    </div>
    <div class="links">
      <router-link class="link" to="/">HOME</router-link>
      <router-link class="link" to="about">ABOUT</router-link>
      <router-link class="link" to="experience">EXPERIENCE</router-link>
      <router-link :class="['link', { expandedLink: projectsExpanded }]" to="projects">
        PROJECTS
      </router-link>
      <div v-if="projectsExpanded" class="insetLinks">
        <router-link class="insetLink" to="projects/software">SOFTWARE</router-link>
        <router-link class="insetLink" to="projects/music">MUSIC</router-link>
        <router-link class="insetLink" to="projects/art">ART</router-link>
      </div>
      <router-link class="link" to="contact">CONTACT</router-link>
    </div>
    <div class="spacer"></div>
  </div>
</template>

<style scoped>
.navbar {
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 48px;
  box-sizing: border-box;
  position: fixed;
  overflow: hidden;
}

.header {
  display: flex;
  flex-direction: column;
  margin-bottom: 64px;
}

.headerText {
  font-size: 38px;
  line-height: 1;
}

.headerShowcase {
  margin-top: 12px;
}

.logo {
  width: 100%;
  margin-bottom: 8px;
}

.link {
  margin-bottom: 32px;
}

.expandedLink {
  margin-bottom: 16px;
}

.insetLinks {
  display: flex;
  flex-direction: column;
  margin-left: 32px;
  margin-bottom: 16px;
}

.insetLink {
  margin-bottom: 8px;
}

.links {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
}

.image {
  width: 80%;
}

.spacer {
  flex: 1;
}

.forHireContainer {
  cursor: pointer;
  width: 100%;
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isHome = computed(() => route.path === '/')

const isActive = (path: string) => {
  return route.path === path
}
</script>

<template>
  <div v-if="!isHome" class="navbar">
    <div class="header">
      <h1 class="headerText">Christian</h1>
      <h1 class="headerText">Carrasco</h1>
      <h3 class="headerShowcase">Portfolio '25</h3>
    </div>
    <div class="links">
      <router-link :class="['link', isActive('/') && 'activeLink']" to="/">HOME</router-link>

      <router-link :class="['link', isActive('/about') && 'activeLink']" to="/about"
        >ABOUT ME</router-link
      >

      <router-link :class="['link', isActive('/experience') && 'activeLink']" to="/experience"
        >EXPERIENCE</router-link
      >

      <router-link :class="['link', isActive('/projects') && 'activeLink']" to="/projects"
        >PROJECTS</router-link
      >

      <router-link :class="['link', isActive('/contact') && 'activeLink']" to="/contact"
        >CONTACT</router-link
      >
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

.activeLink {
  font-weight: bold;
  color: #ff6f61;
  border-left: 4px solid #ff6f61;
  padding-left: 8px;
}
</style>

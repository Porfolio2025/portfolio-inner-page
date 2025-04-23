<template>
  <div
    class="bg-white p-[12px] box-border border border-2-black border-l-0 border-r-0 w-full items-center"
  >
    <img class="w-[56px] h-[48px] pr-[24px]" :src="printer" alt="" />
    <div class="flex-col">
      <h3>{{ altText || 'Estas buscando un resumen?' }}</h3>
      <a :href="resume" target="_blank" rel="noreferrer">
        <p>Haz click para descargarlo!</p>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import printer from '@/assets/resume/printer.gif'
import resume from '@/assets/resume/CV.pdf'

defineProps<{ altText?: string }>()
</script>

<style scoped>
/* Agrega estilos adicionales si es necesario */
</style>

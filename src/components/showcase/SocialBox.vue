<script setup lang="ts">
import { defineProps } from 'vue'

interface SocialBoxProps {
  link: string
  icon: string
}

const props = defineProps<SocialBoxProps>()
</script>

<template>
  <a :href="props.link" target="_blank" rel="noreferrer">
    <div class="big-button-container social w-[4px] h-[4px] items-center justify-center ml-[8px]">
      <img :src="props.icon" alt="Social Icon" class="social-image w-[36px] h-[36px]" />
    </div>
  </a>
</template>


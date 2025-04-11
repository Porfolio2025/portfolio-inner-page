<template>
  <div class="site-page-content">
    <div class="items-end justify-between">
      <h1>Contact</h1>
      <div class="mb-[16px] justify-end">
        <SocialBox :icon="ghIcon" link="https://github.com/henryjeff" />
        <SocialBox :icon="inIcon" link="https://www.linkedin.com/in/henryheffernan/" />
        <SocialBox :icon="twitterIcon" link="https://twitter.com/henryheffernan" />
      </div>
    </div>
    <div class="text-block">
      <p>
        I am currently employed, however if you have any opportunities, feel free to reach out - I
        would love to chat! You can reach me via my personal email, or fill out the form below!
      </p>
      <br />
      <p>
        <b>Email: </b>
        <a href="mailto:xhriscarrasc@gmail.com">xhriscarrasc@gmail.com</a>
      </p>
      <div class="flex-col mt-[32px]">
        <label>
          <p><span class="pr-[4px] text-[var(--red)]" v-if="!name">*</span><b>Your name:</b></p>
        </label>
        <input v-model="name" class="mt-[4px] mb-[16px]" type="text" placeholder="Name" />
        <label>
          <p><span class="pr-[4px] text-[var(--red)]" v-if="!validateEmail(email)">*</span><b>Email:</b></p>
        </label>
        <input v-model="email" class="mt-[4px] mb-[16px]" type="email" placeholder="Email" />
        <label>
          <p><b>Company (optional):</b></p>
        </label>
        <input v-model="company" class="mt-[4px] mb-[16px]" type="text" placeholder="Company" />
        <label>
          <p><span v-if="!message" class="pr-[4px] text-[var(--red)]">*</span><b>Message:</b></p>
        </label>
        <textarea v-model="message" class="mt-[4px] mb-[16px]" placeholder="Message"></textarea>
        <div class="justify-between items-center">
          <button
            class="site-button min-w-[184px] h-[32px]"
            :disabled="!isFormValid || isLoading"
            @click="submitForm"
          >
            {{ isLoading ? 'Sending' : 'Send Message' }}
          </button>
          <div class="text-right flex-col items-end pl-[24px]">
            <p :style="{ color: formMessageColor }">
              <b
                ><sub>{{
                  formMessage || 'All messages get forwarded straight to my personal email'
                }}</sub></b
              >
            </p>
            <p>
              <sub v-if="!isFormValid"><b class="pr-[4px] text-[var(--red)]">*</b> = required</sub>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

import SocialBox from '@/components/showcase/SocialBox.vue'

import twitterIcon from '@/assets/pictures/contact-twitter.png';
import ghIcon from '@/assets/pictures/contact-gh.png';
import inIcon from '@/assets/pictures/contact-in.png';

const company = ref('')
const email = ref('')
const name = ref('')
const message = ref('')
const isLoading = ref(false)
const formMessage = ref('')
const formMessageColor = ref('')

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email.toLowerCase())
}

const isFormValid = computed(
  () => validateEmail(email.value) && name.value.length > 0 && message.value.length > 0,
)

const submitForm = async () => {
  if (!isFormValid.value) {
    formMessage.value = 'Form unable to validate, please try again.'
    formMessageColor.value = 'red'
    return
  }
  try {
    isLoading.value = true
    const res = await fetch('https://api.henryheffernan.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        company: company.value,
        email: email.value,
        name: name.value,
        message: message.value,
      }),
    })
    const data = await res.json()
    if (data.success) {
      formMessage.value = `Message successfully sent. Thank you ${name.value}!`
      company.value = ''
      email.value = ''
      name.value = ''
      message.value = ''
      formMessageColor.value = 'blue'
    } else {
      formMessage.value = data.error
      formMessageColor.value = 'red'
    }
  } catch (e) {
    formMessage.value = 'There was an error sending your message. Please try again.'
    formMessageColor.value = 'red'
  } finally {
    isLoading.value = false
  }
}

watch(formMessage, (newVal) => {
  if (newVal.length > 0) {
    setTimeout(() => {
      formMessage.value = ''
      formMessageColor.value = ''
    }, 4000)
  }
})
</script>

<style scoped>
.site-button {
  min-width: 184px;
  height: 32px;
}
</style>

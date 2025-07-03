<script setup lang="ts">
import { ref, computed, watch } from 'vue'

import SocialBox from '@/components/showcase/SocialBox.vue'

// import twitterIcon from '@/assets/pictures/contact-twitter.png'
import ghIcon from '@/assets/pictures/contact-gh.png'
import inIcon from '@/assets/pictures/contact-in.png'

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
    formMessage.value = 'Por favor completa todos los campos requeridos.'
    formMessageColor.value = 'red'
    return
  }
  try {
    isLoading.value = true
    const res = await fetch('https://mailer.chrisdevstudio.com/api/contact', {
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
      formMessage.value = `Mensaje enviado correctamente! Gracias ${name.value}!`
      company.value = ''
      email.value = ''
      name.value = ''
      message.value = ''
      formMessageColor.value = 'blue'
    } else {
      formMessage.value = data.error
      formMessageColor.value = 'red'
    }
  } catch {
    formMessage.value = 'Error al enviar el mensaje, por favor intenta nuevamente.'
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

<template>
  <div class="site-page-content">
    <div class="items-end justify-between">
      <h1>Contacto</h1>
      <div class="mb-[16px] justify-end">
        <SocialBox :icon="ghIcon" link="https://github.com/xhris-spec" />
        <SocialBox :icon="inIcon" link="https://www.linkedin.com/in/christian-carrasco-aa067a267/" />
        <!-- <SocialBox :icon="twitterIcon" link="" /> -->
      </div>
    </div>
    <div class="text-block">
      <p>
        Actualmente estoy empleado, sin embargo, si tienes alguna oportunidad, no dudes en
        contactarme - ¡Me encantaría conversar! Puedes contactarme a través de mi correo personal o
        completar el formulario a continuación.
      </p>
      <br />
      <p>
        <b>Email: </b>
        <a href="mailto:christian@chrisdevstudio.com">christian@chrisdevstudio.com</a>
      </p>
      <div class="flex-col mt-[32px]">
        <label>
          <p><span class="pr-[4px] text-[var(--red)]" v-if="!name">*</span><b>Nombre:</b></p>
        </label>
        <input v-model="name" class="mt-[4px] mb-[16px]" type="text" placeholder="Nombre" />
        <label>
          <p>
            <span class="pr-[4px] text-[var(--red)]" v-if="!validateEmail(email)">*</span
            ><b>Email:</b>
          </p>
        </label>
        <input v-model="email" class="mt-[4px] mb-[16px]" type="email" placeholder="Email" />
        <label>
          <p><b>Compañia (opcional):</b></p>
        </label>
        <input v-model="company" class="mt-[4px] mb-[16px]" type="text" placeholder="Compañia" />
        <label>
          <p><span v-if="!message" class="pr-[4px] text-[var(--red)]">*</span><b>Mensaje:</b></p>
        </label>
        <textarea v-model="message" class="mt-[4px] mb-[16px]" placeholder="Mensaje"></textarea>
        <div class="justify-between items-center">
          <button
            class="site-button min-w-[184px] h-[32px]"
            :disabled="!isFormValid || isLoading"
            @click="submitForm"
          >
            {{ isLoading ? 'Enviando...' : 'Enviar mensaje' }}
          </button>
          <div class="text-right flex-col items-end pl-[24px]">
            <p :style="{ color: formMessageColor }">
              <b
                ><sub>{{
                  formMessage ||
                  'Todos los mensajes serán reenviados directamente a mi correo personal'
                }}</sub></b
              >
            </p>
            <p>
              <sub v-if="!isFormValid"><b class="pr-[4px] text-[var(--red)]">*</b> = requerido</sub>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.site-button {
  min-width: 184px;
  height: 32px;
}
</style>

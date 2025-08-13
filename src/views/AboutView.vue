<script setup lang="ts">
// import me from '@/assets/pictures/me.png'
import ResumeDownload from '@/components/showcase/ResumeDownload.vue'
</script>

<template>
  <div class="site-page-content">
    <h1 style="margin-left: -16px">Welcome</h1>
    <h3>I am Christian Carrasco</h3>
    <br />
    <div class="text-block">
      <p>
        I am a Full Stack Developer and currently work at Iquadrat. In June 2023, I graduated from
        CEFP Núria Academy with a degree in Web Application Development.
      </p>
      <br />
      <p>
        Thank you for taking the time to visit my portfolio. I hope you enjoy exploring it as much
        as I enjoyed creating it. If you have any questions or comments, feel free to contact me
        using
        <router-link to="/contact">this form</router-link> or send me an email at
        <a href="mailto:christian@chrisdevstudio.com">xhriscarrasc@gmail.com</a>
      </p>
    </div>
    <ResumeDownload />
    <div class="text-block">
      <h3>About Me</h3>
      <br />
      <p>
        From a very young age, I have been curious about how things work. This naturally led me to
        become obsessed with everything related to computers.
      </p>
      <!-- <img class="h-[500px] w-[500px]" :src="me" alt="" /> -->
      <!-- <p>
        <sub>
          <b class="">Photo 1:</b> A photo of me demonstrating what AI is capable of today.
        </sub>
      </p> -->
      <br /><br />
      <p>
        I started programming more seriously in high school, initially learning how to do web
        scraping and interact with websites. Later, I dedicated myself to many exciting projects
        such as developing a bot for the Discord platform. I have worked on many projects, including
        chatbots, various web projects, applications, and more.
        <br /><br />
        All of this can be seen in
        <router-link to="/projects/">projects</router-link>
      </p>
      <br /><br />
      <p>
        Thank you for taking the time to read about me! I hope you enjoy exploring the rest of my
        portfolio and everything it has to offer.
      </p>
      <br />
      <p>
        If you have any questions or comments, I would love to hear them. You can contact me via
        <router-link to="/contact">contact</router-link>
        or send me an email at
        <a href="mailto:christian@chrisdevstudio.com">xhriscarrasc@gmail.com</a>
      </p>
    </div>
  </div>
</template>

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

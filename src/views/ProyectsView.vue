<script setup lang="ts">
import ResumeDownload from '@/components/showcase/ResumeDownload.vue'
// import apiSymfony from '@/assets/pictures/api-symfony.png'
// import angularCli from '@/assets/pictures/angular-cli.png'
import portfolio from '@/assets/pictures/portfolio.png'
// import gitlab from '@/assets/pictures/gitlab.png'
</script>

<template>
  <div class="site-page-content">
    <h1>Projects</h1>
    <br />
    <p>Here you will find some of the projects I have been developing over the past 2 years.</p>
    <br />
    <ResumeDownload />
    <br />
    <div className="text-block">
      <h2>Portfolio - OS</h2>
      <br />
      <p>
        This portfolio was created to showcase my skills and projects in an attractive way. Designed
        as a personal presentation platform, it is divided into two sections; this first part
        reproduces the aesthetics and experience of Windows 95, giving a nostalgic and interactive
        touch to your journey through my work.
      </p>
      <br />
      <div className="captioned-image">
        <img :src="portfolio" alt="" />
        <p class="w-[80%]">
          <sub> <b>Example 1:</b> Screenshot of an app from the OS. </sub>
        </p>
      </div>
      <br />
      <h3>Links:</h3>
      <ul>
        <li>
          <a rel="noreferrer" target="_blank" href="https://portfolio-inner-page.vercel.app/">
            <p><b>[Site]:</b> - portfolio-inner-page.vercel.app/</p>
          </a>
        </li>
        <li>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://github.com/Porfolio2025/portfolio-inner-page"
          >
            <p><b>[GitHub]:</b> - OS Repository</p>
          </a>
        </li>
      </ul>
    </div>
    <div class="my-10 border border-2-black border-l-0"></div>

    <div className="text-block">
      <h2>Github CLI</h2>
      <br />
      <p>
        I developed a command-line interface (CLI) for GitHub and Git that allows me to manage
        repositories, create branches, and automate commits. The CLI is enhanced with AI, enabling
        it to generate commit messages automatically based on the changes made, streamlining the
        workflow and reducing manual effort.
      </p>
      <br />
      <div className="captioned-image">
        <!-- <img :src="gitlab" alt="" /> -->
      </div>
      <br />
      <h3>Links:</h3>
      <ul>
        <li>
          <a rel="noreferrer" target="_blank" href="https://www.npmjs.com/package/@xhris-carrasc/ghcli">
            <p><b>[Site]:</b> - npmjs.com/package/@xhris-carrasc/ghcli</p>
          </a>
        </li>
        <li>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://github.com/xhris-spec/github-cli"
          >
            <p><b>[GitHub]:</b> - Git CLI Repository</p>
          </a>
        </li>
      </ul>
    </div>
    <!-- TODO: Restart the sites -->

    <!-- <div className="text-block">
      <h2>Symfony API</h2>
      <br />
      <p>
        As the name suggests, this is a REST API developed in Symfony 5.4 that allows, via
        requests, access to a database containing all champions from the game League of
        Legends. The API incorporates an authentication and authorization system that
        facilitates management of champions and their abilities, allowing you to create,
        edit, and delete both champions and their corresponding abilities.
      </p>
      <br />
      <div className="captioned-image">
        <img :src="apiSymfony" alt="" />
        <p class="w-[80%]">
          <sub> <b>Example 1:</b> Showing the API in action. </sub>
        </p>
      </div>
      <br />
      <h3>Links:</h3>
      <ul>
        <li>
          <a rel="noreferrer" target="_blank" href="https://api-riot-2025.click/">
            <p><b>[Site]:</b> - api-riot-2025.click/</p>
          </a>
          <p>Go to "/admin" to access the admin panel.</p>
          <p>User: test</p>
          <p>Password: 1234</p>
        </li>
      </ul>
    </div>
    <div className="text-block">
      <h2>Angular API Client</h2>
      <br />
      <p>
        This is a frontend application built with Angular that consumes the above REST API to
        display all available champions. Each champion is presented with a detailed card,
        including their respective abilities. The application makes API requests in real-time
        to retrieve champion information, allowing for a clear and structured view of all data
        stored in the database.
      </p>
      <br />
      <div className="captioned-image">
        <img :src="angularCli" alt="" />
        <p class="w-[80%]">
          <sub> <b>Example 1:</b> Homepage of the app :) </sub>
        </p>
      </div>
      <br />
      <h3>Links:</h3>
      <ul>
        <li>
          <a rel="noreferrer" target="_blank" href="https://main.d38fw2i109di6m.amplifyapp.com/">
            <p><b>[Site]:</b> - Angular API Client</p>
          </a>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import ResumeDownload from '@/components/showcase/ResumeDownload.vue'
// import apiSymfony from '@/assets/pictures/api-symfony.png'
// import angularCli from '@/assets/pictures/angular-cli.png'
import portfolio from '@/assets/pictures/portfolio.png'
import gitlab from '@/assets/pictures/gitlab.png'
</script>

<template>
  <div class="site-page-content">
    <h1>Proyectos</h1>
    <br />
    <p>
      Aqui encontraras algunos de mis proyectos que he ido desarrollando a lo largo de estos 2 años.
    </p>
    <br />
    <ResumeDownload />
    <br />
    <div className="text-block">
      <h2>Portfolio - OS</h2>
      <br />
      <p>
        Este portafolio ha sido creado para exhibir de forma atractiva mis habilidades y proyectos.
        Concebido como una plataforma de presentación personal, está dividido en dos secciones; esta
        primera parte reproduce la estética y la experiencia de Windows 95, dando un toque
        nostálgico e interactivo a tu recorrido por mi trabajo.
      </p>
      <br />
      <div className="captioned-image">
        <img :src="portfolio" alt="" />
        <p class="w-[80%]">
          <sub> <b>Ejemplo 1:</b> Pantallazo de una app del OS. </sub>
        </p>
      </div>
      <br />
      <h3>Links:</h3>
      <ul>
        <li>
          <a rel="noreferrer" target="_blank" href="https://os.chrisdevstudio.com/">
            <p><b>[Site]:</b> - os.chrisdevstudio.com/</p>
          </a>
        </li>
        <li>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://github.com/Porfolio2025/portfolio-inner-page"
          >
            <p><b>[GitHub]:</b> - Repositorio OS</p>
          </a>
        </li>
      </ul>
    </div>
    <div class="my-10 border border-2-black border-l-0"></div>

    <div className="text-block">
      <h2>GitLab</h2>
      <br />
      <p>
        He creado un GitLab propio para alojar y gestionar mis proyectos personales, integrándolo en
        mi portfolio como espacio centralizado para mostrar código, documentación y progreso de
        desarrollo de cada uno.
      </p>
      <br />
      <div className="captioned-image">
        <img :src="gitlab" alt="" />
        <p class="w-[80%]">
          <sub> <b>Ejemplo 1:</b> Página de login </sub>
        </p>
      </div>
      <br />
      <h3>Links:</h3>
      <ul>
        <li>
          <a rel="noreferrer" target="_blank" href="https://git.chrisdevstudio.com/">
            <p><b>[Site]:</b> - git.chrisdevstudio.com/</p>
          </a>
        </li>

        <p>User: test</p>
        <p>Contraseña: userExternal</p>
      </ul>
    </div>
    <!-- TODO:Hay que volver a arrancar los sites -->

    <!-- <div className="text-block">
      <h2>Api Symfony</h2>
      <br />
      <p>
        Como su nombre indica, es una API REST desarrollada en Symfony 5.4 que permite, mediante
        solicitudes, acceder a una base de datos con todos los campeones del videojuego League of
        Legends. La API incorpora un sistema de autenticación y autorización que facilita la
        administración de los campeones y sus habilidades, permitiéndote crear, editar y eliminar
        tanto campeones como sus correspondientes habilidades.
      </p>
      <br />
      <div className="captioned-image">
        <img :src="apiSymfony" alt="" />
        <p class="w-[80%]">
          <sub> <b>Ejemplo 1:</b> Mostrando el funcionamiento de la API. </sub>
        </p>
      </div>
      <br />
      <h3>Links:</h3>
      <ul>
        <li>
          <a rel="noreferrer" target="_blank" href="https://api-riot-2025.click/">
            <p><b>[Site]:</b> - api-riot-2025.click/</p>
          </a>
          <p>Haz "/admin" para acceder a la administración.</p>
          <p>User: test</p>
          <p>Contraseña: 1234</p>
        </li>
      </ul>
    </div>
    <div className="text-block">
      <h2>Angular API Client</h2>
      <br />
      <p>
        Es una aplicación frontend con Angular que consume esta API REST para mostrar todos los
        campeones disponibles. Cada campeón se presenta con su ficha detallada, incluyendo sus
        habilidades correspondientes. La aplicación realiza peticiones a la API para obtener en
        tiempo real la información de los campeones, permitiendo una visualización clara y
        estructurada de todos los datos almacenados en la base de datos.
      </p>
      <br />
      <div className="captioned-image">
        <img :src="angularCli" alt="" />
        <p class="w-[80%]">
          <sub> <b>Ejemplo 1:</b> Es la home de la página :) </sub>
        </p>
      </div>
      <br />
      <h3>Links:</h3>
      <ul>
        <li>
          <a rel="noreferrer" target="_blank" href="https://main.d38fw2i109di6m.amplifyapp.com/">
            <p><b>[Site]:</b> - Angular Api Client</p>
          </a>
        </li>
      </ul>
    </div> -->
  </div>
</template>

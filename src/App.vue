<template>
  <div id="app">

    <!--<div class="box">
      <nav class="navbar navbar-dark navbar-expand-sm bg-primary justify-content-center" style="color:white">

        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="navbar-brand" to="/">MyShop</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/">Accueil</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/home">Carte</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/infos/tuto">Les bons gestes</router-link>
          </li>
        </ul>

      </nav>
    </div>-->

    <router-view/>
  </div>
</template>

<style lang="scss">

  #app {
    font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

  body{
    background-color: #E5E5E5 !important;
  }

  // Small devices (landscape phones, 576px and up)
  $small-device: 576px;
  // Medium devices (tablets, 768px and up)
  $medium-device: 768px;
  // Large devices (desktops, 992px and up)
  $large-device: 992px;
  // Extra large devices (large desktops, 1200px and up)
  $extra-large-device: 1200px;

  .box {
    margin-left: auto;
    margin-right: auto;
    background-color: white;
  }

  .bar {
    text-align: right;
    height: 50px;
  }

  .close {
    border: none;
    background-color: white;
    color: #FEAD54;
    font-size: 36px;
    margin-right: 20px;
  }

  @media (min-width: $small-device) {
  }

  @media (min-width: $medium-device) {
    .box {
      max-width: $medium-device;
    }
  }

</style>


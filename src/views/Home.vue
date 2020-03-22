<template>
  <div class="home">


    <div v-if="width < 800">
      <img alt="Vue logo" src="../assets/cats-mini.png">
    </div>
    <div v-else>
      <img alt="Vue logo" src="../assets/cats.png">
    </div>

    <HelloWorld msg="Bienvenue sur le site de prototypage"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data:function(){
    return {
      width:null,
    }
  },
  mounted() {
    this.width = window.innerWidth
    console.warn(this.width)
  }
}
</script>

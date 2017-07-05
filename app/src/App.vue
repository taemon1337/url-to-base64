<template>
  <div id="app" class='container'>
    <navbar></navbar>
    <error-messages></error-messages>
    <router-view></router-view>
  </div>
</template>

<script>
  import 'font-awesome/css/font-awesome.min.css'
  import 'bulma'
  import Navbar from '@/components/Navbar'
  import ErrorMessages from '@/components/ErrorMessages'

  export default {
    name: 'app',
    components: {
      Navbar,
      ErrorMessages
    }
  }
</script>

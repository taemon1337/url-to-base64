<template>
  <div>
    <div class='hero has-text-centered is-primary'>
      <div class='hero-body'>
        <h1 class='title'>Image Conversion Utility</h1>
        <h2 class='subtitle'>Enter URL, select size, output to base64 data-uri.</h2>
      </div>
    </div>
    <div class='columns is-multiline'>
      <div class='column is-12'>
        <image-input-form></image-input-form>
      </div>
      <div class='column is-12'>
        <image-results></image-results>
      </div>
    </div>
  </div>
</template>

<script>
  import ImageInputForm from '@/components/ImageInputForm'
  import ImageResults from '@/components/ImageResults'

  export default {
    name: 'HomePage',
    data () {
      return {}
    },
    components: {
      ImageInputForm,
      ImageResults
    }
  }
</script>

<style scoped>
  .column {
    padding: 20px;
  }
</style>

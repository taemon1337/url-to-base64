<template>
  <div class='box'>
    <form @submit.stop.prevent='convert' ref='form'>
      <div class='title'>
        <strong>Enter Image Url:</strong>
      </div>
      <div class="field has-addons">
        <p class="control">
          <input name='url' class="input" type="text" value='http://bulma.io/images/bulma-logo.png' placeholder="enter url...">
        </p>
        <p class="control">
          <button name='submit' type='submit' class="button is-primary">
            Convert
          </button>
        </p>
      </div>
      <hr>
      <div class='subtitle'>
        <strong>Conversion options</strong>
      </div>
      <div class='columns is-multiline'>
        <div class="column field">
          <label class="label">Select Size</label>
          <p class="control">
            <span class="select">
              <select name='size'>
                <option>256x256</option>
                <option>128x128</option>
                <option>64x64</option>
                <option>32x32</option>
              </select>
            </span>
          </p>
        </div>
        <div class="column field">
          <label class="label">Select File Type</label>
          <p class="control">
            <span class="select">
              <select name='format'>
                <option value='png'>PNG</option>
                <option value='jpg'>JPG</option>
              </select>
            </span>
          </p>
        </div>
        
        <div class="field is-grouped">
          <p class="control">
            <button name='cancel' @click='cancel' class="button">Cancel</button>
          </p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import { ImageTypes } from '@/store/mutation-types'
  import serializeForm from '@/lib/serializeForm'

  export default {
    name: 'ImageInputForm',
    data () {
      return {}
    },
    methods: {
      convert (e) {
        this.$store.dispatch(ImageTypes.add, serializeForm(e.target))
        e.target.reset()
      },
      cancel () {
        this.$refs.form.reset()
      }
    }
  }
</script>

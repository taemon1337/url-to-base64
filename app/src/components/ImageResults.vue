<template>
  <div v-if='images.length'>
    <p class='title'>Converted Images</p>
    <article class="media" v-for='(image, index) in images' key='index'>
      <figure v-if='image.datauri' class="media-left">
        <p :class="image.class">
          <img :src="image.datauri">
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
            <br>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
          </p>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <a class="level-item">
              <span class="icon is-small"><i class="fa fa-reply"></i></span>
            </a>
            <a class="level-item">
              <span class="icon is-small"><i class="fa fa-retweet"></i></span>
            </a>
            <a class="level-item">
              <span class="icon is-small"><i class="fa fa-heart"></i></span>
            </a>
          </div>
        </nav>
      </div>
    </article>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { ImageTypes } from '@/store/mutation-types'

  export default {
    name: 'ImageResults',
    data () {
      return {}
    },
    computed: {
      ...mapGetters({
        images: ImageTypes.all
      })
    }
  }
</script>

<template>
  <div class='container has-text-centered' style='position:absolute;top:50px;z-index:999;'>
    <div v-for='(message, idx) in messages' :key='idx' :class="message.klass || 'notification'">
      <button @click='remove(idx)' class="delete"></button>
      {{ message.title }}
      <small v-if='message.content'>{{ message.content }}</small>
    </div>
  </div>
</template>

<script>
  import { MessageTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'

  export default {
    name: 'ErrorMessage',
    data () {
      return {}
    },
    computed: {
      ...mapGetters({
        messages: MessageTypes.all
      })
    },
    methods: {
      remove (idx) {
        this.$store.dispatch(MessageTypes.remove, idx)
      }
    }
  }
</script>

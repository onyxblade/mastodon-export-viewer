<template>
  <h1>outbox</h1>
  <Entry v-for="entry in entries" :entry="entry" :folder="folder" :actor="actor"/>
</template>

<script>
import Entry from './entry.vue'

export default {
  props: ['outbox', 'entry', 'folder', 'actor'],
  components: { Entry },
  setup({ outbox, folder, actor }) {
    let entries = outbox.orderedItems.reverse()

    return {
      entries,
      folder,
      actor
    }
  }
}
</script>

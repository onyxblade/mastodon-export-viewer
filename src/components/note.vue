<template>
  <div class="status">
    <div class="status__expand"></div>
    <div class="status__info">
      <a :href="note.url" class="status__relative-time" target="_blank" rel="noopener">
        <!--<time :datetime="entry.published">{{formatDate(entry.published)}}</time>-->
      </a>
      <a target="_blank" :href="note.attributedTo" class="status__display-name">
        <div class="status__avatar">
          <img :src="note.attributedTo">
        </div>
        <span class="display-name">
          <bdi>
            <strong class="display-name__html">{{userName(note.attributedTo)}}
            </strong>
          </bdi>
          <!--<span class="display-name__account">{{entry.object.attributedTo}}</span>-->
        </span>
      </a>
    </div>
    <div class="status__content">
      <div v-if="isLink">
        <a :href="entry.object" style="color: white">{{note}}</a>
      </div>

      <div v-else>
        <div v-html="entry.object.content"></div>
        <div v-for="attachment in attachments">
          <img :src="attachment" style="max-width: 100%;">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  props: ['object', 'actor', 'published', 'note'],
  setup({ object, actor, published, note }) {
    let isLink = computed(() => {
      return (typeof note === 'string')
    })

    return {
      isLink
    }
  }
}
</script>

<style>
</style>
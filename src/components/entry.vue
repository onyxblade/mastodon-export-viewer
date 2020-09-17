<template>
  <article>
    <div>
      <div>
        <div v-if="entry.type === 'Announce'" class="status__prepend">
          <div class="status__prepend-icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style="fill: #606984; width: 18px;"><path d="M629.657 343.598L528.971 444.284c-9.373 9.372-24.568 9.372-33.941 0L394.343 343.598c-9.373-9.373-9.373-24.569 0-33.941l10.823-10.823c9.562-9.562 25.133-9.34 34.419.492L480 342.118V160H292.451a24.005 24.005 0 0 1-16.971-7.029l-16-16C244.361 121.851 255.069 96 276.451 96H520c13.255 0 24 10.745 24 24v222.118l40.416-42.792c9.285-9.831 24.856-10.054 34.419-.492l10.823 10.823c9.372 9.372 9.372 24.569-.001 33.941zm-265.138 15.431A23.999 23.999 0 0 0 347.548 352H160V169.881l40.416 42.792c9.286 9.831 24.856 10.054 34.419.491l10.822-10.822c9.373-9.373 9.373-24.569 0-33.941L144.971 67.716c-9.373-9.373-24.569-9.373-33.941 0L10.343 168.402c-9.373 9.373-9.373 24.569 0 33.941l10.822 10.822c9.562 9.562 25.133 9.34 34.419-.491L96 169.881V392c0 13.255 10.745 24 24 24h243.549c21.382 0 32.09-25.851 16.971-40.971l-16.001-16z"/></svg>
          </div>
          <span>
            <a :href="entry.actor" class="status__display-name muted">
              <bdi><strong>{{userName(entry.actor)}}</strong></bdi>
            </a> 转嘟了
          </span>
        </div>
        <div class="status">
          <div class="status__expand"></div>
          <div class="status__info">
            <a :href="entry.object.url" class="status__relative-time" target="_blank" rel="noopener">
              <time :datetime="entry.published">{{formatDate(entry.published)}}</time>
            </a>
            <a target="_blank" :href="entry.object.attributedTo" class="status__display-name">
              <div class="status__avatar">
                <img :src="avatar(entry.object.attributedTo)">
              </div>
              <span class="display-name">
                <bdi>
                  <strong class="display-name__html">{{userName(entry.object.attributedTo)}}
                  </strong>
                </bdi>
                <!--<span class="display-name__account">{{entry.object.attributedTo}}</span>-->
              </span>
            </a>
          </div>
          <div class="status__content">
            <div v-if="entry.type === 'Create'">
              <div v-html="entry.object.content"></div>
              <div v-for="attachment in attachments">
                <img :src="attachment" style="max-width: 100%;">
              </div>
            </div>
            <div v-if="entry.type === 'Announce'">
              <a :href="entry.object" style="color: white">{{entry.object}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import moment from 'moment'
import { onMounted, ref } from 'vue'

export default {
  props: ['entry', 'folder', 'actor'],
  setup({ entry, folder, actor }) {
    let attachments = ref([])

    function formatDate(dateString) {
      return moment(dateString).format('lll')
    }

    function readAsDataURL(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.onload = function() {
          resolve(reader.result)
        }
        reader.readAsDataURL(file)
      })
    }

    function userName(id) {
      if (actor.id === id) {
        return actor.name
      } else {
        return id
      }
    }

    function avatar(id) {
      if (actor.id === id) {
        return actor.avatar
      }
    }

    onMounted(() => {
      if (entry.object.attachment) {
        entry.object.attachment.map(async (a) => {
          attachments.value.push(await readAsDataURL(folder[a.url]))
        })
      }
    })

    return {
      formatDate,
      attachments,
      userName,
      avatar
    }
  }
}
</script>

<style>
a {
  color: white;
}
article {
  width: 652px;
}
.status__prepend {
  margin-left: 68px;
  color: #606984;
  padding: 8px 0 2px;
  font-size: 14px;
  position: relative;
}
.status__prepend-icon-wrapper {
  left: -26px;
  position: absolute;
}
.status__prepend>span {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
.status {
  padding: 8px 10px 8px 68px;
  position: relative;
  min-height: 54px;
  border-bottom: 1px solid #393f4f;
  cursor: default;
  opacity: 1;
  -webkit-animation: fade .15s linear;
  animation: fade .15s linear;
}
.status__expand {
  width: 68px;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  cursor: pointer;
}
.status__info {
  font-size: 15px;
}
.status__info .status__display-name {
  display: block;
  max-width: 100%;
  padding-right: 25px;
}
.status__relative-time {
  color: #606984;
  float: right;
  font-size: 14px;
}
.account__display-name strong, .status__display-name strong {
  color: #fff;
}
.display-name__html {
  font-weight: 500;
}
.display-name__account {
  font-size: 14px;
}
.status__display-name {
  color: #606984;
}
.display-name {
  display: block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.status__avatar {
  height: 48px;
  left: 10px;
  position: absolute;
  top: 10px;
  width: 48px;
}
.status__avatar img {
  max-width: 100%;
  max-height: 100%;
}
</style>
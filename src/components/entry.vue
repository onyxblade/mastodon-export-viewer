<template>
  <article>
    <div>
      <div>
        <div v-if="entry.type === 'Announce'" class="status__prepend">
          <div class="status__prepend-icon-wrapper">
            <i role="img" class="fa fa-retweet status__prepend-icon fa-fw"></i>
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
                <img :src="attachment">
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
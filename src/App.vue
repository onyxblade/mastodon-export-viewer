<template>
  <input type="file" @input="loadFolder" webkitdirectory style="height: 100px; border: 1px solid #fff;"/>
  <Outbox v-if="outbox" :outbox="outbox" :actor="actor" :folder="folder"/>
</template>

<script>
import { shallowRef, onMounted } from 'vue'
import Outbox from './components/outbox.vue'
import loadData from './loadData'

export default {
  name: 'App',
  components: {
    Outbox
  },
  setup() {
    let actor = shallowRef(null)
    let outbox = shallowRef(null)
    let folder = shallowRef(null)

    /*onMounted(async () => {
      let [actorData, outboxData] = await loadData('archive')
      actor.value = actorData
      outbox.value = outboxData
    })*/

    async function loadFolder(e) {
      let files = Array.from(e.target.files)
      let dir = {}
      files.map(f => {
        let path = '/' + f.webkitRelativePath.split('/').slice(1).join('/')
        dir[path] = f
      })

      folder.value = dir
      actor.value = JSON.parse(await readAsText(dir['/actor.json']))
      actor.value.avatar = await readAsDataURL(dir['/avatar.jpeg'])
      outbox.value = JSON.parse(await readAsText(dir['/outbox.json']))
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

    function readAsText(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.onload = function() {
          resolve(reader.result)
        }
        reader.readAsText(file)
      })
    }

    return {
      loadFolder,
      actor,
      outbox,
      folder
    }
  }
}
</script>

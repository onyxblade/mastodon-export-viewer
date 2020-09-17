<template>
  <div v-if="!loaded" class="upload">
    <label for="file">Drop folder here to load data</label>
    <input type="file" id="file" @input="loadFolder" webkitdirectory/>
  </div>
  <Outbox v-if="outbox" :outbox="outbox" :actor="actor" :folder="folder"/>
</template>

<script>
import { ref, shallowRef, onMounted } from 'vue'
import Outbox from './components/outbox.vue'
import { readAsDataURL, readAsText } from './file-reader'
export default {
  name: 'App',
  components: {
    Outbox
  },
  setup() {
    let actor = shallowRef(null)
    let outbox = shallowRef(null)
    let folder = shallowRef(null)
    let loaded = ref(false)

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
      loaded.value = true
    }

    return {
      loadFolder,
      actor,
      outbox,
      folder,
      loaded
    }
  }
}
</script>

<style>
.upload {
  border: 3px dashed #fff;
  border-radius: 5px;
  padding: 100px;
  position: relative;
  text-align: center;
  margin-top: 50px;
}
.upload input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>

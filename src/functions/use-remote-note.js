import { ref, shallowRef, onMounted } from 'vue'

export default function useRemoteNote(url) {
  let fetched = ref(false)
  let note = shallowRef({

  })

  onMounted(async () => {
    let res = await fetch(url, {
      headers: {
        'Accept': 'application/ld+json'
      }
    })

    let json = await res.json()

    note.value = json
    fetched.value = true
    console.log(note.value)
  })

  return {
    fetched,
    note
  }
}
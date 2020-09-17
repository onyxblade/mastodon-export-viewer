export function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.onload = function() {
      resolve(reader.result)
    }
    reader.readAsDataURL(file)
  })
}

export function readAsText(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.onload = function() {
      resolve(reader.result)
    }
    reader.readAsText(file)
  })
}
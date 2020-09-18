const { build } = require('vite')

;(async () => {
  // All options are optional.
  // check out `src/node/build/index.ts` for full options interface.
  const result = await build({
    base: '',
    assetsDir: 'assets'
  })
})()
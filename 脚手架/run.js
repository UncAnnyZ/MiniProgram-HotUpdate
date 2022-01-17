const fs = require('fs')

fs.readFile('dist/index.js', (err, buffer) => {
  let str1= buffer.toString()
  let str = `
  const app = getApp()

  var onload = app.jsRun('', \`${str1}\`)
  console.log(onload())
  Page(onload())
`
  fs.writeFile('../pages/index/index.js', str, {
    encoding: 'utf8'
  }, err => {})
})
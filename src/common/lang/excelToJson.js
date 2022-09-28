var node_xj = require('xls-to-json')
node_xj({

  input: 'lang-excle.xlsx',
  output: 'lang-jason.json'
}, function (err, result) {
  if (err) {
    console.error(err)
  } else {
    console.log(result)
  }
})

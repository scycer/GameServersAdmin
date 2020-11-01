// Node App to handle queries about the VM running the actual game server processes

const express = require('express')
const app = express()
const port = 4000

app.get('/healthcheck', (req, res) => {
  res.send({status: "Running"})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
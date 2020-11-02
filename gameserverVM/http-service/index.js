// Node App to handle queries about the VM running the actual game server processes

const express = require('express')
const app = express()
const port = 4000

// Log all reqs
app.use((req, res, next) => {
  console.log(`Request: ${req.url}`)
  next()
} )


app.get('/healthcheck', (req, res) => {
  res.send({status: "Running"})
})

// Log all unhandled route reqs
app.use((req, res, next) => {
  console.error(`Not a route - Request: ${req.url}`)
  next()
} )


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
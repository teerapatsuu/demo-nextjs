const express = require('express')
const bodyParser = require('body-parser')
const next = require('next')

const Store = require('./store')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

const store = new Store()

app
  .prepare()
  .then(() => {
    const server = express()
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: true }))

    server.get('/api/menus', (req, res) => {
      return res.send(store.getMenuList(req))
    })

    server.get('/api/menu/:id', (req, res) => {
      const id = req.params.id
      return res.send(store.getMenu(id))
    })

    server.post('/api/calc', (req, res) => {
      const entity = req.body
      return res.send(String(store.calcMenu(entity)))
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://${hostname}:${port}`)
    })
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })

const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
const router = express.Router()
const port = 3001

router
  .get('/getUserAmount', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    // code key is always required
    const { code } = req.query
    if (!code) {
      res.status(400).json({ error: 'a code is required' })
    }

    /* override this var.
      The endpoint must return JSON with the following structure:
        { amount: float }
    */
    let response = { amount: '20.00' }

    // implement your specific logic here

    res.send(JSON.stringify(response))
  })

app
  .use(express.json())
  .use(cors())
  // the static site to get the user code, we serve it from the 'dist' directory previously built by client.
  .use(express.static(path.resolve(__dirname + '/dist/public')))
  .use(router)
  .listen(port, () => {
    console.log(`H4B-connected-link API listening at http://localhost:${port}`)
  })

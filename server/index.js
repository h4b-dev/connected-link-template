const express = require('express')
const cors = require('cors')

const app = express()
const router = express.Router()
const port = 3000

app
  .use(express.json())
  .use(cors())

router
  .get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    // code key is always required
    const { code } = req.body
    if (!code) {
      throw Error ('a code is required')
    }

    /* override this var.
      The endpoint must return JSON with the following structure:
        { amount: float }
    */
    let response = { amount: '0.00' }

    // implement your specific logic here

    res.send(JSON.stringify(response))
  })
  .listen(port, () => {
    console.log(`H4B-connected-link API listening at http://localhost:${port}`)
  })

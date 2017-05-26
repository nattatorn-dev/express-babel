import axios from 'axios'
import striptags from 'striptags'
var URL = require('url-parse')
import { Router } from 'express'

const routes = Router()

/**
 * GET home page
 */
routes.get('/', (req, res) => {
  res.render('index', { title: 'Express Babel' })
})

/**
 * GET /list
 *
 * This is a sample route demonstrating
 * a simple approach to error handling and testing
 * the global error handler. You most certainly want to
 * create different/better error handlers depending on
 * your use case.
 */
routes.get('/list', (req, res, next) => {
  const { title } = req.query

  if (title == null || title === '') {
    // You probably want to set the response HTTP status to 400 Bad Request
    // or 422 Unprocessable Entity instead of the default 500 of
    // the global error handler (e.g check out https://github.com/kbariotis/throw.js).
    // This is just for demo purposes.
    next(new Error('The "title" parameter is required'))
    return
  }

  res.render('index', { title })
})

routes.get('/googledrive', (req, res, next) => {
  const { url } = req.query

  if (!url) {
    next(new Error('The "url" parameter is required'))
    return
  }
  axios
    .get(url)
    .then(function(response) {
      const html = response
      console.log('html', html.data.split('fmt_stream_map')[1])
      const url = new URL(
        `https://r11---sn-30a7dn7s.c.drive.google.com/videoplayback?id\u003d0dc6bf77438d3802\u0026itag\u003d18\u0026source\u003dwebdrive\u0026requiressl\u003dyes\u0026ttl\u003dtransient\u0026mm\u003d30\u0026mn\u003dsn-30a7dn7s\u0026ms\u003dnxu\u0026mv\u003dm\u0026pl\u003d24\u0026sc\u003dyes\u0026ei\u003daisoWdSJNs2TqwXMmbC4Dg\u0026driveid\u003d0B1ik1ZZAsFh4TlQ5SmR0SHhDMzQ\u0026mime\u003dvideo/mp4\u0026lmt\u003d1495719381269321\u0026mt\u003d1495804714\u0026ip\u003d1.179.240.60\u0026ipbits\u003d0\u0026expire\u003d1495819178\u0026cp\u003dQVJOV0lfWFFVSVhNOmpwYks2UG1aazZ4\u0026sparams\u003dip%2Cipbits%2Cexpire%2Cid%2Citag%2Csource%2Crequiressl%2Cttl%2Cmm%2Cmn%2Cms%2Cmv%2Cpl%2Csc%2Cei%2Cdriveid%2Cmime%2Clmt%2Ccp\u0026signature\u003d868F0FD9D21F2FAB469C732666D06BF6FBF9FCB5.36D7A0D64BB7C864D33C602805FD59764A7FCE87\u0026key\u003dck2\u0026app\u003dtexmex`
      )
      res.json(url)
    })
    .catch(function(err) {
      res.json('error ')
    })
})

export default routes

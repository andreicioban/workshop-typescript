
import { App } from './config/express'
import * as dotenv from 'dotenv'

const conf = dotenv.config({ path: `.env/${process.argv[2]}` })

const app = new App(conf)

app.init()
app.initRoutes()
app.startServer()

module.exports = app
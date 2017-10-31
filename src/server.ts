
import * as dotenv from 'dotenv'
import { App } from './config/express'
import { FireBaseAdmin } from './config/firebase'
import { UserAPI } from './api/UserRoutes'

const conf: any = dotenv.config({ path: `.env/${process.argv[2]}` }).parsed

const app = new App(conf)
const admin = new FireBaseAdmin(conf.FIREBASE_KEY_LOCATION)

app.init()
app.initRoutes()
UserAPI.init(app.app, admin)
app.startServer()

module.exports = app
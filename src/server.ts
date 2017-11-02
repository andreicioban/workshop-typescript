
import * as dotenv from 'dotenv'
import { App } from './config/express'
import { FireBaseAdmin } from './firebase/admin'
import { UserAPI } from './api/UserRoutes'
import { PokemonAPI } from './api/PokemonRoutes'

const conf: any = dotenv.config({ path: `.env/${process.argv[2]}` }).parsed

const app = new App(conf)
const firebaseAdmin = new FireBaseAdmin(conf.FIREBASE_KEY_LOCATION)

app.init()
app.allowCORS()
app.initRoutes()
UserAPI.init(app.app, firebaseAdmin)
PokemonAPI.init(app.app,firebaseAdmin)
app.startServer()

module.exports = app
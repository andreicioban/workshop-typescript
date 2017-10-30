import * as admin from 'firebase-admin'
import * as fs from 'fs'
import * as path from 'path'

export class FireBaseAdmin {
    private accountKeyLocation: string
    private serviceAccount: any
    private app: admin.app.App

    constructor(keyLocation: string) {
        this.accountKeyLocation = keyLocation
        this.serviceAccount = JSON.parse(fs.readFileSync(path.join(__dirname, `../../${keyLocation}`)).toString())

        this.app = admin.initializeApp({
            credential: admin.credential.cert(this.serviceAccount),
            databaseURL: `https://${this.serviceAccount.project_id}.firebaseio.com`
        });
    }
}
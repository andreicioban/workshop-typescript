import * as admin from 'firebase-admin'
import * as fs from 'fs'
import * as path from 'path'
import { User } from '../models/user'

export class FireBaseAdmin {
    private accountKeyLocation: string
    private serviceAccount: any
    private firebase: admin.app.App

    constructor(keyLocation: string) {
        this.accountKeyLocation = keyLocation
        this.serviceAccount = JSON.parse(fs.readFileSync(path.join(__dirname, `../../${keyLocation}`)).toString())

        this.firebase = admin.initializeApp({
            credential: admin.credential.cert(this.serviceAccount),
            databaseURL: `https://${this.serviceAccount.project_id}.firebaseio.com`
        });
    }
    public addUser(user: User): Promise<admin.auth.UserRecord> {
        const newUserPromise = this.firebase.auth().createUser(user)
        newUserPromise.then((userRecord) => {
            console.log("Successfully created new user:", userRecord);
        })
        .catch((error) => {
            console.log("Error creating new user:", error);
        })
        return newUserPromise
    }
}
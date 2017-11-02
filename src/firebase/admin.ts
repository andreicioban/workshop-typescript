import * as admin from 'firebase-admin'
import * as fs from 'fs'
import * as path from 'path'
import { UserActions } from './UserActions'
import { PokemonActions } from './PokemonActions'

export class FireBaseAdmin {
    private accountKeyLocation: string
    private serviceAccount: any
    private firebase: admin.app.App
    public userActions: UserActions
    public pokemonActions: PokemonActions

    constructor(keyLocation: string) {
        this.accountKeyLocation = keyLocation
        this.serviceAccount = JSON.parse(fs.readFileSync(path.join(__dirname, `../../${keyLocation}`)).toString())

        this.firebase = admin.initializeApp({
            credential: admin.credential.cert(this.serviceAccount),
            databaseURL: `https://${this.serviceAccount.project_id}.firebaseio.com`
        });
        this.userActions = new UserActions(this.firebase)
        this.pokemonActions = new PokemonActions(this.firebase)
    }
    
}
import * as admin from 'firebase-admin'
import { Pokemon } from '../models/pokemon'

export class PokemonActions {
    private firebase: admin.app.App
    private dbRef: admin.database.Reference
    constructor(firebase: admin.app.App) {
        this.firebase = firebase
        this.dbRef = firebase.database().ref('workshop-typescript').child('pokemons')
    }
    public getAll(): Promise<Pokemon[]> {
        return new Promise<Pokemon[]>((resolve: (value: Pokemon[]) => void, reject: (err: any) => void) => {
            this.dbRef.once('value', (snap) => {
                resolve(snap.val())
            })
        })
    }
    public getOne(id: string): Promise<Pokemon> {
        return new Promise<Pokemon>((resolve: (value: Pokemon) => void, reject: (err: any) => void) => {
            this.dbRef.child(id).once('value', (snap) => {
                resolve(snap.val())
            })
        })
    }
    public addPokemon(pok: Pokemon): Promise<admin.database.Reference> {
        return this.dbRef.push(pok)
    }
    public updatePokemon(id: string, pok: Pokemon): Promise<void> {
        return this.dbRef.child(id).update(pok)
    }
    public deletePokemon(id: string): Promise<void> {
        return this.dbRef.child(id).remove()
    }
}

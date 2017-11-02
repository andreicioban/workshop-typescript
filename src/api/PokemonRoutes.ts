import { Express, Request, Response } from 'express'
import { FireBaseAdmin } from '../firebase/admin'
import { Pokemon } from '../models/pokemon'

export namespace PokemonAPI {
    export function init(app: Express, firebase: FireBaseAdmin) {
        const route = '/api/pokemon'
        app.get(`${route}s`, (req: Request, res: Response) => {
            firebase.pokemonActions.getAll().then((pokemons: Pokemon[]) => {
                res.send({success: true, pokemons: pokemons})
            }).catch((err) => { res.send(err) })
        })

        app.get(`${route}/:pokemonId`, (req: Request, res: Response) => {
            firebase.pokemonActions.getOne(req.params.pokemonId).then((pokemon: Pokemon) => {
                res.send({success: true, pokemon: pokemon})
            }).catch((err) => { res.send(err) })
        })

        app.put(`${route}/:pokemonId`, (req: Request, res: Response) => {
            firebase.pokemonActions.updatePokemon(req.params.pokemonId, req.body).then(() => {
                res.send({ success: true})
            }).catch((err) => { res.send(err) })
        })

        app.post(route, (req: Request, res: Response) => {
            firebase.pokemonActions.addPokemon(req.body).then((pokemonRef) => {
                res.send({ success: true, pokemon: pokemonRef.toJSON() })
            }).catch((err) => { res.send(err) })
        })

        app.delete(`${route}/:pokemonId`, (req: Request, res: Response) => {
            firebase.pokemonActions.deletePokemon(req.params.pokemonId).then(() => {
                res.send({ success: true })
            }).catch((err) => { res.send(err) })
        })
    }
}
import { Express, Request, Response } from 'express'
import { FireBaseAdmin } from '../firebase/admin'
import { Pokemon } from '../models/pokemon'
import { fireBaseAuth } from '../security/firebaseAuth'
import { AuthRequest } from '../security/AuthRequest'

export namespace PokemonAPI {
    export function init(app: Express, firebase: FireBaseAdmin) {
        const route = '/api/pokemon'
        const authMiddleware = fireBaseAuth(firebase)
        
        app.get(`${route}s`, authMiddleware, (req: AuthRequest, res: Response) => {
            firebase.pokemonActions.getAll(req.user.user_id).then((pokemons: Pokemon[]) => {
                res.send({success: true, pokemons: pokemons})
            }).catch((err) => { res.send(err) })
        })

        app.get(`${route}/:pokemonId`, authMiddleware, (req: AuthRequest, res: Response) => {
            firebase.pokemonActions.getOne(req.user.user_id, req.params.pokemonId).then((pokemon: Pokemon) => {
                pokemon.id = req.params.pokemonId
                res.send({success: true, pokemon: pokemon})
            }).catch((err) => { res.send(err) })
        })

        app.put(`${route}/:pokemonId`, authMiddleware, (req: AuthRequest, res: Response) => {
            firebase.pokemonActions.updatePokemon(req.user.user_id, req.params.pokemonId, req.body).then(() => {
                res.send({ success: true})
            }).catch((err) => { res.send(err) })
        })

        app.post(route, authMiddleware, (req: AuthRequest, res: Response) => {
            firebase.pokemonActions.addPokemon(req.user.user_id, req.body).then((pokemonRef) => {
                res.send({ success: true, pokemon: pokemonRef.toJSON() })
            }).catch((err) => { res.send(err) })
        })

        app.delete(`${route}/:pokemonId`, authMiddleware, (req: AuthRequest, res: Response) => {
            firebase.pokemonActions.deletePokemon(req.user.user_id, req.params.pokemonId).then(() => {
                res.send({ success: true })
            }).catch((err) => { res.send(err) })
        })
    }
}
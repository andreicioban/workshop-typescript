import { Express, Request, Response } from 'express'
import { FireBaseAdmin } from '../firebase/admin'
import { User } from '../models/user'

export namespace UserAPI {
    export function init(app: Express, firebase: FireBaseAdmin) {
        app.get('/api/user', (req: Request, res: Response) => {
            if(req.query.email){
                const newUser = new User('andreic', req.query.email, 'Admin123')
                firebase.userActions.addUser(newUser).then((usr) => {
                    res.send(usr)
                }).catch((err) => { res.send(err) })
            } else {
                res.status(400).send({error: 'please provide an email'})
            }
        })

        app.get('/api/users', (req: Request, res: Response) => {
            firebase.userActions.getAllUsers(req.query.perPage).then((users) => {
                res.send(users)
            }).catch((err) => { res.send(err) })
        })

        app.get('/api/token', (req: Request, res: Response) => {
            if(req.query.firebaseToken){
                firebase.userActions.isAuthenticated(req.query.firebaseToken).then((usr) => {
                    res.send(usr)
                }).catch((err) => { res.send(err) })
            } else {
                res.status(400).send({error: 'please provide an valid token'})
            }
        })
    }
}
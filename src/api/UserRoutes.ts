import { Express, Request, Response } from 'express'
import { FireBaseAdmin } from '../config/firebase'
import { User } from '../models/user'

export namespace UserAPI {
    export function init(app: Express, firebase: FireBaseAdmin) {
        app.get('/api/user', (req: Request, res: Response) => {
            if(req.query.email){
                const newUser = new User('andreic', req.query.email, 'Admin123')
                firebase.addUser(newUser).then((usr) => {
                    res.send(usr)
                }).catch((err) => { res.send(err) })
            } else {
                res.status(400).send({error: 'please provide an email'})
            }
        })
    }
}
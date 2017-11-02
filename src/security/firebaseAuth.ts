import {NextFunction, Request, Response} from 'express'
import { FireBaseAdmin } from '../firebase/admin'
import { AuthRequest } from './AuthRequest'

export let fireBaseAuth = (firebase: FireBaseAdmin) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        const authToken = req.headers['x-auth'] || req.query['x-auth']
        if (authToken) {
            firebase.userActions.decodeToken(authToken).then((user) => {
                req.user = user
                next()
            }).catch((err: Error) => { res.send({status: 401, message: err.message}) })
      } else {
        res.send({status: 401, message: 'Forbidden'})
      }
    };
}
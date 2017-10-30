import {NextFunction, Request, Response} from 'express'

export let authMid = (req: Request, res: Response, next: NextFunction) => {
  // After successful login, redirect back to the intended page
  if (req.headers && 
    (req.headers['auth'] || req.query['auth']) === 'verySecretToken') {
    next();
  } else {
    res.send({status: 401, message: 'Forbidden'})
  }
};
import * as express from "express"
import { Request, Response, Express } from 'express'
import * as bodyParser from 'body-parser'
import { authMid } from '../security/auth'
import * as logger from "morgan";

export class App {
    private config: any
    public app: Express

    constructor (config: object) {
        this.config = config
        this.app = express()
    }
    
    public init(): void {
        this.app.set("port", this.config.PORT || process.env.PORT || 3000)
        
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: true }))
        
        this.app.use(logger('dev'))
    }
    public allowCORS(): void {
        this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth");
            next();
         });
    }

    public initRoutes(): void {
        this.app.get('/', function (req: Request, res: Response) {
            res.send({serviceStatus: 'working'})
        });
        this.app.get("/api", authMid, (req: Request, res: Response) => {
            res.send({verySecretInfo: 'such secret'});
        })
    }

    public startServer(): void {
        this.app.listen(this.app.get("port"), () => {
            console.log((`App is running at http://localhost:${this.app.get("port")} in ${this.app.get("env")} mode`));
        });
    }
}
import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as expressValidator from 'express-validator';

import { Request, Router } from 'express';

import { Context } from './services';

class Server {
    public app: express.Application;
    private context: Context;

    public constructor() {
        dotenv.config({path: '.env'});

        this.app = express();

        this.context = new Context();

        this.config();
        this.routes();
    }

    public config(): void {
        this.app.set('port', process.env.APP_PORT || 3000);

        this.app.use(bodyParser.json());
        this.app.use((error: any, request: Request, response: express.Response, next: any) => {
            if (error !== null) {
                return response.json({'error': 'Invalid JSON'});
            }
            return next();
        });

        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(expressValidator());

        this.app.listen(this.app.get('port'), () => {
            console.log(('App is running at http://localhost:%d'), this.app.get('port'));
            console.log('Press CTRL-C to stop\n');
        });
    }

    public routes(): void {
        const router = express.Router();

        this.app.use('/', router);
        this.app.use('/users/', this.context.userRouter.router);
    }
}

export default new Server().app;
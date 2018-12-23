import * as express from 'express';
import * as dotenv from 'dotenv';
import { Request, Router } from 'express';

class Server {
    public app: express.Application;

    public constructor() {
        dotenv.config({path: '.env'});

        this.app = express();

        this.config();
        this.routes();
    }

    public config(): void {
        this.app.set('port', process.env.APP_PORT || 3000);

        this.app.listen(this.app.get('port'), () => {
            console.log(('App is running at http://localhost:%d'), this.app.get('port'));
            console.log('Press CTRL-C to stop\n');
        });
    }

    public routes(): void {
        const router = express.Router();

        this.app.use('/', router);
    }
}

export default new Server().app;
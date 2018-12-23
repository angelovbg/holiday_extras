import * as express from 'express';

class Server {
    public app: express.Application;

    public constructor() {
        this.app = express();

        this.config();
    }

    public config(): void {
        this.app.set('port', 3000);

        this.app.listen(this.app.get('port'), () => {
            console.log(('App is running at http://localhost:%d'), this.app.get('port'));
            console.log('Press CTRL-C to stop\n');
        });
    }
}

export default new Server().app;
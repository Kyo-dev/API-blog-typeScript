import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import mongoose from 'mongoose'
import compression from 'compression'
import cors from 'cors'

import index_routes from './routes/index_routes'
import post_routes from './routes/post_routes'

class Server {
    public app: express.Application;
    constructor(){
        this.app = express();
        this.setting();
        this.routes();
    }
    setting(){
        // MONGODB
        const MONGO_URI = 'mongodb://localhost/restapits01';
        mongoose.set('useFindAndModify', true)
        mongoose.connect(MONGO_URI || process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useCreateIndex: true
        })
            .then(db=> console.log('MongoDB is conect!'));
        this.app.set('port', process.env.port || 4000);
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    }
    routes(){
        this.app.use(index_routes)
        this.app.use('/api/post',post_routes)
    }
    start(){
        this.app.listen(this.app.get('port'), ()=> {
            console.log(`Server on port ${this.app.get('port')}`)
        })
    }
}
const server = new Server();
server.start();

import {Router, Request, Response} from 'express';

class IndexRoutes {
    public router: Router;
    constructor(){
        this.router = Router();
        this.routes();
    }
    routes(){
        this.router.get('/', (req, res) => res.send('Hello sekai'))
    }
}

const indexRoutes = new IndexRoutes();
indexRoutes.routes();

export default indexRoutes.router
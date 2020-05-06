import {Router, Request, Response} from 'express'
import Post from '../models/post'
import { promises } from 'dns';
class PostRoutes{

    router: Router;

    constructor(){
        this.router = Router(); 
        this.routes();
    }
    public async getOne(req: Request, res:Response):Promise<void>{
        const onePost = await Post.findOne({url: req.params.url})
        res.json(onePost)
    }
    public async getAll(req: Request, res: Response):Promise<void>{
         const posts = await Post.find();
         res.json(posts)
    }
    public async makePost(req: Request, res: Response):Promise<void>{
        const {title, url, content, image} = req.body
        const newPost = new Post({title, url, content, image})
        await newPost.save()
    }
    public async updatePost(req:Request, res:Response):Promise<void>{
        const {url} = req.params;
        const post = await Post.findOneAndUpdate({url}, req.body, {new:true});
        res.json(post)
    }
    public async removePost(req:Request, res:Response):Promise<void>{
        const {url} = req.params;
        await Post.findOneAndDelete({url});      
        res.json({message: "Deleted"})
    }

    routes(){
        this.router.get('/', this.getAll)
        this.router.get('/:url', this.getOne)
        this.router.post('/', this.makePost)
        this.router.put('/:url', this.updatePost)
        this.router.delete('/:url', this.removePost)
    }
}
const postRoutes = new PostRoutes
export default postRoutes.router;
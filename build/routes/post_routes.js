"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_1 = __importDefault(require("../models/post"));
class PostRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const onePost = yield post_1.default.findOne({ url: req.params.url });
            res.json(onePost);
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield post_1.default.find();
            res.json(posts);
        });
    }
    makePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, url, content, image } = req.body;
            const newPost = new post_1.default({ title, url, content, image });
            yield newPost.save();
        });
    }
    updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url } = req.params;
            const post = yield post_1.default.findOneAndUpdate({ url }, req.body, { new: true });
            res.json(post);
        });
    }
    removePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url } = req.params;
            yield post_1.default.findOneAndDelete({ url });
            res.json({ message: "Deleted" });
        });
    }
    routes() {
        this.router.get('/', this.getAll);
        this.router.get('/:url', this.getOne);
        this.router.post('/', this.makePost);
        this.router.put('/:url', this.updatePost);
        this.router.delete('/:url', this.removePost);
    }
}
const postRoutes = new PostRoutes;
exports.default = postRoutes.router;

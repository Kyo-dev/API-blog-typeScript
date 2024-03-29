"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true, unique: true, lowercase: true },
    content: { type: String, required: true },
    image: String,
    createAt: { type: Date, default: Date.now() },
    upDateAt: Date
});
exports.default = mongoose_1.model('Post', postSchema);

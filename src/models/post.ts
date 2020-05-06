import {Schema, model} from 'mongoose'

const postSchema = new Schema({
    title: {type: String, required: true},
    url: {type: String, required: true, unique: true, lowercase: true},
    content: {type: String, required: true},
    image: String,
    createAt: {type: Date, default: Date.now()},
    upDateAt: Date
})
export default model('Post',postSchema)

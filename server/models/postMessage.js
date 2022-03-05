import mongoose from 'mongoose';

//create mongoose schema
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],         //an array of ids
        default: []             //have to type it this way bc we wanna set a default value
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

//after creating schema, we now create a model
const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;

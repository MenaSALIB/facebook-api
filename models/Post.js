import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    auteur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    contenu: { type: String, required: true }
}, { timestamps: true });

const postSchema = new mongoose.Schema({
    auteur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    contenu: { type: String, required: true },
    image: String,
    groupeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', default: null },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    commentaires: [commentSchema]
}, { timestamps: true });

export default mongoose.model('Post', postSchema);
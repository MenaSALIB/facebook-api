import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: '' },
    amis: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export default mongoose.model('User', userSchema);
import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    description: String,
    icone: String,
    photoCouverture: String,
    type: { type: String, enum: ['public', 'prive', 'secret'], default: 'public' },
    membresCanPost: { type: Boolean, default: true },
    membresCanCreateEvents: { type: Boolean, default: true },
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    membres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export default mongoose.model('Group', groupSchema);
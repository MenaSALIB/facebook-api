import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    description: String,
    dateDebut: { type: Date, required: true },
    dateFin: { type: Date, required: true },
    lieu: { type: String, required: true },
    photoCouverture: String,
    isPrivate: { type: Boolean, default: false },
    organisateurs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    groupeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' }
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
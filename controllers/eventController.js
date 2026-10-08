import Event from '../models/Event.js';

export const createEvent = async (req, res) => {
    try {
        const { nom, description, dateDebut, dateFin, lieu, photoCouverture, isPrivate, groupeId } = req.body;

        const newEvent = new Event({
            nom,
            description,
            dateDebut,
            dateFin,
            lieu,
            photoCouverture,
            isPrivate,
            groupeId: groupeId || null,
            organisateurs: [req.user.id],
            participants: [req.user.id]
        });

        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .populate('organisateurs', 'nom prenom email')
            .populate('groupeId', 'nom');
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
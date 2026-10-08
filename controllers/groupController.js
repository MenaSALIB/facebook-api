import Group from '../models/Group.js';

// Créer un groupe
export const createGroup = async (req, res) => {
    try {
        const { nom, description, icone, photoCouverture, type } = req.body;

        const newGroup = new Group({
            nom,
            description,
            icone,
            photoCouverture,
            type,
            admins: [req.user.id],
            membres: [req.user.id]
        });

        await newGroup.save();
        res.status(201).json(newGroup);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtenir tous les groupes
export const getGroups = async (req, res) => {
    try {
        const groups = await Group.find().populate('admins', 'nom prenom email');
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Rejoindre un groupe
export const joinGroup = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) return res.status(404).json({ message: 'Groupe non trouvé.' });

        if (group.membres.includes(req.user.id)) {
            return res.status(400).json({ message: 'Déjà membre de ce groupe.' });
        }

        group.membres.push(req.user.id);
        await group.save();

        res.status(200).json({ message: 'Groupe rejoint avec succès.', group });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
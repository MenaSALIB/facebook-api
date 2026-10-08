import User from '../models/User.js';

// Obtenir le profil de l'utilisateur connecté
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select('-password')
            .populate('amis', 'nom prenom email');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ajouter un ami
export const addFriend = async (req, res) => {
    try {
        const targetUserId = req.params.id;
        if (targetUserId === req.user.id) {
            return res.status(400).json({ message: 'Vous ne pouvez pas vous ajouter vous-même.' });
        }

        const user = await User.findById(req.user.id);
        const friend = await User.findById(targetUserId);

        if (!friend) return res.status(404).json({ message: 'Utilisateur non trouvé.' });

        if (user.amis.includes(targetUserId)) {
            return res.status(400).json({ message: 'Cet utilisateur est déjà dans vos amis.' });
        }

        user.amis.push(targetUserId);
        friend.amis.push(req.user.id);

        await user.save();
        await friend.save();

        res.status(200).json({ message: 'Ami ajouté avec succès.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
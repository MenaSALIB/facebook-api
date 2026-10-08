import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Inscription
export const register = async (req, res) => {
    try {
        const { nom, prenom, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            nom,
            prenom,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'Utilisateur créé avec succès.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Connexion
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Identifiants invalides.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Identifiants invalides.' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({ token, userId: user._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
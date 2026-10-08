import Post from '../models/Post.js';

// Créer un post
export const createPost = async (req, res) => {
    try {
        const { contenu, image, groupeId } = req.body;

        const newPost = new Post({
            auteur: req.user.id,
            contenu,
            image,
            groupeId: groupeId || null
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtenir tous les posts (Fil d'actualité)
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('auteur', 'nom prenom email')
            .populate('commentaires.auteur', 'nom prenom')
            .sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ajouter ou retirer un Like
export const toggleLike = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post non trouvé.' });

        const likeIndex = post.likes.indexOf(req.user.id);

        if (likeIndex === -1) {
            post.likes.push(req.user.id); // Liker
        } else {
            post.likes.splice(likeIndex, 1); // Disliker
        }

        await post.save();
        res.status(200).json({ message: 'Like mis à jour.', likesCount: post.likes.length, likes: post.likes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ajouter un commentaire
export const addComment = async (req, res) => {
    try {
        const { contenu } = req.body;
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ message: 'Post non trouvé.' });

        post.commentaires.push({
            auteur: req.user.id,
            contenu
        });

        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
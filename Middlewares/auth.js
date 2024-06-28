import jwt from 'jsonwebtoken';
import { User } from '../Models/User.js';

export const Authenticated = async (req, res, next) => {
    try {
        const token = req.header('Auth');
        if (!token) return res.status(401).json({ message: 'Login first' });

        const decoded = jwt.verify(token, '!@#$%^&*()'); // Ensure this matches the key used to sign the token
        const id = decoded.userId;

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not exist' });

        req.user = user;
        next();
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        console.error('Authentication error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

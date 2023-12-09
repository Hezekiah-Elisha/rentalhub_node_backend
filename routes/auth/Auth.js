import express from 'express';
import jwt from 'jsonwebtoken';
// import * from '../../SECRETS.js';
import bcrypt from 'bcrypt';

const router = express.Router();
const secret = 'a8b79697cf68937f4ca0c830d28f433d';

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        const user = {
            id: 1,
            username: username,
            password: password
        };
        jwt.sign({ user }, secret, { expiresIn: '1h' }, (err, token) => {
            res.json({
                token: token
            });
        });
    } else {
        res.status(400).json({
            message: 'Invalid username or password'
        });
    }

});

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        const user = {
            id: 1,
            username: username,
            password: password
        };
        jwt.sign({ user }, secret_key, { expiresIn: '1h' }, (err, token) => {
            res.json({
                token: token
            });
        });
    } else {
        res.status(400).json({
            message: 'Invalid username or password'
        });
    }
});

export default router;

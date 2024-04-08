import express from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../SECRETS.js';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import { login, register, authenticateToken, protected_route} from '../controllers/auth.controller.js';


const router = express.Router();
const secret = SECRET_KEY;

router.get('/', (req, res) => {
    res.status(200).json({mesage: 'From API route'});
});

// router.get('/:email', (req, res) => {
//     User.findAll({
//         where: {
//             email: req.params.email
//         }
//     }).then(user => {
//         res.status(200).json({
//             message: 'Get user successfully',
//             user: user
//         });
//     }).catch(error => {
//         res.status(500).json({
//             message: 'Something went wrong',
//             error: error
//         });
//     });
// });

router.post('/login', login);
router.get('/protected', authenticateToken, protected_route);
router.post('/register', register);


export default router;

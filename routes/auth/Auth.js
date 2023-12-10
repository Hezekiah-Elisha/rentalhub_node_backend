import express from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../../SECRETS.js';
import bcrypt from 'bcrypt';
import { sequelize } from '../../Constants.js';
import User from '../user/user.model.js';


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

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        
        User.findOne({
            where: {
                email: email
            }
        }).then(user => {
            const isMatch = bcrypt.compareSync(password, user.password);
            if (!isMatch) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            } else {
                jwt.sign({ user }, secret, { expiresIn: '1h' }, (err, token) => {
                    res.json({
                        token: token
                    });
                });
            }

            // res.status(200).json({
            //     message: 'Get user successfully in login',
            //     user: user
            // });

            // res.status(200).json({
            //     message: 'Get user successfully',
            //     user: user
            // });
        }).catch(error => {
            res.status(500).json({
                message: 'Error 500',
                error: error.message,
                params: req.body
            });
        });




    } else {
        res.status(400).json({
            message: 'Invalid username or password'
        });
    }

});

router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Welcome to the protected route!', user: req.user });
  });

function verifyAccessToken(token) {
    const secret = SECRET_KEY;
  
    try {
      const decoded = jwt.verify(token, secret);
      return { success: true, data: decoded };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.sendStatus(401);
    }
  
    const result = verifyAccessToken(token);
  
    if (!result.success) {
      return res.status(403).json({ error: result.error });
    }
  
    req.user = result.data;
    next();
}
export default router;

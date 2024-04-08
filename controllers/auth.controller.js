import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { JWT_SECRET, SECRET_KEY } from '../SECRETS.js';
import { errorHandler } from "../utils/error.js";
import { check } from 'express-validator';

export const login = async (req, res, next) => {

    if (req.method !== 'POST') {
        return res.status(405).json({
            message: 'Invalid method. Please use POST.'
        });
    }

    if (!req.body) {
        return res.status(400).json({
            message: 'Invalid username or password'
        });
    }
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            message: 'Invalid username or password'
        });
    }

    
    const { email, password } = req.body;
    check('email').isEmail();
    check('password').isLength({ min: 6 });
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
                // Convert user instance to a plain object
                let userObject = user.toJSON();

                // Convert user instance to a plain object and remove password
                delete userObject.password;

                jwt.sign({ user: userObject }, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                    if (err) {
                        return res.status(500).json({
                            message: 'Failed to generate token'
                        });
                    }
                    res.json({
                        token: token,
                        message: 'Auth successful',
                        user: userObject
                    });
                });
            }
        }).catch(error => {
            next(error);
        });

    } else {
        res.status(400).json({
            message: 'Invalid username or password'
        });
    }
}

export const register = async (req, res, next) => {
    const { email, name, password } = req.body;
    check('email').isEmail();
    check('password').isLength({ min: 6 });
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

    
    if (!emailRegex.test(email)) {
        return errorHandler(res, 'Must be a valid email', 400);
    }

    if (email.length < 6 || !email.includes('@') || !email.includes('.')){
        return errorHandler(res, 'Must Be a valid email', 400);
    }
    if (password.length < 6) {
        return errorHandler(res, 'Password must be at least 6 characters', 400);
    }
    if (email && password && name) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        User.create({
            email: email,
            name: name,
            password: hashedPassword
        }).then(user => {
            res.status(201).json({
                message: 'User created',
                user: user
            });
        }).catch(error => {
            next(error);
        });
    } else {
        res.status(400).json({
            message: 'Invalid username or password'
        });
    }
}

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    const result = verifyAccessToken(token);
  
    if (!result.success) {
      return res.status(403).json({ error: result.error });
    }
  
    req.user = result.data;
    next();
}

export const verifyAccessToken = (token) => {
    const secret = JWT_SECRET;
  
    try {
      const decoded = jwt.verify(token, secret);
      return { success: true, data: decoded };
    } catch (error) {
      return { success: false, error: error.message };
    }
}

export const secret = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    res.json({ message: 'Welcome to the protected route!', user: req.user });
}

export const logout = (req, res) => {
    res.json({ message: 'Logout successful' });
}

export const forgotPassword = (req, res) => {
    res.json({ message: 'Forgot password' });
}

export const resetPassword = (req, res) => {
    res.json({ message: 'Reset password' });
}

export const protected_route = (req, res) => {
    res.json({ message: 'Welcome to the protected route!', user: req.user });
}
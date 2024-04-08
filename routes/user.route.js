import express from 'express';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';


const router = express.Router();
await User.sequelize.sync();

router.get('/', (req, res) => {
    User.findAll().then(users => {
        res.status(200).json({
            message: 'Get all users successfully',
            users: users
        });
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    });
});

router.post('/', (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        phone: req.body.phone,
        address: req.body.address,
        role: req.body.role,
        status: req.body.status
    }).then(user => {
        res.status(201).json({
            message: 'User created successfully',
            user: user
        });
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    });
});

router.get('/:id', (req, res) => {
    User.findByPk(req.params.id).then(user => {
        res.status(200).json({
            message: 'Get user successfully',
            user: user
        });
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    });
});


router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(user => {
        res.status(200).json({
            message: 'User deleted successfully',
            user: user
        });
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    });
});

router.put('/:id', (req, res) => {
    User.update({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        role: req.body.role,
        status: req.body.status
    }, {
        where: {
            id: req.params.id
        }
    }).then(user => {
        res.status(200).json({
            message: 'User updated successfully',
            user: user
        });
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    });
});


export default router;

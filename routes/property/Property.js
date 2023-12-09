import express from 'express';
import Property from './property.model.js';
import { Op } from 'sequelize';

const router = express.Router();
await Property.sequelize.sync();

router.get('/', (req, res) => {
    Property.findAll().then(properties => {
        res.status(200).json({
            message: 'Get all properties successfully',
            properties: properties
        });
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    });
});

router.post('/', (req, res) => {
    const property = Property.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        location: req.body.location,
        type: req.body.type,
        status: req.body.status,
        image: req.body.image
    }).then(property => {
        res.status(201).json({
            message: 'Property created successfully',
            property: property
        });
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    });
});

router.get('/:id', (req, res) => {
    Property.findByPk(req.params.id).then(property => {
        res.status(200).json({
            message: 'Get property successfully',
            property: property
        });
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    });
});

/**
 * Update a property
 * @route PUT /property/{id}
 * @group Property - Operations about property
 * @param {integer} id.path.required - property id
 * @param {string} name.body.required - property name
 * @param {string} description.body.required - property description
 * @param {integer} price.body.required - property price
 * @param {string} location.body.required - property location
 * @param {string} type.body.required - property type
 * @param {string} status.body.required - property status
 * @param {string} image.body.required - property image
 * @returns {object} 200 - Property updated successfully
 * @returns {Error}  default - Something went wrong
 */
router.put('/:id', (req, res) => {
    Property.update({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        location: req.body.location,
        type: req.body.type,
        status: req.body.status,
        image: req.body.image
    }, {
        where: {
            id: req.params.id
        }
    }).then(property => {
        res.status(200).json({
            message: 'Property updated successfully',
            property: property
        });
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    });
});

/**
 * Delete a property
 * @route DELETE /property/{id}
 * @group Property - Operations about property
 * @param {integer} id.path.required - property id
 * @returns {object} 200 - Property deleted successfully
 * @returns {Error}  default - Something went wrong
 */
router.delete('/:id', (req, res) => {
    Property.destroy({
        where: {
            id: req.params.id
        }
    }).then(property => {
        res.status(200).json({
            message: 'Property deleted successfully',
            property: property
        });
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    });
});


router.get('/search/:name', (req, res) => {
    Property.findAll({
        where: {
            name: {
                [Op.like]: '%' + req.params.name + '%'
            }
        }
    }).then(properties => {
        res.status(200).json({
            message: 'Search Successful',
            properties: properties
        });
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    });
});

router.get('/search/type/:type', (req, res) => {
    Property.findAll({
        where: {
            type: {
                [Op.like]: '%' + req.params.type + '%'
            }
        }
    }).then(properties => {
        res.status(200).json({
            message: 'Search Successful',
            properties: properties
        });
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    });
});

export default router;
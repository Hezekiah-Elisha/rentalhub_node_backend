import express from 'express';
import Property from '../models/property.model.js';
import { Op } from 'sequelize';
import { createProperty, deleteAllProperties, getAllProperties, getPropertyById, uploadImage } from '../controllers/property.controller.js';

const router = express.Router();
await Property.sequelize.sync();

router.get('/', getAllProperties);

router.post('/', createProperty);

router.get('/:id', getPropertyById);

router.delete('/', deleteAllProperties);

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
router.put('/:id', getPropertyById); 

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

router.get('/search/location/:location', (req, res) => {
    Property.findAll({
        where: {
            location: {
                [Op.like]: '%' + req.params.location + '%'
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


router.post('/uploadImage', uploadImage);

export default router;
import Property from "../models/property.model.js";
import multer from 'multer';
import path from 'path';

// const upload = multer({ dest: 'uploads/' }); // specify the destination directory for uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


export const getAllProperties = async (req, res) => {
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
};

export const getPropertyById = async (req, res, next) => {
    Property.findByPk(req.params.id).then(property => {
        if (!property) {
            throw new Error('Property not found');
        }
        res.status(200).json({
            message: 'Get property by id successfully',
            property: property
        });
    }).catch(error => {
        next(error);
    });
};
export const uploadImage = async (req, res, next) => {
    upload.single('property')(req, res, function (err) {
        if (err) {
            return res.status(500).json({
                message: 'Failed to upload image',
                error: err
            });
        }
        if (!req.file) {
            return res.status(400).json({
                message: 'No image uploaded'
            });
        }
        res.status(200).json({
            message: 'Image uploaded successfully',
            image: req.file
        });
    });
};


export const createProperty = async (req, res, next) => {
    upload.single('property')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            return next(err);
        } else if (err) {
            // An unknown error occurred when uploading.
            return next(err);
        }

        // Everything went fine, create the property
        Property.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            location: req.body.location,
            type: req.body.type,
            status: req.body.status,
            image: req.file.path,
            tags: req.body.tags,
            userId: Number(req.body.userId),
            features: req.body.features
        }).then(property => {
            res.status(201).json({
                message: 'Property created successfully',
                property: property
            });
        }).catch(error => {
            next(error);
            console.log(error);
        });
    });
};

export const updateProperty = async (req, res, next) => {
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
        next(error);
    });
};

export const deleteAllProperties = async (req, res, next) => {
    Property.destroy({
        where: {},
        truncate: false
    }).then(properties => {
        res.status(200).json({
            message: 'All properties deleted successfully',
            properties: properties
        });
    }).catch(error => {
        next(error);
    });
};

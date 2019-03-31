const db = require('../AssocationModels');
const uploadImageTask = require('../Tasks/ImageUploadTask');
const boom = require('boom');
const Helper = require('../utils/Helper');

const stringConstants = require('../Constants/APIMessages');


module.exports.getAllArtists = async (req) => {
    try {
        const results = {};
        req.query.limit = req.query.limit || 10;
        req.skip = req.skip || 0;
        results.rows = await db.artist.findAll({
            limit: req.query.limit,
            offset: req.skip,
            include: [{
                model: db.genre,
                as: 'ArtistGenre',
                through: {attributes: []},
                attributes: {
                    exclude: ['id']
                }
            }, {
                model: db.skill,
                as: 'ArtistSkill',
                through: {attributes: []},
                attributes: ['id'],
                required: false,
            }, {
                model: db.image,
                as: 'logo',
                attributes: {
                    exclude: ['id']
                }
            }, {
                model: db.artist_type,
                attributes: {
                    exclude: ['id']
                }
            }, {
                model: db.user,
                attributes: {
                    exclude: ['password', 'id', 'auth_token', 'remember_token', 'role_id']
                }
            }],
            subQuery: false,
            order: [
                ['created_at', 'DESC']
            ],
            group: ['artist.id', 'ArtistGenre.id', 'ArtistSkill.id'],
            attributes: {
                exclude: ['user_id', 'logo_id', 'artist_type_id']
            }
        });
        results.count = await db.artist.count();
        return db.paginate(req, results);
    } catch (e) {
        throw boom.internal(stringConstants.general.unknown_error, e);
    }
};

module.exports.getRandomArtists = async req => {
    try {
        const conditions = {};
        if (req.query.artistType) {
            conditions.artist_type_id = req.query.artistType;
        }
        if (req.query.location) {
            conditions.location = req.query.location;
        }
        return await db.artist.findAll({
            where: conditions,
            limit: req.query && req.query.limit && req.query.limit < 10 ? req.query.limit : 6,
            include: [{
                model: db.genre,
                as: 'ArtistGenre',
                through: {attributes: []},
                attributes: {
                    exclude: ['id']
                }
            }, {
                model: db.skill,
                as: 'ArtistSkill',
                through: {attributes: []},
                attributes: ['id'],
                required: false,
            }, {
                model: db.image,
                as: 'logo',
                attributes: {
                    exclude: ['id']
                }
            }, {
                model: db.artist_type,
                attributes: {
                    exclude: ['id']
                }
            }],
            subQuery: false,
            order: [
                db.Sequelize.literal('rand()')
            ],
            group: ['artist.id', 'ArtistGenre.id', 'ArtistSkill.id'],
            attributes: {
                exclude: ['user_id', 'logo_id', 'artist_type_id']
            }
        });
    } catch (e) {
        throw boom.internal(stringConstants.general.unknown_error, e);
    }
};

module.exports.getArtistPublicProfile = async req => {
    let artist;
    try {
        artist = await db.artist.findAll({
            include: [{
                model: db.genre,
                as: 'ArtistGenre',
                through: {attributes: []},
                attributes: {
                    exclude: ['id']
                }
            }, {
                model: db.skill,
                as: 'ArtistSkill',
                through: {attributes: []},
                attributes: {
                    exclude: ['id']
                }
            }, {
                model: db.image,
                as: 'logo',
                attributes: {
                    exclude: ['id']
                }
            }, {
                model: db.artist_type,
                attributes: {
                    exclude: ['id']
                }
            }, {
                model: db.user,
                attributes: {
                    exclude: ['password', 'id', 'auth_token', 'remember_token', 'role_id']
                }
            }, {
                model: db.rating,
                as: 'ratings',
                attributes: {
                    exclude: ['rating', 'created_at', 'updated_at', 'artist_id'],
                    include: [[db.Sequelize.fn('AVG', db.Sequelize.col('rating')), 'rating']]
                }
            }],
            // raw: true,
            where: {
                slug: req.params.slug
            }, subQuery: false,
            group: ['id', 'ArtistGenre.id', db.Sequelize.col('ArtistGenre.id'), 'ArtistSkill.id', db.Sequelize.col('ArtistSkill.id')],
            attributes: {
                exclude: ['created_at', 'updated_at', 'user_id', 'logo_id', 'artist_type_id']
            }
        });
    } catch (e) {
        throw boom.internal(stringConstants.general.unknown_error, e);
    }
    if (artist.length === 0) throw boom.notFound(stringConstants.artist.not_found);
    return artist[0];
};

module.exports.getUserByEncryptedUserId = async req => {
    try {
        const user = await db.user.findOne({
            where: {
                id: Helper.decrypt(req.params.userId)
            }, attributes: {
                exclude: ['password', 'auth_token', 'remember_token']
            }
        });
        if (user) return user;
    } catch (e) {
        throw boom.internal(stringConstants.general.unknown_error, e);
    }
    throw boom.notFound(stringConstants.user.not_found);
};

module.exports.createNewArtist = async req => {
    const user = await this.getUserByEncryptedUserId(req);
    if (!user) throw boom.notFound(stringConstants.user.not_found);
    let result = await db.artist.findOrCreate({
        where: {
            user_id: user.id
        }, defaults: {
            // Set other body values
            name: req.body.name,
            slug: req.body.name,
            location: req.body.location,
            description: req.body.description,
            gender: req.body.gender,
            user_id: user.dataValues.id,
            artist_type_id: req.body.artistTypeId
        }
    });
    if (result[1]) return result[0];
    throw next(boom.conflict(stringConstants.artist.already_exists));
};

module.exports.getArtistBySlug = async (req) => {
    let artist = await db.artist.findOne({
        where: {
            slug: req.params.slug
        }
    });
    if (!artist) throw boom.notFound(stringConstants.artist.not_found);
};

module.exports.uploadImage = async req => {
    let artist = await this.getArtistBySlug(req);
    if (!artist) throw boom.notFound(stringConstants.artist.not_found);

    return await new Promise(async (resolve, reject) => {
        let upload = uploadImageTask.upload('logo');
        upload(async (req, {}, err) => {
            if (err) {
                reject(boom.internal(stringConstants.general.image_upload_error));
            }
            let image = await db.image.create({
                url: req.file.filename
            });
            artist.setLogo(image);
            resolve(true);
        });
    });
};
const db = require('../AssocationModels');

module.exports.getAllArtists = async (req) => {
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
};

module.exports.getRandomArtists = async req => {
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
};

module.exports.getArtistPublicProfile = async req => {
    const artists = await db.artist.findAll({
        include: [{
            model: Genres,
            as: 'ArtistGenre',
            through: {attributes: []},
            attributes: {
                exclude: ['id']
            }
        }, {
            model: Skills,
            as: 'ArtistSkill',
            through: {attributes: []},
            attributes: {
                exclude: ['id']
            }
        }, {
            model: Logo,
            as: 'logo',
            attributes: {
                exclude: ['id']
            }
        }, {
            model: ArtistType,
            attributes: {
                exclude: ['id']
            }
        }, {
            model: UserModel,
            attributes: {
                exclude: ['password', 'id', 'auth_token', 'remember_token', 'role_id']
            }
        }, {
            model: Ratings,
            as: 'ratings',
            attributes: {
                exclude: ['rating', 'created_at', 'updated_at', 'artist_id'],
                include: [[sequelize.fn('AVG', sequelize.col('rating')), 'rating']]
            }
        }],
        // raw: true,
        where: {
            slug: req.params.slug
        }, subQuery: false,
        group: ['id', 'ArtistGenre.id', 'ArtistGenre->artist_genre.id', 'ArtistSkill.id', 'ArtistSkill->artist_skill.id'],
        attributes: {
            exclude: ['created_at', 'updated_at', 'user_id', 'logo_id', 'artist_type_id']
        }
    });
    if (artists.length === 0) return null;
    return artists[0];
};

module.exports.getUserByEncryptedUserId = async req => {
    const user = await db.user.findOne({
        where: {
            id: Helper.decrypt(req.params.userId)
        }, attributes: {
            exclude: ['password', 'auth_token', 'remember_token']
        }
    });
    if (user) return user;
    return null;
};

module.exports.createNewArtist = async req => {
    const user = await this.getUserByEncryptedUserId(req);
    if (!user) return null;
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
    return false;
};
'use strict';

module.exports = function(sequelize, DataTypes) {
    var Media = sequelize.define(
        'Media',
        {
            media_type: { type: DataTypes.STRING },
            media_url: { type: DataTypes.TEXT},

        },
        {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
            paranoid: true,
            underscored: true,
            tableName: 'media',
        },
    );

    return Media;
};

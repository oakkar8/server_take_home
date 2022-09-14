'use strict';

module.exports = function(sequelize, DataTypes) {
    var Access = sequelize.define(
        'Access',
        {
            user_id: { type: DataTypes.INTEGER }

        },
        {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
            paranoid: true,
            underscored: true,
            tableName: 'access',
        },
    );

    return Access;
};

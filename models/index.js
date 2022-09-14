'use strict';

if (!global.hasOwnProperty('db')) {
    let {Sequelize, sequelize} = require('../service/db');

    global.db = {
        Sequelize: Sequelize,
        sequelize: sequelize,
        Creator: require(__dirname + '/creator')(sequelize, Sequelize.DataTypes),
        Install: require(__dirname + '/install')(sequelize, Sequelize.DataTypes),
        Access: require(__dirname + '/access')(sequelize, Sequelize.DataTypes),
        Campaign: require(__dirname + '/campaign')(sequelize, Sequelize.DataTypes),
        Media: require(__dirname + '/media')(sequelize, Sequelize.DataTypes),
        Pricing: require(__dirname + '/pricing')(sequelize, Sequelize.DataTypes),
        /*
        *
        * TODO add any additional models here.
        *
        */
    };

    global.db.Creator.hasMany(global.db.Install, {
        onDelete: 'cascade',
        foreignKey: 'creator_id',
    });
    global.db.Creator.hasMany(global.db.Campaign, {
        onDelete: 'cascade',
        foreignKey: 'creator_id',
    });
    global.db.Campaign.hasMany(global.db.Access, {
        foreignKey: 'campaign_id',

    })
    global.db.Creator.hasMany(global.db.Access, {
        foreignKey: 'creator_id',

    })
    global.db.Campaign.hasMany(global.db.Pricing, {
        foreignKey: 'campaign_id',

    })
    global.db.Campaign.hasMany(global.db.Media, {
        foreignKey: 'campaign_id',

    })

    // global.db.Install.belongsTo(global.db.Campaign, {
    //     onDelete: 'cascade',
    //     foreignKey: 'campaign_id',
    // });

    /*
    *
    * TODO add any additional relationships between models here.
    *
    */
}
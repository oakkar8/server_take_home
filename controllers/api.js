'use strict';

let {Sequelize, sequelize} = require('../service/db');


exports.creator = async (req, res) => {
    try {
        const creatorId = req.query.creator_id;
        let user = await db.sequelize.query(
            'SELECT * FROM creator b\n' +
            'WHERE id=$1\n',
            { bind: [creatorId], type: 'RAW' },
        );
        res.send(user[0]);
    } catch (err) {
        console.log("Error is User: " + err);
        res.sendStatus(400);
    }
};

/*
    TODO implement new endpoints here
 */
exports.offer = async (req, res) => {
    try {
        const creatorId = req.query.creator_id;
        const campaign_id= req.query.campaign_id;
        const platform = req.query.platform;
        const country = req.query.country;

        const date = new Date();
        let remove_at  = date.toISOString();

        let campaign = await db.sequelize.query(
            'SELECT c.id, c.name, c.icon_url, c.conversion_event, pc. price \n' +
            'FROM campaign c LEFT JOIN pricing pc on pc.campaign_id = c.id \n' +
            'WHERE c.id =$1 and pc.country = $2 and pc.platform = $3 and c.deleted_at IS NULL \n' +
            'OR c.deleted_at > $4',
            { bind: [campaign_id, country, platform, remove_at], type: 'RAW' }
        );
        let media = await db.sequelize.query(
            'SELECT id, media_type, media_url from media where campaign_id = $1 and \n' +
            'deleted_at IS NULL OR deleted_at > $2',
            { bind: [campaign_id, remove_at], type: 'RAW' }
        );
        let otherCampaign = await db.sequelize.query(
            'SELECT c.id, c.name, c.icon_url, c.conversion_event, pc. price \n' +
            'FROM campaign c LEFT JOIN pricing pc on pc.campaign_id = c.id \n' +
            'left join access a on a.campaign_id = c.id left join creator ct on ct.id = a.user_id \n' +
            'WHERE c.id != $1 and pc.country = $2 and pc.platform = $3 and ct.id =$4 c.deleted_at IS NULL \n' +
            'c.deleted_at > $5',
            { bind: [campaign_id, country, platform, creatorId, remove_at], type: 'RAW' }
        );
        campaign[0][0].media = media[0];
        campaign[0][0].otherCampaign = otherCampaign[0];
        res.send(campaign[0]);
    } catch (err) {
        console.log("Error is Offer: " + err);
        res.sendStatus(400);
    }
};

exports.deleteCampaign = async (req, res) => {
    try {
        const campaign_id = req.query.campaign_id;
        const date = new Date();
        date.setHours(d.getHours() + 24);
        let remove_at  = date.toISOString();
        remove_at = req.query.remove_at ? new Date(req.query.remove_at) :remove_at; 
        let result = await db.sequelize.query(
            'UPDATE campaign set deleted_at = $1 where id = $2',
        { bind: [remove_at, campaign_id], type: 'RAW' });
        console.log(result);
        res.send(result[0]);

    } catch (err) {
        console.log("Error is delete: " + err);
        res.sendStatus(400);

    }
}
exports.deleteCampaignWithCriteria = async (req, res) => {
    try {
        let criteria = req.query.criteria;
        let result = await db.sequelize.query(
            'select t.total, ct.country_total, t.creator_id from (SELECT COUNT(*) total, creator_id from install group by creator_id) t join \n'+
            '(select count (*) country_total, creator_id from install group by creator_id, country) ct on ct.creator_id = t.creator_id',
        { bind: [remove_at, campaign_id], type: 'RAW' });
        let ids = [];
        for( let i =0; i< result[0].length; i ++) {
            if ((result[0][i].country_total/ result[0][i].total) < criteria ) {
                ids.push(result[0].creator_id)
            }
        }
        // and remove all those ids which doesn't met the criteria

    } catch (err) {
        console.log("Error is delete criteria: " + err);
        res.sendStatus(400);

    }

}
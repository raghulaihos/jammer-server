const db = require('../../postgres/connection');

const search_all_cards = async (req, res, next) => {
    try {
        let result = await db.query('select jsonb_agg(jamcards) as jamcards from (select * from jam_rooms) jamcards ');
        res.status(200).json(result.rows[0]);
    } catch (err) {
        const error = new Error('DB Error fetching jamcards');
        error.statusCode = 500;
        next(err);
    }
}

const jamroom_details = async (req, res, next) => {
    console.log(req.query.room_name);
    try {
        let result = await db.query(`select equipment from jam_rooms where name='${req.query.room_name}'`);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        const error = new Error('DB Error fetching equipment');
        error.statusCode = 500;
        next(err);
    }   
}


module.exports = {
    search_all_cards,
    jamroom_details
};
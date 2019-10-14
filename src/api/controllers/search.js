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
    try {
        let result = await db.query(`select equipment from jam_rooms where name='${req.query.room_name}'`);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        const error = new Error('DB Error fetching equipment');
        error.statusCode = 500;
        next(err);
    }
}

const slots = async (req, res, next) => {
    try {
        let result = await db.query(`select j.name ,t.slots from time_slots t
                                     left join jam_rooms j on t.room_id=j.room_id where j."name"='${req.query.room_name}' `)
        res.status(200).json(result.rows[0]);
    } catch (err) {
        const error = new Error('DB Error fetching time slots');
        error.statusCode = 500;
        next(err);
    }
}

const book = async(req,res,next)=>{
    let push_obj={};
    req.body.slots.forEach((val,i) => {
       if(val==='booked'){
           val='closed'
       }
        push_obj[i]=val;
    });
    push_obj = JSON.stringify(push_obj);
    let result = await db.query(`update time_slots t  
    set slots='${push_obj}'
    from jam_rooms j where "name"='${req.body.room_name}' and t.room_id=j.room_id returning t.slots`)
    res.status(200).send(result);
}

module.exports = {
    search_all_cards,
    jamroom_details,
    slots,
    book
};
const db = require('../../postgres/connection');
const nodemailer = require("nodemailer");

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

let map = {
    '0':'9am-10am',
    '1':'10am-11am',
    '2':'11am-12pm',
    '3':'12pm-1pm',
    '4':'1pm-2pm',
    '5':'2pm-3pm',
    '6':'3pm-4pm',
    '7':'4pm-5pm',
    '8':'5pm-6pm',
    '9':'6pm-7pm',
    '10':'7pm-8pm',
    '11':'8pm-9pm'
};

const book = async(req,res,next)=>{
    let push_obj={}, slots=[];
    console.log(req.email_id);
    req.body.slots.forEach((val,i) => {
       if(val==='booked'){
           val='closed'
           slots.push(map[i]);
       }
        push_obj[i]=val;
    });
    push_obj = JSON.stringify(push_obj);
    let result = await db.query(`update time_slots t  
    set slots='${push_obj}'
    from jam_rooms j where "name"='${req.body.room_name}' and t.room_id=j.room_id returning t.slots`);

    await mail(slots,req.email_id,req.body.room_name,req.body.cost);
    res.status(200).send(result);

}

async function mail(slots,email,jamroom, cost) {
    let slots_in=''
    for(let i=0;i<slots.length;i++){
        slots_in+=slots[i]+', ';
    }
    slots_in = slots_in.slice(0,slots_in.length-2);
    const transport = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
       secure:true,
        auth: {
            user: 'jammer.inc0@gmail.com',
            pass: 'jammerchris'
        }
    });
  
    var mailOptions = {
        from: 'Jammer <support@jammer.com>',
        to: email,
        subject: 'Booking confirmation',
        text: 'Hey there, it’s our first message sent with Nodemailer ',
        html: `Hey there!<br> Your slots for ${slots_in} are confirmed at ${jamroom}!<br/> <br>Total amount to be paid at the studio : Rs ${cost}<br/>`
      };
      
      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
      });
  
}

module.exports = {
    search_all_cards,
    jamroom_details,
    slots,
    book
};
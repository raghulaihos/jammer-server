const db = require('../postgres/connection');

setTimeout(async () => {
   let time = await db.query(`select (current_timestamp at time zone 'asia/kolkata')::time`);
   if(time.rows[0].timezone.slice(0,2)=='12'){
    await db.query(`update time_slots set slots ='{"0": "open", "1": "open", "2": "open", "3": "open", "4": "open", "5": "open", 
    "6": "open", "7": "open", "8": "open", "9": "open", "10": "open", "11": "open"}' `);
    console.log('update done!');
   }
    
}, 60*1000);


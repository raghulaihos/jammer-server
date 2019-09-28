
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/jamcards',  (req, res, next) => {

    const jampads = [
        {
            name: 'Bread and Jaam',
            location: 'Bangalore, Bannergatta road',
            price: '500-1000'

        },
        {
            name: 'Astral Studios',
            location: 'Bangalore, HSR Layout',
            price: '800-1500'
        },
        {
            name: 'Boom Box House',
            location: 'Bangalore, Malleshwaram',
            price: '500-1000'

        },
        {
            name: 'Audio Academy',
            location: 'Bangalore, Old madras road',
            price: '500-1000'

        }
    ]

    res.json(jampads);
}
)

app.listen(port, () => {
    console.log('Server started at port ',port);
})
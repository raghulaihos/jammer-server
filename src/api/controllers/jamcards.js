const get_jamcards = (req, res, next) => {
    const jampads = {
        jamcards: [
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
    }
    res.status(200).json(jampads);
};

const test = (req, res, next) => {
    res.send('yo!');
}

module.exports = {get_jamcards, test};